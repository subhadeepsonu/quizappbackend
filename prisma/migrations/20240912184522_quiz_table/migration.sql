/*
  Warnings:

  - Added the required column `categoryid` to the `quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submissions" ALTER COLUMN "live" SET DEFAULT false;

-- AlterTable
ALTER TABLE "quiz" ADD COLUMN     "categoryid" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "live" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
