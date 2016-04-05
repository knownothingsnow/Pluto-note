/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50626
Source Host           : 127.0.0.1:3306
Source Database       : plutonote

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2016-04-05 15:01:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `noteId` int(10) NOT NULL AUTO_INCREMENT COMMENT '笔记ID',
  `notebookId` int(5) NOT NULL COMMENT '所属笔记本ID',
  `header` varchar(20) NOT NULL COMMENT '笔记标题',
  PRIMARY KEY (`noteId`),
  KEY `notebookId` (`notebookId`),
  CONSTRAINT `notebookId` FOREIGN KEY (`notebookId`) REFERENCES `notebook` (`notebookId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of note
-- ----------------------------
INSERT INTO `note` VALUES ('9', '1', '1');
INSERT INTO `note` VALUES ('10', '1', '2');
INSERT INTO `note` VALUES ('11', '1', '3');
INSERT INTO `note` VALUES ('16', '88', '新建文稿');

-- ----------------------------
-- Table structure for notebook
-- ----------------------------
DROP TABLE IF EXISTS `notebook`;
CREATE TABLE `notebook` (
  `notebookId` int(5) NOT NULL AUTO_INCREMENT COMMENT '笔记本ID',
  `userId` int(4) NOT NULL COMMENT '所属用户ID',
  `notebookName` varchar(10) CHARACTER SET utf8 NOT NULL COMMENT '笔记本名称',
  PRIMARY KEY (`notebookId`),
  KEY `userId` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of notebook
-- ----------------------------
INSERT INTO `notebook` VALUES ('1', '5', '1');
INSERT INTO `notebook` VALUES ('10', '5', '2');
INSERT INTO `notebook` VALUES ('54', '5', '33');
INSERT INTO `notebook` VALUES ('55', '5', '11');
INSERT INTO `notebook` VALUES ('56', '5', 'jkl');
INSERT INTO `notebook` VALUES ('57', '5', 'qweqweqwe');
INSERT INTO `notebook` VALUES ('58', '5', 'asd');
INSERT INTO `notebook` VALUES ('59', '5', 'qwe');
INSERT INTO `notebook` VALUES ('88', '7', '新建笔记本');

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `recordId` int(10) NOT NULL AUTO_INCREMENT COMMENT '笔记记录ID',
  `noteId` int(10) NOT NULL COMMENT '所属笔记ID',
  `content` longtext COMMENT '内容',
  `saveTime` int(13) NOT NULL COMMENT '保存时间',
  `type` bit(1) NOT NULL COMMENT '文本类型,是markdown为true',
  PRIMARY KEY (`recordId`),
  KEY `noteId` (`noteId`) USING BTREE,
  CONSTRAINT `noteId` FOREIGN KEY (`noteId`) REFERENCES `note` (`noteId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record
-- ----------------------------

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
