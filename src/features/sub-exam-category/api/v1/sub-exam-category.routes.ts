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
import { assertSubCategoryVisible, isAdminRequest } from '../../../../shared/utils/admin-only.js';
import { asyncHandler } from '../../../../shared/utils/async-handler.js';
import { SubExamCategoryService } from '../../domain/sub-exam-category.service.js';
import { SubExamCategoryPrismaRepository } from '../../infra/sub-exam-category.prisma-repository.js';
import {
  bulkDeleteSubExamCategoriesSchema,
  bulkUpsertSubExamCategoriesSchema,
  createSubExamCategorySchema,
  updateSubExamCategorySchema,
} from '../validation.js';

import { SubExamCategoryController } from './sub-exam-category.controller.js';

const CACHE_TTL = 600; // 10 minutes

export function createSubExamCategoryRoutes(container: AwilixContainer): Router {
  const router = Router();

  const prisma = container.resolve<PrismaClient>('prismaClient');
  const cacheService = container.resolve<CacheService>('cacheService');
  const repository = new SubExamCategoryPrismaRepository(prisma);
  const service = new SubExamCategoryService(repository);
  const controller = new SubExamCategoryController(service);

  async function invalidateCache() {
    await cacheService.invalidatePattern('sub-categories:*');
  }

  // Public: list all sub-categories (id + name and the rest of the DTO)
  // admin-only sub-category শুধু ADMIN token থাকলে দেখা যায়; cache key আলাদা।
  router.get(
    '/',
    optionalAuthenticate,
    asyncHandler(async (req, res) => {
      const activeOnly = req.query.activeOnly !== 'false';
      const admin = isAdminRequest(req);
      const cacheKey =
        (activeOnly ? 'sub-categories:all' : 'sub-categories:all:inactive') +
        (admin ? ':admin' : '');
      const data = await cacheService.getOrSet(
        cacheKey,
        async () => {
          const all = await service.getAll(activeOnly);
          return admin ? all : all.filter((s) => !s.isAdminOnly);
        },
        CACHE_TTL,
      );
      res.json({ data });
    }),
  );

  // Public: Get sub-categories by parent category slug
  router.get(
    '/by-category/:categorySlug',
    optionalAuthenticate,
    asyncHandler(async (req, res) => {
      const categorySlug = req.params.categorySlug!;
      const category = await prisma.examCategory.findUnique({
        where: { slug: categorySlug },
        select: { id: true },
      });
      if (!category) {
        throw new NotFoundError('Exam category not found');
      }
      const admin = isAdminRequest(req);
      const data = await cacheService.getOrSet(
        `sub-categories:category:${categorySlug}${admin ? ':admin' : ''}`,
        async () => {
          const all = await service.getByCategoryId(category.id, true);
          return admin ? all : all.filter((s) => !s.isAdminOnly);
        },
        CACHE_TTL,
      );
      res.json({ data });
    }),
  );

  // Authenticated: Get user's summary for a category
  router.get(
    '/summary/:categorySlug',
    authenticate,
    asyncHandler(async (req, res) => {
      const category = await prisma.examCategory.findUnique({
        where: { slug: req.params.categorySlug! },
        select: { id: true },
      });
      if (!category) {
        throw new NotFoundError('Exam category not found');
      }
      req.params.categoryId = category.id;
      return controller.getUserSummary(req, res);
    }),
  );

  // Public: Sitemap — returns [{categorySlug, subSlug, updatedAt}]
  router.get(
    '/sitemap',
    asyncHandler(async (_req, res) => {
      const data = await cacheService.getOrSet(
        'sub-categories:sitemap',
        async () => {
          const rows = await prisma.subExamCategory.findMany({
            where: { isActive: true, isAdminOnly: false },
            select: {
              slug: true,
              updatedAt: true,
              examCategory: { select: { slug: true } },
            },
            orderBy: { sortOrder: 'asc' },
          });
          return rows.map((r) => ({
            categorySlug: r.examCategory.slug,
            subSlug: r.slug,
            updatedAt: r.updatedAt,
          }));
        },
        21_600, // 6 hours — matches sitemap revalidate
      );
      res.json({ data });
    }),
  );

  // Admin: Bulk operations (must be before /:id)
  router.post(
    '/bulk-upsert',
    authenticate,
    authorize('ADMIN'),
    validate({ body: bulkUpsertSubExamCategoriesSchema }),
    asyncHandler(async (req, res) => {
      await controller.bulkUpsert(req, res);
      await invalidateCache();
    }),
  );

  router.delete(
    '/bulk-delete',
    authenticate,
    authorize('ADMIN'),
    validate({ body: bulkDeleteSubExamCategoriesSchema }),
    asyncHandler(async (req, res) => {
      await controller.bulkDelete(req, res);
      await invalidateCache();
    }),
  );

  // Admin: CRUD
  router.post(
    '/',
    authenticate,
    authorize('ADMIN'),
    validate({ body: createSubExamCategorySchema }),
    asyncHandler(async (req, res) => {
      await controller.create(req, res);
      await invalidateCache();
    }),
  );

  router.patch(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    validate({ body: updateSubExamCategorySchema }),
    asyncHandler(async (req, res) => {
      await controller.update(req, res);
      await invalidateCache();
    }),
  );

  router.delete(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    asyncHandler(async (req, res) => {
      await controller.delete(req, res);
      await invalidateCache();
    }),
  );

  // Public: Merit list for a sub-category
  router.get(
    '/merit-list/:subCategorySlug',
    optionalAuthenticate,
    asyncHandler(async (req, res) => {
      const subCategorySlug = req.params.subCategorySlug!;
      await assertSubCategoryVisible(prisma, req, subCategorySlug);
      const sub = await prisma.subExamCategory.findUnique({
        where: { slug: subCategorySlug },
        select: { id: true },
      });
      if (!sub) {
        throw new NotFoundError('Sub exam category not found');
      }
      req.params.subCategoryId = sub.id;
      return controller.getMeritList(req, res);
    }),
  );

  return router;
}
