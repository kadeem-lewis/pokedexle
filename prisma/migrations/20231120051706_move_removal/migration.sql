/*
  Warnings:

  - You are about to drop the column `moveId` on the `Daily` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Daily_moveId_key";

-- AlterTable
ALTER TABLE "Daily" DROP COLUMN "moveId";
