-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2012 年 08 月 20 日 02:07
-- 服务器版本: 5.5.24-log
-- PHP 版本: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `tuiguang`
--
CREATE DATABASE `tuiguang` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `tuiguang`;

-- --------------------------------------------------------

--
-- 表的结构 `tg_cates`
--

CREATE TABLE IF NOT EXISTS `tg_cates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(255) NOT NULL,
  `stuff_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tg_keywords`
--

CREATE TABLE IF NOT EXISTS `tg_keywords` (
  `top_ranks` varchar(255) NOT NULL,
  `right_ranks` varchar(255) NOT NULL,
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) NOT NULL,
  `cate_id` int(11) NOT NULL,
  `mark` tinyint(1) NOT NULL,
  `stuff_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tg_sites`
--

CREATE TABLE IF NOT EXISTS `tg_sites` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `site_name` varchar(255) NOT NULL,
  `site_url` varchar(255) NOT NULL,
  `stuff_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tg_stuffs`
--

CREATE TABLE IF NOT EXISTS `tg_stuffs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `stuff_index` varchar(255) NOT NULL,
  `stuff_name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `notion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tg_users`
--

CREATE TABLE IF NOT EXISTS `tg_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `stuff_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `tg_users`
--

INSERT INTO `tg_users` (`id`, `username`, `password`, `status`, `stuff_id`) VALUES
(7, 'root', '650066b3a5133c7cf231f26f69b92ed0644efd35', 1, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
