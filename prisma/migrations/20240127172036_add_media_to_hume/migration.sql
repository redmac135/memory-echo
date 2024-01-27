/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Hume` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Hume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaId` to the `Hume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hume" DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "mediaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Hume" ADD CONSTRAINT "Hume_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
