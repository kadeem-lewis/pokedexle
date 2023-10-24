/*
  Warnings:

  - You are about to drop the `Move` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pokemon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Daily" DROP CONSTRAINT "Daily_classicId_fkey";

-- DropForeignKey
ALTER TABLE "Daily" DROP CONSTRAINT "Daily_moveId_fkey";

-- DropForeignKey
ALTER TABLE "Daily" DROP CONSTRAINT "Daily_whosThatPokemonId_fkey";

-- AlterTable
ALTER TABLE "Daily" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Move";

-- DropTable
DROP TABLE "Pokemon";
