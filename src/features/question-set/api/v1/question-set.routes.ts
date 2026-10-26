import type { PrismaClient } from '@prisma/client';
import type { AwilixContainer } from 'awilix';
import { Router } from 'express';

import type { CacheService } from '../../../../infrastructure/cache/cache.service.js';
import {
  authenticate,
  authorize,
  optionalAuthenticate,
} from '../../../../infrastructure/middleware/authenticate.js';
import { validate } from '../../../../infrastructure/middleware/validate.js';
import { NotFoundError } from '../../../../shared/errors/http-errors.js';
import {
  assertQuestionSetVisible,
  assertQuestionVisible,
  assertSubCategoryVisible,
  isAdminRequest,
} from '../../../../shared/utils/admin-only.js';
import { asyncHandler } from '../../../../shared/utils/async-handler.js';
import { QuestionSetService } from '../../domain/question-set.service.js';
import { QuestionSetPrismaRepository } from '../../infra/question-set.prisma-repository.js';
import {
  answerQuestionSchema,
  bulkDeleteQuestionsSchema,
  bulkDeleteSetsSchema,
  bulkUpsertQuestionsSchema,
  bulkUpsertSetsSchema,
  createQuestionSchema,
  createQuestionSetSchema,
  startExamSchema,
  updateAppSettingsSchema,
  updateQuestionSchema,
  updateQuestionSetSchema,
} from '../validation.js';

import { QuestionSetController } from './question-set.controller.js';

