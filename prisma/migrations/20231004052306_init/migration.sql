/*
  Warnings:

  - A unique constraint covering the columns `[sprite]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sprite` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "sprite" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_sprite_key" ON "Pokemon"("sprite");
