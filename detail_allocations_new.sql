-- -------------------------------------------------------------
-- TablePlus 6.1.6(570)
--
-- https://tableplus.com/
--
-- Database: belajar-rest-api
-- Generation Time: 2024-09-24 23:12:39.4270
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `detail_allocations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nilai` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `kota` decimal(10,0) DEFAULT NULL,
  `provinsi` decimal(10,0) DEFAULT NULL,
  `pusat` decimal(10,0) DEFAULT NULL,
  `potongan_kota` decimal(10,0) DEFAULT NULL,
  `potongan_provinsi` decimal(10,0) DEFAULT NULL,
  `potongan_pusat` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `category_id` bigint NOT NULL,
  `allocation_id` bigint NOT NULL,
  `district_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_3b9204d4918a372dcd63706e85` (`allocation_id`),
  KEY `FK_3dd47c921a945b47aced5f09d85` (`category_id`),
  KEY `FK_af861424525a1de35b4cc5d441d` (`district_id`),
  KEY `FK_c423c9ab089863653da74f873a7` (`user_id`),
  CONSTRAINT `FK_3b9204d4918a372dcd63706e855` FOREIGN KEY (`allocation_id`) REFERENCES `allocations` (`id`),
  CONSTRAINT `FK_3dd47c921a945b47aced5f09d85` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FK_af861424525a1de35b4cc5d441d` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`),
  CONSTRAINT `FK_c423c9ab089863653da74f873a7` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `detail_allocations` (`id`, `nilai`, `date`, `kota`, `provinsi`, `pusat`, `potongan_kota`, `potongan_provinsi`, `potongan_pusat`, `createdAt`, `updatedAt`, `category_id`, `allocation_id`, `district_id`, `user_id`) VALUES
(2, 2000000, '2024-09-24 00:00:00', 200000, 400000, 1400000, 10, 20, 70, '2024-09-24 19:39:25', NULL, 11, 2, 7, 1),
(5, 2000000, '2024-09-24 00:00:00', 400000, 200000, 1400000, 20, 10, 70, '2024-09-24 22:00:38', NULL, 12, 4, 6, 5),
(6, 2000000, '2024-10-02 00:00:00', 600000, 600000, 800000, 30, 30, 40, '2024-09-24 22:00:54', NULL, 13, 5, 6, 5),
(10, 2000000, '2023-01-24 00:00:00', 400000, 200000, 1400000, 20, 10, 70, '2024-09-24 23:08:48', NULL, 12, 6, 7, 5),
(11, 2000000, '2023-02-01 00:00:00', 200000, 400000, 1400000, 10, 20, 70, '2024-09-24 23:09:06', NULL, 11, 3, 6, 5);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;