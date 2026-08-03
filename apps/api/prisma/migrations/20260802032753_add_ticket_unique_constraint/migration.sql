/*
  Warnings:

  - A unique constraint covering the columns `[branch_id,code]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tickets_branch_id_code_key" ON "tickets"("branch_id", "code");
