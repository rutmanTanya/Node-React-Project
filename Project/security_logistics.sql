-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 28, 2025 at 06:23 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `security_logistics`
--

-- --------------------------------------------------------

--
-- Table structure for table `duty_gear_types`
--

CREATE TABLE `duty_gear_types` (
  `id` int(11) NOT NULL,
  `gear_name` enum('Glock','Tavor','Walkie-Talkie','Vest','Pepper Spray','Spare Cartridges') NOT NULL,
  `required_gear_quantity` int(11) NOT NULL DEFAULT 0,
  `actual_gear_quantity` int(11) NOT NULL DEFAULT 0,
  `cartridge_type` enum('9mm','5.56mm') DEFAULT NULL,
  `required_cartridge_quantity` int(11) NOT NULL DEFAULT 0,
  `actual_cartridge_quantity` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `facility_equipment`
--

CREATE TABLE `facility_equipment` (
  `id` int(11) NOT NULL,
  `item_name` enum('Fridge','Toaster','Kettle','Microwave','Water Cooler','Chiller','Heater') NOT NULL,
  `required_quantity` int(11) NOT NULL DEFAULT 0,
  `actual_quantity` int(11) NOT NULL DEFAULT 0,
  `equip_condition` enum('okay','broken','missing','in repair') NOT NULL DEFAULT 'okay'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gear_status`
--

CREATE TABLE `gear_status` (
  `id` int(11) NOT NULL,
  `gear_id` int(11) NOT NULL,
  `gear_condition` enum('okay','broken','missing','in repair') NOT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `id` int(11) NOT NULL,
  `role` enum('admin','ahmash','kabat','guard') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`id`, `role`) VALUES
(1, 'admin'),
(2, 'ahmash'),
(3, 'kabat'),
(4, 'guard');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` char(9) NOT NULL,
  `password` varchar(255) NOT NULL,
  `changed_password` enum('no','yes') DEFAULT 'no',
  `worker_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `changed_password`, `worker_id`) VALUES
(1, '123456789', '15061985', 'no', 1),
(2, '987654321', '22091990', 'no', 2),
(3, '192837465', '01121982', 'no', 3),
(4, '102938475', '18031995', 'no', 4),
(5, '342388477', '13071998', 'no', 5),
(6, '111222333', '05121996', 'no', 6);

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `id` int(11) NOT NULL,
  `gov_id` varchar(9) NOT NULL CHECK (`gov_id` regexp '^[0-9]{9}$'),
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `certification` enum('מאבטח בסיסי','מאבטח מתקדם') NOT NULL,
  `works_weekends` enum('yes','no') DEFAULT 'no',
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `position_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`id`, `gov_id`, `name`, `lastname`, `date_of_birth`, `certification`, `works_weekends`, `phone_number`, `email`, `position_id`) VALUES
(1, '123456789', 'David', 'Cohen', '1985-06-15', 'מאבטח מתקדם', 'yes', '054-1234567', 'david.cohen@email.com', 4),
(2, '987654321', 'Sarah', 'Levi', '1990-09-22', 'מאבטח בסיסי', 'no', '052-9876543', 'sarah.levi@email.com', 2),
(3, '192837465', 'Michael', 'Rosen', '1982-12-01', 'מאבטח מתקדם', 'yes', '050-1122334', 'michael.rosen@email.com', 3),
(4, '102938475', 'Noa', 'Friedman', '1995-03-18', 'מאבטח בסיסי', 'no', '053-4455667', 'noa.friedman@email.com', 4),
(5, '342388477', 'Tanya', 'Rotman', '1998-07-13', 'מאבטח בסיסי', 'yes', '054-2961053', 't.rutman13@gmail.com', 1),
(6, '111222333', 'Alex', 'Lapin', '1996-12-05', 'מאבטח בסיסי', 'yes', '050-5890077', 'snicky916@gmail.com', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `duty_gear_types`
--
ALTER TABLE `duty_gear_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gear_name` (`gear_name`);

--
-- Indexes for table `facility_equipment`
--
ALTER TABLE `facility_equipment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `item_name` (`item_name`);

--
-- Indexes for table `gear_status`
--
ALTER TABLE `gear_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gear_id` (`gear_id`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role` (`role`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `worker_id` (`worker_id`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gov_id` (`gov_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `position_id` (`position_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `duty_gear_types`
--
ALTER TABLE `duty_gear_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `facility_equipment`
--
ALTER TABLE `facility_equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gear_status`
--
ALTER TABLE `gear_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gear_status`
--
ALTER TABLE `gear_status`
  ADD CONSTRAINT `gear_status_ibfk_1` FOREIGN KEY (`gear_id`) REFERENCES `duty_gear_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workers`
--
ALTER TABLE `workers`
  ADD CONSTRAINT `workers_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
