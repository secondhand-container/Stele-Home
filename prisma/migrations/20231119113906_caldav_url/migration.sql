/*
  Warnings:

  - Added the required column `caldavUrl` to the `Config` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "caldavUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Config" ("createdAt", "id", "latitude", "longitude", "name", "updatedAt") SELECT "createdAt", "id", "latitude", "longitude", "name", "updatedAt" FROM "Config";
DROP TABLE "Config";
ALTER TABLE "new_Config" RENAME TO "Config";
CREATE INDEX "Config_name_idx" ON "Config"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
