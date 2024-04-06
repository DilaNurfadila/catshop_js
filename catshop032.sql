-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 06, 2024 at 11:37 PM
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
-- Database: `catshop032`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories032`
--

CREATE TABLE `categories032` (
  `category_id_032` int(11) NOT NULL,
  `category_name_032` varchar(50) NOT NULL,
  `description_032` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories032`
--

INSERT INTO `categories032` (`category_id_032`, `category_name_032`, `description_032`) VALUES
(3, 'Domestic', 'The Domestic shorthair comes in a wide array of colors, sizes, and statures, though they tend to be medium-sized and muscular.'),
(4, 'Persia', 'Persian cat, also known as the Persian Longhair, is a long-haired breed of cat characterised by a round face and short muzzle.'),
(5, 'Angora', 'The Turkish Angora (Turkish: Ankara kedisi, \'Ankara cat\'[2]) is a breed of domestic cat. Turkish Angoras are one of the ancient, natural breeds of cat, having originated in central Anatolia (Ankara Pr'),
(6, 'Bengal', 'The Bengal cat is a breed of hybrid cat created from crossing of an Asian leopard cat (Prionailurus bengalensis), with domestic cats, especially the spotted Egyptian Mau.'),
(7, 'Egyptian Mau', 'The Egyptian Mau is a small to medium-sized short-haired cat breed. They are one of the few naturally spotted breeds of domesticated cat. The spots of the Mau occur on only the tips of the hairs of it'),
(8, 'Aegean', 'Aegean cats (Greek: γάτα του Αιγαίου gáta tou Aigaíou) are a naturally occurring landrace of domestic cat originating from the Cycladic Islands of Greece and western Turkey. It is considered a natural');

-- --------------------------------------------------------

--
-- Table structure for table `cats032`
--

CREATE TABLE `cats032` (
  `id_032` int(11) NOT NULL,
  `name_032` varchar(100) NOT NULL,
  `type_032` varchar(100) NOT NULL,
  `gender_032` varchar(10) NOT NULL,
  `age_032` int(11) NOT NULL,
  `price_032` int(11) NOT NULL,
  `sold_032` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cats032`
--

INSERT INTO `cats032` (`id_032`, `name_032`, `type_032`, `gender_032`, `age_032`, `price_032`, `sold_032`) VALUES
(3, 'Kiti', 'Angora', 'Female', 2, 150, 1),
(4, 'Jack', 'Persia', 'Male', 4, 10, 1),
(6, 'Leo', 'Egyptian Mau', 'Male', 12, 100, 0),
(7, 'Meong', 'Persia', 'Female', 7, 100, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catsales032`
--

CREATE TABLE `catsales032` (
  `sale_id_032` int(11) NOT NULL,
  `sale_date_032` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `cat_id_032` int(11) NOT NULL,
  `customer_name_032` varchar(100) NOT NULL,
  `customer_address_032` varchar(200) NOT NULL,
  `customer_phone_032` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `catsales032`
--

INSERT INTO `catsales032` (`sale_id_032`, `sale_date_032`, `cat_id_032`, `customer_name_032`, `customer_address_032`, `customer_phone_032`) VALUES
(1, '2024-03-23 15:40:52', 3, 'Devan', 'Bandung', '022313134'),
(2, '2024-03-23 15:46:15', 4, 'Kelvin', 'Jakarta', '0123456123'),
(3, '2024-03-24 03:37:22', 7, 'Kevin', 'Bandung', '0122245223');

-- --------------------------------------------------------

--
-- Table structure for table `users032`
--

CREATE TABLE `users032` (
  `userid_032` int(11) NOT NULL,
  `username_032` varchar(100) NOT NULL,
  `password_032` varchar(225) NOT NULL,
  `usertype_032` varchar(20) NOT NULL,
  `fullname_032` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users032`
--

INSERT INTO `users032` (`userid_032`, `username_032`, `password_032`, `usertype_032`, `fullname_032`) VALUES
(3, 'nurfadila', '$2y$10$WVjcY2twS.OHn3tgH.S5Uu7D6ja0DlOkPF1v9HsT7jjYfmAin7L4.', 'Manager', 'Nurfadila'),
(4, 'nur', '$2y$10$cps2uNY7A6mMHSEgXKkKtuf15UOq2ws2F6XAVQ51YbqXStbtQs.0O', 'Cashier', 'Nur');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories032`
--
ALTER TABLE `categories032`
  ADD PRIMARY KEY (`category_id_032`);

--
-- Indexes for table `cats032`
--
ALTER TABLE `cats032`
  ADD PRIMARY KEY (`id_032`);

--
-- Indexes for table `catsales032`
--
ALTER TABLE `catsales032`
  ADD PRIMARY KEY (`sale_id_032`);

--
-- Indexes for table `users032`
--
ALTER TABLE `users032`
  ADD PRIMARY KEY (`userid_032`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories032`
--
ALTER TABLE `categories032`
  MODIFY `category_id_032` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cats032`
--
ALTER TABLE `cats032`
  MODIFY `id_032` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `catsales032`
--
ALTER TABLE `catsales032`
  MODIFY `sale_id_032` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users032`
--
ALTER TABLE `users032`
  MODIFY `userid_032` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