export function createQuestionSetRoutes(container: AwilixContainer): Router {
  const router = Router();

  const prisma = container.resolve<PrismaClient>('prismaClient');
  const cacheService = container.resolve<CacheService>('cacheService');
  const repository = new QuestionSetPrismaRepository(prisma);
  const service = new QuestionSetService(repository);
  const controller = new QuestionSetController(service);

  // Helper: resolve sub-category ID from slug
  async function resolveSubCategoryId(slug: string): Promise<string> {
    const sub = await prisma.subExamCategory.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!sub) {
      throw new NotFoundError('Sub exam category not found');
    }
    return sub.id;
  }

  async function invalidateQuestionSetCache() {
    await cacheService.invalidatePattern('question-sets:*');
  }

  // Public: Get live question set by sub-category slug
  router.get(
    '/live/:subCategorySlug',
    optionalAuthenticate,
    asyncHandler(async (req, res) => {
      const slug = req.params.subCategorySlug!;
      await assertSubCategoryVisible(prisma, req, slug);
      const subCategoryId = await resolveSubCategoryId(slug);
      const data = await cacheService.getOrSet(
        `question-sets:live:${slug}`,
        () => service.getLiveBySubCategoryId(subCategoryId),
        300, // 5 minutes
      );
      res.json({ data });
    }),
  );

  // Public: Get a random question for Dream-Bot social media posting
  router.get(
    '/public/random',
    asyncHandler(async (_req, res) => {
      const publicWhere = {
        slug: { not: null },
        questionSet: { subExamCategory: { isAdminOnly: false } },
      };
      const count = await prisma.question.count({ where: publicWhere });
      if (count === 0) {
        res.status(200).json({ data: null });
        return;
      }
      const skip = Math.floor(Math.random() * count);
      const question = await prisma.question.findFirst({
        where: publicWhere,
        skip,
        include: {
          questionSet: {
            include: {
              subExamCategory: {
                include: { examCategory: true },
              },
            },
          },
        },
      });
      if (!question) {
        res.status(200).json({ data: null });
        return;
      }
      res.status(200).json({
        data: {
          id: question.id,
          questionText: question.questionText,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
          correctAnswer: question.correctAnswer,
          subject: question.subject,
          topic: question.topic,
          slug: question.slug,
          subExamCategoryName: question.questionSet.subExamCategory.name,
          subExamCategorySlug: question.questionSet.subExamCategory.slug,
          examCategoryName: question.questionSet.subExamCategory.examCategory.name,
        },
      });
    }),
  );

  // Public: Sitemap — returns [{slug, updatedAt}] for all questions with a slug
  // Public: Sitemap — returns [{slug, updatedAt}] for all questions with a slug
  router.get(
    '/public/slugs',
    asyncHandler(async (_req, res) => {
      const data = await cacheService.getOrSet(
        'question-sets:public-slugs',
        async () => {
          const rows = await prisma.question.findMany({
            where: { slug: { not: null }, questionSet: { subExamCategory: { isAdminOnly: false } } },
            select: { slug: true, updatedAt: true },
            orderBy: { updatedAt: 'desc' },
          });

          // Filter + map without `!` — the `where` clause guarantees non-null
          // but TypeScript still sees slug as `string | null` from Prisma types.
          // A type-safe filter narrows it correctly without assertion.
          return rows
            .filter((r): r is typeof r & { slug: string } => r.slug !== null)
            .map((r) => ({ slug: r.slug, updatedAt: r.updatedAt }));
        },
        21_600,
      );
      res.json({ data });
    }),
  );

  // Public: Get single question by slug (SEO page data)
  router.get(
    '/public/question/:slug',
    asyncHandler(async (req, res) => {
      const slug = req.params.slug!;
      // admin-only category-র প্রশ্ন public-এ সবসময় 404 (Google/anonymous কেউ দেখবে না)
      const hidden = await prisma.question.findFirst({
        where: { slug, questionSet: { subExamCategory: { isAdminOnly: true } } },
        select: { id: true },
      });
      if (hidden) {
        throw new NotFoundError('Question not found');
      }
      const data = await cacheService.getOrSet(
        `question-sets:public-question:${slug}`,
        () => service.getPublicQuestionBySlug(slug),
        3600, // 1 hour
      );
      res.json({ data });
    }),
  );

  // Public: Get archive question sets by sub-category slug
  router.get(
    '/archive/:subCategorySlug',
    optionalAuthenticate,
    asyncHandler(async (req, res) => {
      const slug = req.params.subCategorySlug!;
      await assertSubCategoryVisible(prisma, req, slug);
      const subCategoryId = await resolveSubCategoryId(slug);
      const data = await cacheService.getOrSet(
        `question-sets:archive:${slug}`,
        () => service.getArchiveBySubCategoryId(subCategoryId),
        300, // 5 minutes
      );
      res.json({ data });
    }),
  );

  // Admin: Get all question sets by sub-category slug (with optional isLive filter)
  router.get(
    '/by-sub-category/:subCategorySlug',
    authenticate,
    authorize('ADMIN'),
    asyncHandler(async (req, res) => {
      const subCategoryId = await resolveSubCategoryId(req.params.subCategorySlug!);
      req.params.subCategoryId = subCategoryId;
      return controller.getAllBySubCategory(req, res);
    }),
  );

  // Auth: Get marksheet by attempt ID
  router.get(
    '/marksheet/:attemptId',
    authenticate,
    asyncHandler((req, res) => controller.getMarksheet(req, res)),
  );

  // Auth: Get user attempt for a question set
  router.get(
    '/user-attempt/:questionSetId',
    authenticate,
    asyncHandler((req, res) => controller.getUserAttempt(req, res)),
  );

  // --- Question CRUD (admin) ---

  // Admin: Get questions for a question set
  router.get(
    '/questions/:questionSetId',
    authenticate,
    authorize('ADMIN'),
    asyncHandler((req, res) => controller.getQuestions(req, res)),
  );

  // Admin: Get single question
  router.get(
    '/question/:id',
    authenticate,
    authorize('ADMIN'),
    asyncHandler((req, res) => controller.getQuestion(req, res)),
  );

  // Admin: Create question
  router.post(
    '/questions',
    authenticate,
    authorize('ADMIN'),
    validate({ body: createQuestionSchema }),
    asyncHandler(async (req, res) => {
      await controller.createQuestion(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  // Admin: Update question
  router.patch(
    '/question/:id',
    authenticate,
    authorize('ADMIN'),
    validate({ body: updateQuestionSchema }),
    asyncHandler(async (req, res) => {
      await controller.updateQuestion(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  // Admin: Delete question
  router.delete(
    '/question/:id',
    authenticate,
    authorize('ADMIN'),
    asyncHandler(async (req, res) => {
      await controller.deleteQuestion(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  // Admin: Bulk upsert (create + update) questions in one call
  router.post(
    '/questions/bulk-upsert',
    authenticate,
    authorize('ADMIN'),
    validate({ body: bulkUpsertQuestionsSchema }),
    asyncHandler(async (req, res) => {
      await controller.bulkUpsertQuestions(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  // Admin: Bulk delete questions by IDs
  router.delete(
    '/questions/bulk-delete',
    authenticate,
    authorize('ADMIN'),
    validate({ body: bulkDeleteQuestionsSchema }),
    asyncHandler(async (req, res) => {
      await controller.bulkDeleteQuestions(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  // --- Exam flow ---

  // Auth: Get exam questions (hides answers)
  router.get(
    '/exam-questions/:questionSetId',
    authenticate,
    asyncHandler(async (req, res) => {
      const questionSetId = req.params.questionSetId!;
      await assertQuestionSetVisible(prisma, req, questionSetId);
      const data = await cacheService.getOrSet(
        `question-sets:exam-questions:${questionSetId}`,
        () => service.getExamQuestions(questionSetId),
        1800, // 30 minutes
      );
      res.json({ data });
    }),
  );

  // Auth: Start exam attempt
  router.post(
    '/start-exam',
    authenticate,
    validate({ body: startExamSchema }),
    asyncHandler(async (req, res) => {
      await assertQuestionSetVisible(prisma, req, req.body.questionSetId as string);
      return controller.startExam(req, res);
    }),
  );

  // Auth: Answer a question during exam
  router.post(
    '/answer/:attemptId',
    authenticate,
    validate({ body: answerQuestionSchema }),
    asyncHandler((req, res) => controller.answerQuestion(req, res)),
  );

  // Auth: Submit exam
  router.post(
    '/submit-exam/:attemptId',
    authenticate,
    asyncHandler((req, res) => controller.submitExam(req, res)),
  );

  // --- Review & stats ---

  // Auth: Get review questions (after exam)
  router.get(
    '/review/:attemptId',
    authenticate,
    asyncHandler((req, res) => controller.getReviewQuestions(req, res)),
  );

  // Auth: Get questions for review (without taking exam - "see answers")
  router.get(
    '/review-questions/:questionSetId',
    authenticate,
    asyncHandler(async (req, res) => {
      await assertQuestionSetVisible(prisma, req, req.params.questionSetId!);
      return controller.getQuestionsForReview(req, res);
    }),
  );

  // Auth: Get question stats
  router.get(
    '/question-stats/:questionId',
    authenticate,
    asyncHandler(async (req, res) => {
      await assertQuestionVisible(prisma, req, req.params.questionId!);
      return controller.getQuestionStats(req, res);
    }),
  );

  // --- Favorites ---

  // Auth: Get all favorite questions for current user
  router.get(
    '/favorites',
    authenticate,
    asyncHandler((req, res) => controller.getFavoriteQuestions(req, res)),
  );

  // Auth: Get questions by subject+topic with cursor pagination and ETag
  router.get(
    '/by-topic',
    authenticate,
    asyncHandler(async (req, res) => {
      const { subject, topic, cursor, limit } = req.query as Record<string, string | undefined>;
      const userId = req.userId!;
      const take = Math.min(parseInt(limit ?? '50', 10), 100);

      const where: Record<string, unknown> = {};
      if (!isAdminRequest(req)) {
        where['questionSet'] = { subExamCategory: { isAdminOnly: false } };
      }
      if (subject) where['subject'] = subject;
      if (topic) where['topic'] = topic;

      const cursorClause = cursor ? { cursor: { id: cursor }, skip: 1 } : {};

      const questions = await prisma.question.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
        take: take + 1,
        ...cursorClause,
      });

      const hasNextPage = questions.length > take;
      const items = hasNextPage ? questions.slice(0, take) : questions;
      const nextCursor = hasNextPage ? items[items.length - 1]!.id : null;

      const favoriteSet = new Set<string>();
      if (items.length > 0) {
        const favs = await prisma.userFavorite.findMany({
          where: { userId, questionId: { in: items.map((q) => q.id) } },
          select: { questionId: true },
        });
        favs.forEach((f) => favoriteSet.add(f.questionId));
      }

      const data = items.map((q) => ({
        id: q.id,
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        subject: q.subject,
        topic: q.topic,
        sortOrder: q.sortOrder,
        userAnswer: null,
        isCorrect: false,
        isFavorite: favoriteSet.has(q.id),
      }));

      res.json({ data, nextCursor, total: items.length });
    }),
  );

  // Auth: Toggle favorite
  router.post(
    '/favorite/:questionId',
    authenticate,
    asyncHandler((req, res) => controller.toggleFavorite(req, res)),
  );

  // --- App settings (admin) ---

  // Admin: Get app settings
  router.get(
    '/settings/free-tier',
    authenticate,
    authorize('ADMIN'),
    asyncHandler((req, res) => controller.getAppSettings(req, res)),
  );

  // Admin: Update app settings
  router.patch(
    '/settings/free-tier',
    authenticate,
    authorize('ADMIN'),
    validate({ body: updateAppSettingsSchema }),
    asyncHandler((req, res) => controller.updateAppSettings(req, res)),
  );

  // Admin: Toggle isFree on a question set
  router.patch(
    '/:id/toggle-free',
    authenticate,
    authorize('ADMIN'),
    asyncHandler((req, res) => controller.toggleFree(req, res)),
  );

  // Auth: Get single question set (members need this for exam page)
  router.get(
    '/:id',
    authenticate,
    asyncHandler(async (req, res) => {
      await assertQuestionSetVisible(prisma, req, req.params.id!);
      return controller.getById(req, res);
    }),
  );

  // Admin: Create
  router.post(
    '/',
    authenticate,
    authorize('ADMIN'),
    validate({ body: createQuestionSetSchema }),
    asyncHandler(async (req, res) => {
      await controller.create(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  // Admin: Update
  router.patch(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    validate({ body: updateQuestionSetSchema }),
    asyncHandler(async (req, res) => {
      await controller.update(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  // Admin: Toggle live/archive status
  router.patch(
    '/:id/toggle-status',
    authenticate,
    authorize('ADMIN'),
    asyncHandler(async (req, res) => {
      await controller.toggleStatus(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  // Admin: Delete
  router.delete(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    asyncHandler(async (req, res) => {
      await controller.delete(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  // Admin: Bulk upsert question sets
  router.post(
    '/bulk-upsert-sets',
    authenticate,
    authorize('ADMIN'),
    validate({ body: bulkUpsertSetsSchema }),
    asyncHandler(async (req, res) => {
      await controller.bulkUpsertSets(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  // Admin: Bulk delete question sets
  router.delete(
    '/bulk-delete-sets',
    authenticate,
    authorize('ADMIN'),
    validate({ body: bulkDeleteSetsSchema }),
    asyncHandler(async (req, res) => {
      await controller.bulkDeleteSets(req, res);
      await invalidateQuestionSetCache();
    }),
  );

  return router;
}
