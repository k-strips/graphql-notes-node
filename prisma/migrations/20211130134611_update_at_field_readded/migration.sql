/*
  Warnings:

  - You are about to drop the column `lastUpdated` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "lastUpdated",
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "lastUpdated",
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastUpdated",
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
