/*
  Warnings:

  - You are about to drop the `PotDeposit` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAW');

-- DropForeignKey
ALTER TABLE "public"."PotDeposit" DROP CONSTRAINT "PotDeposit_potId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PotDeposit" DROP CONSTRAINT "PotDeposit_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PotDeposit" DROP CONSTRAINT "PotDeposit_userId_fkey";

-- DropTable
DROP TABLE "public"."PotDeposit";

-- CreateTable
CREATE TABLE "public"."PotTransaction" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "public"."TransactionType" NOT NULL,
    "depositDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "potId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PotTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PotTransaction_potId_idx" ON "public"."PotTransaction"("potId");

-- CreateIndex
CREATE INDEX "PotTransaction_userId_idx" ON "public"."PotTransaction"("userId");

-- AddForeignKey
ALTER TABLE "public"."PotTransaction" ADD CONSTRAINT "PotTransaction_potId_fkey" FOREIGN KEY ("potId") REFERENCES "public"."Pot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PotTransaction" ADD CONSTRAINT "PotTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
