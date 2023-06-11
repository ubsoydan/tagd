/*
  Warnings:

  - A unique constraint covering the columns `[id,listId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_id_listId_key" ON "Bookmark"("id", "listId");
