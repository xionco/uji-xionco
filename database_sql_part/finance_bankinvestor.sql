-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2025 at 12:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xioncodatabases`
--

-- --------------------------------------------------------

--
-- Table structure for table `finance_bankinvestor`
--

CREATE TABLE `finance_bankinvestor` (
  `no` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `tahun` text NOT NULL,
  `danadariitem` text NOT NULL,
  `totaluses` text NOT NULL,
  `namalengkap` text NOT NULL,
  `username` text NOT NULL,
  `keterangan` text NOT NULL,
  `investor_mj` text NOT NULL,
  `folderfoto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `finance_bankinvestor`
--

INSERT INTO `finance_bankinvestor` (`no`, `tglinputmili`, `tahun`, `danadariitem`, `totaluses`, `namalengkap`, `username`, `keterangan`, `investor_mj`, `folderfoto`) VALUES
(2, '1750055786082', '2025', 'AETHER - CLOUD K100', '10000', 'Hammam Oktajianto', '999990', 'Beli stock AETHER - CLOUD K100', 'Marco', '/assets/bank-investor/2025/bankinvestor-16Juni2025-2025-1750055783822.png'),
(3, '1750056001044', '2025', 'AETHER - CLOUD K60', '5000', 'Hammam Oktajianto', '999990', 'Beli stock AETHER - STANDING', 'Marco', '/assets/bank-investor/2025/bankinvestor-16Juni2025-2025-1750055998766.png'),
(4, '1750064953072', '2025', 'AETHER - CLOUD K100', '350000', 'Hammam Oktajianto', '999990', 'Beli stock EACH - FOLDING UMBRELLA 23', 'Marco', '/assets/bank-investor/2025/bankinvestor-16Juni2025-2025-1750064950799.png'),
(5, '1750065249456', '2025', 'AETHER - CLOUD K100', '12340', 'Hammam Oktajianto', '999990', 'foya foya', 'Marco', '/assets/bank-investor/2025/bankinvestor-16Juni2025-2025-1750065245370.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `finance_bankinvestor`
--
ALTER TABLE `finance_bankinvestor`
  ADD PRIMARY KEY (`no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `finance_bankinvestor`
--
ALTER TABLE `finance_bankinvestor`
  MODIFY `no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
