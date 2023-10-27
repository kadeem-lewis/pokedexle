/*
  Warnings:

  - Changed the type of `date` on the `Daily` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Daily_id_key";

-- AlterTable
ALTER TABLE "Daily" DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL,
ADD CONSTRAINT "Daily_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Daily_date_key" ON "Daily"("date");
