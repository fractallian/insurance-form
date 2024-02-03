-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" INTEGER,
    "submittedAt" DATETIME
);
INSERT INTO "new_Application" ("city", "dateOfBirth", "firstName", "id", "lastName", "state", "street", "submittedAt", "zipCode") SELECT "city", "dateOfBirth", "firstName", "id", "lastName", "state", "street", "submittedAt", "zipCode" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
