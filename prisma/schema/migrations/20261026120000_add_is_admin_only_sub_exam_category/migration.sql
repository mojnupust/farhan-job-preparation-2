-- AlterTable
ALTER TABLE "sub_exam_categories" ADD COLUMN "is_admin_only" BOOLEAN NOT NULL DEFAULT false;

-- Random Exams শুধু admin-এর জন্য
UPDATE "sub_exam_categories" SET "is_admin_only" = true WHERE "slug" = 'random-exams';
