-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "generation" INTEGER NOT NULL,
    "types" TEXT[],
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "Move" (
    "name" TEXT NOT NULL,
    "generation" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "class" TEXT NOT NULL,
    "pp" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_id_key" ON "Pokemon"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Move_name_key" ON "Move"("name");
