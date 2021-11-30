/*
  Warnings:

  - You are about to drop the column `userId` on the `Note` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[noteId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "noteId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_noteId_key" ON "User"("noteId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
