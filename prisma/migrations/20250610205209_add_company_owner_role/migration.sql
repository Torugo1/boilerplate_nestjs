-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('Master', 'Admin', 'User', 'CompanyOwner') NOT NULL DEFAULT 'User';
