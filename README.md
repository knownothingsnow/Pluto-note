# Pluto-note
我的大学毕业设计.
基于AmameUI,jQuery,Handlebar,Express,Mysql实现.另外使用了wangeditor作为富文本编辑器.

> git clone  https://github.com/knownothingsnow/Pluto-note.git  
> cd Pluto-Note  
> npm i  
> npm run build  
> 安装mysql,创建数据库"plutonote",导入plutonote.sql  
> 根据当前情况修改./server/modules/connectDB.js中数据库的配置  
> npm start  
> 访问localhost:3000

#数据库设计
##用户表
- 用户ID userId int 4(主键,自增)
- 用户名 userName varchar 10  
- 密码 passWord varchar 12

##笔记本表
- 笔记本ID notebookId int 5(主键,自增)
- 笔记本名称 notebookName varchar 10
- 所属用户ID(外键)

##单篇笔记表
- 单篇笔记ID noteId int 10(主键,自增)
- 内容 content longtext
- 星标标记 star bit 1
- 所属笔记本ID(外键)

#todo
- 前端demo
    - ~~login 登录页面~~
    - ~~index 前台用户页面(spa)~~
    - admin 后端管理页面(spa)
- ~~用户登录,用户和管理员的登录做在一起~~
- ~~完成单篇笔记文本的增删改查~~
- ~~可以储存多篇笔记~~
- ~~可以自动保存笔记~~
- ~~笔记本相关功能~~
- ~~支持切换到移动版编辑器~~
- ~~能够保存历史版本~~

- 增加对markdown格式的支持
- 支持上传图片
- 使用localstorge进行本地存储


# 目前在express中使用的session值
- req.session.userId 当前用户ID
- req.session.userName 当前用户Name
- req.session.recordId 当前历史记录ID
- req.session.noteId 当前打开的文稿ID
- req.session.notebookId 当前打开的笔记本ID