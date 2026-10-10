-- CreateEnum
CREATE TYPE "ledger_entry_type" AS ENUM ('STREAK_REWARD', 'REFERRAL_COMMISSION', 'CONTRIBUTION_REWARD', 'WITHDRAWAL_PAID', 'ADMIN_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "ledger_direction" AS ENUM ('CREDIT', 'DEBIT');

-- CreateTable
CREATE TABLE "wallet_accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "balance_minor_units" INTEGER NOT NULL DEFAULT 0,
    "locked_minor_units" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallet_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_ledger_entries" (
    "id" TEXT NOT NULL,
    "wallet_account_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "ledger_entry_type" NOT NULL,
    "direction" "ledger_direction" NOT NULL,
    "amount_minor_units" INTEGER NOT NULL,
    "balance_after_minor_units" INTEGER NOT NULL,
    "reference_type" VARCHAR(40) NOT NULL,
    "reference_id" TEXT NOT NULL,
    "idempotency_key" VARCHAR(200) NOT NULL,
    "note" TEXT,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_ledger_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallet_accounts_user_id_key" ON "wallet_accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_ledger_entries_idempotency_key_key" ON "wallet_ledger_entries"("idempotency_key");

-- CreateIndex
CREATE INDEX "wallet_ledger_entries_user_id_created_at_idx" ON "wallet_ledger_entries"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "wallet_ledger_entries_reference_type_reference_id_idx" ON "wallet_ledger_entries"("reference_type", "reference_id");

-- AddForeignKey
ALTER TABLE "wallet_accounts" ADD CONSTRAINT "wallet_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_ledger_entries" ADD CONSTRAINT "wallet_ledger_entries_wallet_account_id_fkey" FOREIGN KEY ("wallet_account_id") REFERENCES "wallet_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_ledger_entries" ADD CONSTRAINT "wallet_ledger_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
