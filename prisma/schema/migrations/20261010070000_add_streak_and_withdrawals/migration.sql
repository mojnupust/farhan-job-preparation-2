-- CreateEnum
CREATE TYPE "streak_status" AS ENUM ('ACTIVE', 'LOST', 'COMPLETED');

-- CreateEnum
CREATE TYPE "streak_reward_status" AS ENUM ('CREDITED', 'QUEUED');

-- CreateEnum
CREATE TYPE "withdrawal_status" AS ENUM ('REQUESTED', 'APPROVED', 'PAID', 'REJECTED');

-- CreateTable
CREATE TABLE "reward_configs" (
    "id" TEXT NOT NULL,
    "is_singleton" BOOLEAN NOT NULL DEFAULT true,
    "streak_rate_minor_units_per_day" INTEGER NOT NULL DEFAULT 10,
    "streak_free_days" INTEGER NOT NULL DEFAULT 30,
    "streak_premium_days" INTEGER NOT NULL DEFAULT 60,
    "streak_activity_gate_from_day" INTEGER NOT NULL DEFAULT 5,
    "streak_gate_min_questions" INTEGER NOT NULL DEFAULT 10,
    "streak_gate_min_seconds" INTEGER NOT NULL DEFAULT 60,
    "streak_freezes_free_per_month" INTEGER NOT NULL DEFAULT 0,
    "streak_freezes_premium_per_month" INTEGER NOT NULL DEFAULT 1,
    "withdrawal_min_minor_units" INTEGER NOT NULL DEFAULT 10000,
    "withdrawal_requires_verified_phone" BOOLEAN NOT NULL DEFAULT true,
    "monthly_budget_minor_units" INTEGER NOT NULL DEFAULT 500000,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reward_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rewards_budget_periods" (
    "id" TEXT NOT NULL,
    "year_month" VARCHAR(7) NOT NULL,
    "budget_minor_units" INTEGER NOT NULL,
    "spent_minor_units" INTEGER NOT NULL DEFAULT 0,
    "is_exhausted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rewards_budget_periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_streaks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "current_day" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "cycle_start_date" DATE,
    "last_check_in_date" DATE,
    "freezes_used_this_month" INTEGER NOT NULL DEFAULT 0,
    "freezes_month" VARCHAR(7),
    "status" "streak_status" NOT NULL DEFAULT 'ACTIVE',
    "completed_cycles" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_streaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "streak_check_ins" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "dhaka_date" DATE NOT NULL,
    "day_number" INTEGER NOT NULL,
    "reward_minor_units" INTEGER NOT NULL,
    "reward_status" "streak_reward_status" NOT NULL,
    "activity_gate_passed" BOOLEAN NOT NULL,
    "used_freeze" BOOLEAN NOT NULL DEFAULT false,
    "ledger_entry_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "streak_check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdrawal_requests" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount_minor_units" INTEGER NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "destination_number" VARCHAR(20) NOT NULL,
    "status" "withdrawal_status" NOT NULL DEFAULT 'REQUESTED',
    "fraud_flag" BOOLEAN NOT NULL DEFAULT false,
    "fraud_reason" TEXT,
    "paid_trx_id" VARCHAR(50),
    "admin_note" TEXT,
    "reviewed_by" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "idempotency_key" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "withdrawal_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdrawal_audit_logs" (
    "id" TEXT NOT NULL,
    "withdrawal_request_id" TEXT NOT NULL,
    "actor_user_id" TEXT NOT NULL,
    "action" VARCHAR(30) NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "withdrawal_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reward_configs_is_singleton_key" ON "reward_configs"("is_singleton");

-- CreateIndex
CREATE UNIQUE INDEX "rewards_budget_periods_year_month_key" ON "rewards_budget_periods"("year_month");

-- CreateIndex
CREATE UNIQUE INDEX "daily_streaks_user_id_key" ON "daily_streaks"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "streak_check_ins_user_id_dhaka_date_key" ON "streak_check_ins"("user_id", "dhaka_date");

-- CreateIndex
CREATE UNIQUE INDEX "withdrawal_requests_idempotency_key_key" ON "withdrawal_requests"("idempotency_key");

-- CreateIndex
CREATE INDEX "withdrawal_requests_user_id_status_idx" ON "withdrawal_requests"("user_id", "status");

-- CreateIndex
CREATE INDEX "withdrawal_requests_status_created_at_idx" ON "withdrawal_requests"("status", "created_at");

-- AddForeignKey
ALTER TABLE "daily_streaks" ADD CONSTRAINT "daily_streaks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "streak_check_ins" ADD CONSTRAINT "streak_check_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdrawal_requests" ADD CONSTRAINT "withdrawal_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdrawal_audit_logs" ADD CONSTRAINT "withdrawal_audit_logs_withdrawal_request_id_fkey" FOREIGN KEY ("withdrawal_request_id") REFERENCES "withdrawal_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
