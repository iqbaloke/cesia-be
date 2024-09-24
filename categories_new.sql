-- -------------------------------------------------------------
-- TablePlus 6.1.6(570)
--
-- https://tableplus.com/
--
-- Database: belajar-rest-api
-- Generation Time: 2024-09-24 23:12:22.9080
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `jenis` varchar(255) NOT NULL,
  `kota` decimal(10,0) NOT NULL,
  `provinsi` decimal(10,0) NOT NULL,
  `pusat` decimal(10,0) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categories` (`id`, `name`, `jenis`, `kota`, `provinsi`, `pusat`, `createdAt`, `updatedAt`) VALUES
(11, 'PPh 21 Pegawai', 'Penerimaan Pajak', 10, 20, 70, '2024-09-24 08:03:59', NULL),
(12, 'PPh 22 (Pot Put)', 'Penerimaan Pajak', 20, 10, 70, '2024-09-24 08:04:18', NULL),
(13, 'Pajak Bumi dan Bangunan', 'Penerimaan Pajak Daerah', 30, 30, 40, '2024-09-24 08:04:31', NULL),
(14, 'Pajak Penggunaan Hutan (IPPKH)', 'Penerimaan Pajak Daerah', 40, 40, 20, '2024-09-24 08:04:42', NULL),
(15, 'Dividen', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 08:05:06', NULL),
(16, 'SP3D (Sumbangan Pihak ke-3)', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 08:05:16', NULL),
(17, 'Iuran Produksi Batubara (ROYALTI)', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 08:06:00', NULL),
(18, 'PPh 23 (Pot Put)', 'Penerimaan Pajak', 10, 20, 70, '2024-09-24 11:15:22', NULL),
(19, 'PPh 26 (Pot Put)', 'Penerimaan Pajak', 10, 20, 70, '2024-09-24 11:15:40', NULL),
(20, 'PPh 4(2) (Pot Put)', 'Penerimaan Pajak', 10, 20, 70, '2024-09-24 11:15:54', NULL),
(21, 'PPh 15 (Pot Put)', 'Penerimaan Pajak', 10, 20, 70, '2024-09-24 11:16:13', NULL),
(22, 'PPh 25 Kredit Pajak', 'Penerimaan Pajak', 10, 20, 70, '2024-09-24 11:17:24', NULL),
(23, 'PPh 29 SPT Badan KB', 'Penerimaan Pajak', 10, 20, 70, '2024-09-24 11:17:35', NULL),
(24, 'PPh 22 Ekspor', 'Penerimaan Pajak', 10, 20, 70, '2024-09-24 11:17:46', NULL),
(25, 'PPN MASA KB', 'Penerimaan Pajak', 10, 20, 70, '2024-09-24 11:17:59', NULL),
(26, 'Pajak Alat Berat / Kendaraan Bermotor', 'Penerimaan Pajak Daerah', 10, 20, 70, '2024-09-24 11:18:20', NULL),
(27, 'Pajak Penerangan Jalan', 'Penerimaan Pajak Daerah', 10, 20, 70, '2024-09-24 11:18:33', NULL),
(28, 'Pajak Air Permukaan/ Bawah Tanah', 'Penerimaan Pajak Daerah', 10, 20, 70, '2024-09-24 11:18:44', NULL),
(29, 'Pajak Daerah Jasa Boga', 'Penerimaan Pajak Daerah', 10, 20, 70, '2024-09-24 11:18:54', NULL),
(30, 'Pajak Galian C', 'Penerimaan Pajak Daerah', 10, 20, 70, '2024-09-24 11:19:09', NULL),
(31, 'Pajak Penggunaan Hutan', 'Penerimaan Pajak Daerah', 10, 20, 70, '2024-09-24 11:19:19', NULL),
(32, 'Pajak Reklame', 'Penerimaan Pajak Daerah', 10, 20, 70, '2024-09-24 11:19:32', NULL),
(33, 'Iuran Tetap / Kuasa Penambangan', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 11:21:27', NULL),
(34, 'Retribusi Kebersihan', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 11:21:40', NULL),
(35, 'Retribusi IMB', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 11:21:54', NULL),
(36, 'Sewa Perairan', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 11:22:05', NULL),
(37, 'Retribusi Pemeriksaan Alat Pemadam Kebakaran', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 11:22:16', NULL),
(38, 'PNBP Pendaftaran, Pelayanan dan Pengukuran Aset', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 11:22:28', NULL),
(39, 'PNBP Biaya Hak Penggunaan (BHP)', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 11:22:39', NULL),
(40, 'PNBP Peralihan Aset', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 11:22:51', NULL),
(41, 'BPHTB', 'Penerimaan Bukan Pajak', 10, 20, 70, '2024-09-24 11:25:54', NULL);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;