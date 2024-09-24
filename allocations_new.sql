-- -------------------------------------------------------------
-- TablePlus 6.1.6(570)
--
-- https://tableplus.com/
--
-- Database: belajar-rest-api
-- Generation Time: 2024-09-24 23:12:07.2790
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `allocations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nilai` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `category_id` bigint NOT NULL,
  `district_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2f67a13dd9579e3e5b95569db95` (`category_id`),
  KEY `FK_aa6a7b7cdce66a9a9de34ce51ad` (`district_id`),
  KEY `FK_28409a4ad876dc3ae8ce0a665bd` (`user_id`),
  CONSTRAINT `FK_28409a4ad876dc3ae8ce0a665bd` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_2f67a13dd9579e3e5b95569db95` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FK_aa6a7b7cdce66a9a9de34ce51ad` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `allocations` (`id`, `nilai`, `date`, `createdAt`, `updatedAt`, `category_id`, `district_id`, `user_id`) VALUES
(2, 2000000, '2024-09-24 00:00:00', '2024-09-24 19:39:25', NULL, 11, 7, 1),
(3, 2000000, '2023-02-01 00:00:00', '2024-09-24 22:00:18', '2024-09-24 23:09:06', 11, 6, 5),
(4, 2000000, '2024-09-24 00:00:00', '2024-09-24 22:00:38', NULL, 12, 6, 1),
(5, 2000000, '2024-10-02 00:00:00', '2024-09-24 22:00:54', NULL, 13, 6, 1),
(6, 2000000, '2023-01-24 00:00:00', '2024-09-24 22:18:18', '2024-09-24 23:08:48', 12, 7, 5);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;