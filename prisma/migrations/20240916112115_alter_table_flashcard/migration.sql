/*
  Warnings:

  - You are about to drop the column `difficulty` on the `FlashCard` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `FlashCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FlashCard" DROP COLUMN "difficulty",
DROP COLUMN "image",
ALTER COLUMN "discription" DROP DEFAULT;
