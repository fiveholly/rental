-- SQL migration for initial schema (MySQL)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `mobile` VARCHAR(20) UNIQUE,
  `role` ENUM('admin','landlord','tenant') NOT NULL DEFAULT 'tenant',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `address` VARCHAR(255) NOT NULL,
  `area` DECIMAL(10,2) NOT NULL,
  `layout` VARCHAR(50) NOT NULL,
  `facilities` JSON NULL,
  `status` ENUM('vacant','rented','decorating','terminated') NOT NULL DEFAULT 'vacant',
  `landlord_info` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `tenants` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `real_name` VARCHAR(50) NOT NULL,
  `id_card_no` VARCHAR(20) NOT NULL,
  `mobile` VARCHAR(20) NOT NULL,
  `emergency_contact` JSON NULL,
  `occupant_count` INT DEFAULT 1,
  `id_card_photos` JSON NULL,
  `source` VARCHAR(50) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contracts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `contract_no` VARCHAR(50) UNIQUE,
  `property_id` INT,
  `tenant_id` INT,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `rent_amount` DECIMAL(10,2) NOT NULL,
  `deposit_amount` DECIMAL(10,2) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `payment_day_offset` INT DEFAULT 0,
  `status` ENUM('active','expired','terminated') DEFAULT 'active',
  `attachments` JSON NULL,
  `termination_info` JSON NULL,
  `created_by` INT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `bills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `contract_id` INT,
  `bill_type` ENUM('rent','property_fee','water','electricity','other') DEFAULT 'rent',
  `period_start` DATE NULL,
  `period_end` DATE NULL,
  `due_date` DATE NOT NULL,
  `due_amount` DECIMAL(10,2) NOT NULL,
  `paid_date` DATE NULL,
  `paid_amount` DECIMAL(10,2) DEFAULT 0.00,
  `status` ENUM('unpaid','paid','overdue') DEFAULT 'unpaid',
  `payment_channel` VARCHAR(50) NULL,
  `transaction_id` VARCHAR(100) NULL,
  `payment_voucher` VARCHAR(255) NULL,
  `notes` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (contract_id) REFERENCES contracts(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `maintenance_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `property_id` INT,
  `tenant_id` INT,
  `type` VARCHAR(50),
  `description` TEXT,
  `photos` JSON NULL,
  `status` ENUM('pending','processing','completed') DEFAULT 'pending',
  `result` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
