/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contactLiveChat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contactWhatsappNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `platformId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "contactEmail",
DROP COLUMN "contactLiveChat",
DROP COLUMN "contactPhoneNumber",
DROP COLUMN "contactWhatsappNumber",
DROP COLUMN "platform",
DROP COLUMN "username",
ADD COLUMN     "platformId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Platform" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "contactWhatsappNumber" TEXT,
    "contactPhoneNumber" TEXT,
    "contactLiveChat" TEXT,
    "contactEmail" TEXT,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "public"."Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
