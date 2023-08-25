/*
  Warnings:

  - Added the required column `favFood` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hobbies` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favFood" TEXT NOT NULL,
ADD COLUMN     "hobbies" TEXT NOT NULL;
