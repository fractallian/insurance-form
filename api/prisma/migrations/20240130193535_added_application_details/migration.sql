/*
  Warnings:

  - Added the required column `city` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "applicationId" INTEGER NOT NULL,
    "VIN" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    CONSTRAINT "Vehicle_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL
);
INSERT INTO "new_Application" ("firstName", "id", "lastName") SELECT "firstName", "id", "lastName" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_VIN_key" ON "Vehicle"("VIN");
