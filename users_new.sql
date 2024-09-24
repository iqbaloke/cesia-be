-- -------------------------------------------------------------
-- TablePlus 6.1.6(570)
--
-- https://tableplus.com/
--
-- Database: belajar-rest-api
-- Generation Time: 2024-09-24 23:13:30.4740
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `username`, `name`, `email`, `password`, `token`, `user_role`, `createdAt`, `updatedAt`) VALUES
(1, 'IqbalAn19', 'Iqbal Wahyudi', 'iqbalwahyudi718@gmail.com', '$2b$10$VfLDSz9aeaIDbkn9k84doep34DUjG.xl/Lmpf2byu9TzLQJeDekj.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IklxYmFsQW4xOSIsImlkIjoiMSIsInJvbGUiOiJTcGVzaWFsaXMgS2V1YW5nYW4iLCJpYXQiOjE3MjcxODkyMTEsImV4cCI6MTcyNzE5NjQxMX0.eFsvQzjp0wHA5q5Fb8tRa2uqxpcBdM4cQDTDbxpP83E', 'Spesialis Keuangan', '2024-09-23 11:20:57', NULL),
(5, 'admin', 'admin', 'admin@gmail.com', '$2b$10$..Q.Zy42RkG.oDvFvdKXmevpskSV1IhEZ6c6BmzH97vzNs.HNsoU2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1Iiwicm9sZSI6IkFNIFBQTiAoQXNzaXN0YW50IE1hbmFnZXIgUGFqYWsgUGVydGFtYmFoYW4gTmlsYWkpIiwiaWF0IjoxNzI3MTg5MTEwLCJleHAiOjE3MjcxOTYzMTB9.IBUSpKVf4Rtm60E5nyLXLvy692CpIbhX-eXFgDVTjsc', 'AM PPN (Assistant Manager Pajak Pertambahan Nilai)', '2024-09-23 22:33:36', NULL);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;