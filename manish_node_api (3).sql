-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2018 at 02:52 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `manish_node_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_token`
--

CREATE TABLE `access_token` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `access_token` text NOT NULL,
  `device_type` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `access_token`
--

INSERT INTO `access_token` (`id`, `user_id`, `access_token`, `device_type`) VALUES
(0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJtb2JpbGUiOiI1NjI0MTI1Njg5IiwiaWF0IjoxNTQzMzE4NjgzLCJleHAiOjE1NDMzNDMyODN9.L345epdknL5r9fZCdoJ9Kq-k00JiHFJK_ld4vc5dno4', 'Android'),
(0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJtb2JpbGUiOiI1NjI0MTI1Njg5IiwiaWF0IjoxNTQzMzE4NzQ4LCJleHAiOjE1NDMzNDMzNDh9.g1TFexTrlmNADQpawuZISA_0pNf-lzLGAOhPC6u0yh0', 'Android'),
(0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJtb2JpbGUiOiI1NjI0MTI1Njg5IiwiaWF0IjoxNTQzMzE5Mjg5LCJleHAiOjE1NDMzNDM4ODl9.HBuOfZZycRgyOf1JVq57Mi3z5C7zdjt0eurclrmGjX8', 'Android'),
(0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJtb2JpbGUiOiI1NjI0MTI1Njg5IiwiaWF0IjoxNTQzMzI0Nzc4LCJleHAiOjE1NDMzNDkzNzh9.lAOgJzCMN5-W-Nw-8Do6w0fuO5RYdRDlXe3rvJ1AIn0', 'Android'),
(0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJtb2JpbGUiOiI1NjI0MTI1Njg5IiwiaWF0IjoxNTQzMzc4NjcyLCJleHAiOjE1NDM0MDMyNzJ9.sIMmN5LVZZL6mTsf5Z212dbX8gNY2kW853_yczO79MI', 'Android'),
(0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJtb2JpbGUiOiI1NjI0MTI1Njg5IiwiaWF0IjoxNTQzNDA1MTA0LCJleHAiOjE1NDM0Mjk3MDR9.MMT-o_mi5QoBjQUGs6bFXNlOXuyAZqtEbvGuVebqTOk', 'Android');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `published_year` varchar(255) NOT NULL,
  `publisher` varchar(500) NOT NULL,
  `updated_date` datetime NOT NULL,
  `test` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `isbn`, `title`, `author`, `description`, `published_year`, `publisher`, `updated_date`, `test`) VALUES
(1, '1', '2', '3', '4', '5', 'manis', '2018-12-04 00:00:00', '56');

-- --------------------------------------------------------

--
-- Table structure for table `coin`
--

CREATE TABLE `coin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coin`
--

INSERT INTO `coin` (`id`, `name`, `price`) VALUES
(10, 'm21', 'manisd'),
(11, 'manish sharma khattu', '51'),
(12, 'manish sharma khattu 2', '512');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `emp_code` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `full_name`, `position`, `emp_code`, `mobile`, `created`) VALUES
(9, 'Bhavik Kakadiya', 'PHP', '1001', '99999999999', '2018-12-27 09:47:47'),
(11, 'Manish sharma', 'PHP', '382026', '09726038997', '2018-12-27 09:47:56'),
(12, 'Praveen Kalbi', 'Cake PHP', '1003', '8547125632', '2018-12-27 09:48:17');

-- --------------------------------------------------------

--
-- Table structure for table `manish`
--

CREATE TABLE `manish` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `manish`
--

INSERT INTO `manish` (`id`, `name`) VALUES
(102, 'name2'),
(103, 'name3'),
(104, 'name4'),
(105, 'name4'),
(106, 'name4'),
(2147483647, 'name1');

-- --------------------------------------------------------

--
-- Table structure for table `taxi_info`
--

CREATE TABLE `taxi_info` (
  `id` int(11) NOT NULL,
  `taxi_name` varchar(255) NOT NULL,
  `taxi_number` varchar(255) NOT NULL,
  `taxi_model` varchar(255) NOT NULL,
  `taxi_type` varchar(255) NOT NULL,
  `taxi_owner_type` varchar(255) NOT NULL,
  `taxi_owner_id` int(11) NOT NULL,
  `taxi_description` varchar(255) NOT NULL,
  `seat_info` varchar(255) NOT NULL,
  `status` int(2) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `device_id` varchar(255) NOT NULL,
  `device_type` varchar(255) NOT NULL,
  `user_image` varchar(255) NOT NULL,
  `status` int(2) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `user_type`, `email`, `password`, `mobile`, `gender`, `device_id`, `device_type`, `user_image`, `status`, `created`, `modified`) VALUES
(2, 'admin1', '2', 'dad333@hfadads.com', '202cb962ac59075b964b07152d234b70', '5624125689', '', '123', 'android', '', 1, '2018-11-30 00:00:00', '2018-11-30 08:00:00'),
(3, 'admin2', '2', 'dad333@hfadads.com', '202cb962ac59075b964b07152d234b70', '9726038992', '', '1234', 'android', '', 1, '2018-11-30 00:00:00', '2018-11-30 08:00:00'),
(4, 'admin3', '2', 'dad333@hfadads.com', '202cb962ac59075b964b07152d234b70', '9726038992', '', '1235', 'android', '', 1, '2018-11-30 00:00:00', '2018-11-30 08:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coin`
--
ALTER TABLE `coin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manish`
--
ALTER TABLE `manish`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taxi_info`
--
ALTER TABLE `taxi_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `coin`
--
ALTER TABLE `coin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `manish`
--
ALTER TABLE `manish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483647;
--
-- AUTO_INCREMENT for table `taxi_info`
--
ALTER TABLE `taxi_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
