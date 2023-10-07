/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Daily` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Daily" ADD COLUMN     "id" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Daily_id_key" ON "Daily"("id");
