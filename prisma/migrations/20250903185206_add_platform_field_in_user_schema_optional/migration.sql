-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_platformId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "platformId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "public"."Platform"("id") ON DELETE SET NULL ON UPDATE CASCADE;
