/*
  Warnings:

  - You are about to drop the column `emotion` on the `Hume` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `Hume` table. All the data in the column will be lost.
  - Added the required column `confidence` to the `Hume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryId` to the `Hume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hume" DROP CONSTRAINT "Hume_mediaId_fkey";

-- AlterTable
ALTER TABLE "Hume" DROP COLUMN "emotion",
DROP COLUMN "mediaId",
ADD COLUMN     "confidence" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "entryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Hume" ADD CONSTRAINT "Hume_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
