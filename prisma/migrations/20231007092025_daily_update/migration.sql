/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Move` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Move_name_key";

-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Daily" (
    "date" TIMESTAMP(3) NOT NULL,
    "classicId" INTEGER NOT NULL,
    "moveId" INTEGER NOT NULL,
    "whosThatPokemonId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Daily_date_key" ON "Daily"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Daily_classicId_key" ON "Daily"("classicId");

-- CreateIndex
CREATE UNIQUE INDEX "Daily_moveId_key" ON "Daily"("moveId");

-- CreateIndex
CREATE UNIQUE INDEX "Daily_whosThatPokemonId_key" ON "Daily"("whosThatPokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "Move_id_key" ON "Move"("id");

-- AddForeignKey
ALTER TABLE "Daily" ADD CONSTRAINT "Daily_classicId_fkey" FOREIGN KEY ("classicId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily" ADD CONSTRAINT "Daily_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily" ADD CONSTRAINT "Daily_whosThatPokemonId_fkey" FOREIGN KEY ("whosThatPokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
