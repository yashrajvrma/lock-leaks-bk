/*
  Warnings:

  - A unique constraint covering the columns `[priceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `Pricing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `priceId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PricingName" AS ENUM ('FREE', 'STARTER', 'PRO', 'STAR');

-- AlterTable
ALTER TABLE "public"."Pricing" DROP COLUMN "name",
ADD COLUMN     "name" "public"."PricingName" NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "priceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_priceId_key" ON "public"."User"("priceId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "public"."Pricing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
