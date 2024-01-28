/*
  Warnings:

  - You are about to drop the column `confidence` on the `Hume` table. All the data in the column will be lost.
  - Added the required column `happiness` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "happiness" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Hume" DROP COLUMN "confidence";
