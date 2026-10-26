import type { PrismaClient } from '@prisma/client';
import type { Request } from 'express';

import { ForbiddenError, NotFoundError } from '../errors/http-errors.js';

/** Request-এর token-এ role ADMIN থাকলে true (optionalAuthenticate/authenticate এর পরে কাজ করে). */
export function isAdminRequest(req: Request): boolean {
  return req.userRole === 'ADMIN';
}

/** Sub-category slug admin-only হলে non-admin-কে 404 দেয় (অস্তিত্বই লুকানো). */
export async function assertSubCategoryVisible(
  prisma: PrismaClient,
  req: Request,
  slug: string,
): Promise<void> {
  if (isAdminRequest(req)) return;
  const sub = await prisma.subExamCategory.findUnique({
    where: { slug },
    select: { isAdminOnly: true },
  });
  if (!sub || sub.isAdminOnly) {
    throw new NotFoundError('Sub exam category not found');
  }
}

/** Question set admin-only category-র হলে non-admin-কে 404 দেয়. */
export async function assertQuestionSetVisible(
  prisma: PrismaClient,
  req: Request,
  questionSetId: string,
): Promise<void> {
  if (isAdminRequest(req)) return;
  const set = await prisma.questionSet.findUnique({
    where: { id: questionSetId },
    select: { subExamCategory: { select: { isAdminOnly: true } } },
  });
  if (set?.subExamCategory.isAdminOnly) {
    throw new NotFoundError('Question set not found');
  }
}

/** Question-এর নিজের set admin-only category-র হলে non-admin-কে 404 দেয়. */
export async function assertQuestionVisible(
  prisma: PrismaClient,
  req: Request,
  questionId: string,
): Promise<void> {
  if (isAdminRequest(req)) return;
  const q = await prisma.question.findUnique({
    where: { id: questionId },
    select: { questionSet: { select: { subExamCategory: { select: { isAdminOnly: true } } } } },
  });
  if (q?.questionSet.subExamCategory.isAdminOnly) {
    throw new NotFoundError('Question not found');
  }
}

/** এই id-গুলোর কোনোটা admin-only category-র হলে non-admin-কে 403 দেয় (docx এর জন্য). */
export async function assertDocxSetsAllowed(
  prisma: PrismaClient,
  req: Request,
  questionSetIds: string[],
): Promise<void> {
  if (isAdminRequest(req) || questionSetIds.length === 0) return;
  const blocked = await prisma.questionSet.count({
    where: { id: { in: questionSetIds }, subExamCategory: { isAdminOnly: true } },
  });
  if (blocked > 0) {
    throw new ForbiddenError('Only admin can generate or download docx for this question set');
  }
}
