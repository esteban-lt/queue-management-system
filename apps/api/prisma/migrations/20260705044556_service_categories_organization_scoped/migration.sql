/*
  Warnings:

  - You are about to drop the column `branch_id` on the `service_categories` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `service_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "service_categories" DROP CONSTRAINT "service_categories_branch_id_fkey";

-- AlterTable
ALTER TABLE "service_categories" DROP COLUMN "branch_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "service_categories" ADD CONSTRAINT "service_categories_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
