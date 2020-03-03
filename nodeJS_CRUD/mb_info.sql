-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `test`
--

-- --------------------------------------------------------

--
-- 資料表結構 `mb_info`
--

CREATE TABLE `mb_info` (
  `mbId` int(10) NOT NULL,
  `mbPassword` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mbName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mbNick` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '未知名旅人',
  `mbCountry` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mbEmail` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mbPh` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mbInvoice` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mbGender` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mbBd` date DEFAULT NULL,
  `mbDes` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '沒想到如何對自己描述的',
  `mbOnline` int(1) DEFAULT 0,
  `mbCreated_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '生成時間',
  `mbUpdated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `mb_info`
--

INSERT INTO `mb_info` (`mbId`, `mbPassword`, `mbName`, `mbNick`, `mbCountry`, `mbEmail`, `mbPh`, `mbInvoice`, `mbGender`, `mbBd`, `mbDes`, `mbOnline`, `mbCreated_at`, `mbUpdated_at`) VALUES
(2, 'test', '謝怡伶', '千姿百態的藍牙弟控', 'Taiwan', 'BanditLipsx@gmail.com', '0938202580', '0ZCI0GN', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:38:52', '2020-02-21 18:48:54'),
(3, 'test', '謝怡伶', '千姿百態的藍牙弟控', 'Taiwan', 'BBBBB@gmail.com', '0938202580', '0ZCI0GN', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:44:33', '2020-02-21 18:49:00'),
(4, 'test', '林小雨', '千姿百態的藍牙弟控', 'Taiwan', 'CCCCC@gmail.com', '0938202583', '0ZCI0GT', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:47:35', '2020-02-24 22:51:35'),
(5, 'test', '小朋友1', '千姿百態的藍牙弟控', 'Taiwan', 'DDDDD@gmail.com', '0938202580', '0ZCI0GN', 'Male', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:47:35', '2020-02-23 23:59:57'),
(6, 'test', '小朋友2', '千姿百態的藍牙弟控', 'Taiwan', 'EEEEE @gmail.com', '0938202580', '0ZCI0GN', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:47:35', '2020-02-21 18:34:54'),
(7, 'test', '小朋友3', '千姿百態的藍牙弟控', 'Taiwan', 'FFFFF@gmail.com', '0938202580', '0ZCI0GN', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:47:35', '2020-02-22 00:30:38'),
(8, 'test', '小朋友4', '千姿百態的藍牙弟控', 'Taiwan', 'GGGGG @gmail.com', '0938202580', '0ZCI0GN', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:47:35', '2020-02-21 18:35:13'),
(9, 'test', '小朋友5', '千姿百態的藍牙弟控', 'Taiwan', 'HHHHH @gmail.com', '0938202580', '0ZCI0GN', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:47:35', '2020-02-21 18:35:22'),
(10, 'test', '小朋友6', '千姿百態的藍牙弟控', 'Taiwan', 'JJJJJ @gmail.com', '0938202580', '0ZCI0GN', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:47:35', '2020-02-21 18:35:31'),
(11, 'test', '小朋友7', '千姿百態的藍牙弟控', 'Taiwan', 'KKKKK @gmail.com', '0938202580', '0ZCI0GN', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:47:35', '2020-02-21 18:35:41'),
(12, 'test', '小朋友8', '千姿百態的藍牙弟控', 'Taiwan', 'LLLLL @gmail.com', '0938202580', '0ZCI0GN', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:47:35', '2020-02-21 18:35:49'),
(13, 'test', '小朋友9', '千姿百態的藍牙弟控', 'Taiwan', 'CXSDDSD @gmail.com', '0938202580', '0ZCI0GN', 'Female', '1924-03-30', '天才只意味著終身不懈地努力。', 0, '2020-02-19 19:47:36', '2020-02-21 18:35:58'),
(14, 'test', '', '', '', 'jack@gmail.com', '', '', '', '0000-00-00', '', 0, '2020-02-22 09:48:10', '0000-00-00 00:00:00'),
(15, 'test', '', '', '', 'jenny@gmail.com', '', '', '', '0000-00-00', '', 0, '2020-02-22 10:21:38', '0000-00-00 00:00:00'),
(18, 'test', '', '未知名旅人', '', 'AAAAA@gmail.com', '', '', '', '0000-00-00', '沒想到如何對自己描述的', 0, '2020-02-24 18:02:30', '2020-02-24 18:02:30'),
(19, 'test', '', '未知名旅人', '', 'hakok@gmail.com', '', '', '', NULL, '沒想到如何對自己描述的', 0, '2020-02-24 18:03:22', '2020-02-24 18:03:22'),
(21, 'test', '', '未知名旅人', '', 'kskoaksoaksoa@gmail.com', '', '', '', NULL, '沒想到如何對自己描述的', 0, '2020-02-24 19:26:56', '2020-02-24 19:26:56'),
(23, 'test', NULL, '未知名旅人', NULL, 'asasasas@gmail.com', NULL, NULL, NULL, NULL, '沒想到如何對自己描述的', 0, '2020-02-24 20:33:52', '2020-02-24 20:33:52'),
(24, 'test', NULL, '未知名旅人', NULL, 'assas@gmail.com', NULL, NULL, NULL, NULL, '沒想到如何對自己描述的', 0, '2020-02-24 20:35:45', '2020-02-24 20:35:45'),
(31, 'test', NULL, '未知名旅人', NULL, 'Bandipsx@gmail.com', NULL, NULL, NULL, NULL, '沒想到如何對自己描述的', 0, '2020-02-24 21:33:10', '2020-02-24 21:33:10'),
(32, 'test', NULL, '未知名旅人', NULL, 'Bansx@gmail.com', NULL, NULL, NULL, NULL, '沒想到如何對自己描述的', 0, '2020-02-24 21:37:13', '2020-02-24 21:37:13'),
(33, 'test', NULL, '未知名旅人', NULL, 'Basasasasa@gmail.com', NULL, NULL, NULL, NULL, '沒想到如何對自己描述的', 0, '2020-02-24 21:42:16', '2020-02-24 21:42:16'),
(34, 'test', NULL, '未知名旅人', NULL, 'Bsa@gmail.com', NULL, NULL, NULL, NULL, '沒想到如何對自己描述的', 0, '2020-02-24 21:42:32', '2020-02-24 21:42:32'),
(35, 'kokkoks', NULL, '未知名旅人', NULL, 'fasn@gmail.com', NULL, NULL, NULL, NULL, '沒想到如何對自己描述的', 0, '2020-02-24 21:53:59', '2020-02-24 21:53:59'),
(36, 'test', NULL, '未知名旅人', NULL, 'psx@gmail.com', NULL, NULL, NULL, NULL, '沒想到如何對自己描述的', 0, '2020-02-24 21:56:01', '2020-02-24 21:56:01'),
(43, 'test', NULL, '未知名旅人', NULL, 'asasas@asasassa.jijjji', NULL, NULL, NULL, NULL, '沒想到如何對自己描述的', 0, '2020-02-24 23:24:24', '2020-02-24 23:24:24'),
(45, 'test', NULL, '未知名旅人', NULL, 'Bjjkjkpsx@gmail.com', NULL, NULL, NULL, NULL, '沒想到如何對自己描述的', 0, '2020-02-25 00:33:47', '2020-02-25 00:33:47');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `mb_info`
--
ALTER TABLE `mb_info`
  ADD PRIMARY KEY (`mbId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `mb_info`
--
ALTER TABLE `mb_info`
  MODIFY `mbId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
