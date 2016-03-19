/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : plutonote

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2016-02-14 16:26:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for notebook
-- ----------------------------
DROP TABLE IF EXISTS `notebook`;
CREATE TABLE `notebook` (
  `notebookId` bigint(255) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '笔记本ID',
  `userId` int(4) NOT NULL COMMENT '所属用户ID(外键)',
  PRIMARY KEY (`notebookId`),
  KEY `userId` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for notes
-- ----------------------------
DROP TABLE IF EXISTS `notes`;
CREATE TABLE `notes` (
  `notebookId` bigint(255) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '所属笔记本ID(外键)',
  `groupName` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '所属分组名',
  `content` varchar(10000) COLLATE utf8_unicode_ci NOT NULL COMMENT '对应笔记的URL',
  `star` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT '星标',
  `noteId` int(255) unsigned zerofill NOT NULL COMMENT '单篇笔记的ID',
  PRIMARY KEY (`noteId`),
  KEY `notebookId` (`notebookId`),
  CONSTRAINT `notebookId` FOREIGN KEY (`notebookId`) REFERENCES `notebook` (`notebookId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for pictures
-- ----------------------------
DROP TABLE IF EXISTS `pictures`;
CREATE TABLE `pictures` (
  `pictureMD5` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '图片的MD5',
  `noteId` int(255) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '图片所属单篇笔记ID',
  `content` varchar(10000) COLLATE utf8_unicode_ci NOT NULL COMMENT '内容(url)',
  PRIMARY KEY (`pictureMD5`),
  KEY `noteId` (`noteId`),
  CONSTRAINT `noteId` FOREIGN KEY (`noteId`) REFERENCES `notes` (`noteId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(4) NOT NULL COMMENT '用户ID',
  `userName` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `passWord` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
