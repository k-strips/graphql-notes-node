/*
  Warnings:

  - Added the required column `middleName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "middleName" VARCHAR(16) NOT NULL,
ADD COLUMN     "userName" VARCHAR(16) NOT NULL;
