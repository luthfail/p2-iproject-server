/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customerId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `UserId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "roles" AS ENUM ('Customer', 'Admin');

-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_customerId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
DROP COLUMN "customerId",
ADD COLUMN     "UserId" INTEGER NOT NULL,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("albumId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "roles" NOT NULL DEFAULT E'Customer';

-- DropTable
DROP TABLE "Customer";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
