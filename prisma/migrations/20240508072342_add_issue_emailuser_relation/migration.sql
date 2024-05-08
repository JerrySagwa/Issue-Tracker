-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assignedToUserEmail` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserEmail_fkey` FOREIGN KEY (`assignedToUserEmail`) REFERENCES `EmailUser`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
