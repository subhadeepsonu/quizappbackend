-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'hard');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "categoryid" TEXT NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz" (
    "id" TEXT NOT NULL,
    "live" BOOLEAN NOT NULL,
    "difficulty" "Difficulty" NOT NULL,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id" TEXT NOT NULL,
    "live" BOOLEAN NOT NULL,
    "score" INTEGER NOT NULL,
    "maxscore" INTEGER NOT NULL,
    "quizid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_questionToquiz" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_questionToquiz_AB_unique" ON "_questionToquiz"("A", "B");

-- CreateIndex
CREATE INDEX "_questionToquiz_B_index" ON "_questionToquiz"("B");

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_questionToquiz" ADD CONSTRAINT "_questionToquiz_A_fkey" FOREIGN KEY ("A") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_questionToquiz" ADD CONSTRAINT "_questionToquiz_B_fkey" FOREIGN KEY ("B") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
