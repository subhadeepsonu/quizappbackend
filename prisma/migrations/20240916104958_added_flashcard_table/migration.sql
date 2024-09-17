-- CreateTable
CREATE TABLE "FlashCard" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "discription" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "categoryid" TEXT NOT NULL,

    CONSTRAINT "FlashCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
