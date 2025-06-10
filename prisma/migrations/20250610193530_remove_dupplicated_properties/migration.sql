/*
  Warnings:

  - You are about to drop the column `document` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `companies` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `companies_document_key` ON `companies`;

-- DropIndex
DROP INDEX `companies_email_key` ON `companies`;

-- DropIndex
DROP INDEX `companies_phone_key` ON `companies`;

-- AlterTable
ALTER TABLE `companies` DROP COLUMN `document`,
    DROP COLUMN `email`,
    DROP COLUMN `phone`;
