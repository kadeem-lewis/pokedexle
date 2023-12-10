-- CreateTable
CREATE TABLE "Daily" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "classicId" INTEGER NOT NULL,
    "whosThatPokemonId" INTEGER NOT NULL,

    CONSTRAINT "Daily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Daily_day_key" ON "Daily"("day");

-- CreateIndex
CREATE UNIQUE INDEX "Daily_date_key" ON "Daily"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Daily_classicId_key" ON "Daily"("classicId");

-- CreateIndex
CREATE UNIQUE INDEX "Daily_whosThatPokemonId_key" ON "Daily"("whosThatPokemonId");
