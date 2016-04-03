/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50626
Source Host           : 127.0.0.1:3306
Source Database       : plutonote

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2016-04-03 02:28:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `itemId` int(10) NOT NULL AUTO_INCREMENT COMMENT '笔记内容ID',
  `content` longtext COMMENT '内容',
  `saveTime` varchar(13) NOT NULL COMMENT '保存时间',
  `noteId` int(10) NOT NULL COMMENT '所属笔记ID',
  PRIMARY KEY (`itemId`),
  KEY `noteId` (`noteId`) USING BTREE,
  CONSTRAINT `noteId` FOREIGN KEY (`noteId`) REFERENCES `note` (`noteId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item
-- ----------------------------

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `noteId` int(10) NOT NULL AUTO_INCREMENT COMMENT '笔记ID',
  `header` varchar(20) NOT NULL COMMENT '笔记标题',
  `isMarkdown` bit(1) NOT NULL COMMENT '文本类型,是markdown为true',
  `notebookId` int(5) NOT NULL COMMENT '所属笔记本ID',
  PRIMARY KEY (`noteId`),
  KEY `notebookId` (`notebookId`),
  CONSTRAINT `notebookId` FOREIGN KEY (`notebookId`) REFERENCES `notebook` (`notebookId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of note
-- ----------------------------
INSERT INTO `note` VALUES ('9', '1', '\0', '1');
INSERT INTO `note` VALUES ('10', '2', '\0', '1');
INSERT INTO `note` VALUES ('11', '3', '\0', '1');
INSERT INTO `note` VALUES ('12', '4', '\0', '1');
INSERT INTO `note` VALUES ('13', 'adasdasdasdasd', '\0', '1');
INSERT INTO `note` VALUES ('14', '1', '\0', '1');

-- ----------------------------
-- Table structure for notebook
-- ----------------------------
DROP TABLE IF EXISTS `notebook`;
CREATE TABLE `notebook` (
  `notebookId` int(5) NOT NULL AUTO_INCREMENT COMMENT '笔记本ID',
  `notebookName` varchar(10) CHARACTER SET utf8 NOT NULL COMMENT '笔记本名称',
  `userId` int(4) NOT NULL COMMENT '所属用户ID',
  PRIMARY KEY (`notebookId`),
  KEY `userId` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of notebook
-- ----------------------------
INSERT INTO `notebook` VALUES ('1', '1', '5');
INSERT INTO `notebook` VALUES ('10', '2', '5');
INSERT INTO `notebook` VALUES ('54', '33', '5');
INSERT INTO `notebook` VALUES ('55', '11', '5');
INSERT INTO `notebook` VALUES ('56', 'jkl', '5');
INSERT INTO `notebook` VALUES ('57', 'qweqweqwe', '5');
INSERT INTO `notebook` VALUES ('58', 'asd', '5');
INSERT INTO `notebook` VALUES ('59', 'qwe', '5');
INSERT INTO `notebook` VALUES ('60', 'asdq', '5');
INSERT INTO `notebook` VALUES ('61', 'asdwww', '5');
INSERT INTO `notebook` VALUES ('62', 'plpkpk', '5');
INSERT INTO `notebook` VALUES ('63', '2e', '5');
INSERT INTO `notebook` VALUES ('64', 'dw', '5');
INSERT INTO `notebook` VALUES ('65', 'bg', '5');
INSERT INTO `notebook` VALUES ('66', 'ww', '5');
INSERT INTO `notebook` VALUES ('67', 'wweeee', '5');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(4) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `userName` varchar(10) CHARACTER SET utf8 NOT NULL COMMENT '用户名',
  `passWord` varchar(12) CHARACTER SET utf8 NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('5', '1', '1');
INSERT INTO `user` VALUES ('7', '2', '2');
