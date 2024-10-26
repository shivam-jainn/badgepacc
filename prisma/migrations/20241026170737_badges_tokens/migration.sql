/*
  Warnings:

  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "skills" TEXT[];

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "UserSkill";

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "no_of_issued" INTEGER NOT NULL,
    "time_of_creation" TIMESTAMP(3) NOT NULL,
    "creator_email" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokens" (
    "id" TEXT NOT NULL,
    "issuance_time" TIMESTAMP(3) NOT NULL,
    "issuance_id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "badge_id" TEXT NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_user_email_badge_id_key" ON "Tokens"("user_email", "badge_id");

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_creator_email_fkey" FOREIGN KEY ("creator_email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
