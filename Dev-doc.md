##用户表
- 用户ID userId int 4(主键,自增)
- 用户名 userName varchar 10
- 密码 passWord varchar 12
---

##笔记本表
- 笔记本ID notebookId int 5(主键,自增)
- 笔记本名称 notebookName varchar 10
- 所属用户ID(外键)
---

##分组
- 分组ID groupId int 5(主键,自增)
- 分组名 groupName varchar 10
- 所属笔记本ID(外键)
---

##单篇笔记表
- 单篇笔记ID noteId int 10(主键,自增)
- 内容 content longtext
- 星标标记 star bit 1
- 所属分组ID (外键)

#todo
1. 前端demo
    - login 登录页面
    - admin 后端管理页面(spa)
    - index 前台用户页面(spa)
2. 用户登录,用户和管理员的登录做在一起
3. 完成单篇笔记文本的增删改查
4. 完成单篇笔记中多处图片的增删改查
5. 增加对markdown格式的支持,与html显示的普通文本模式不能混用
6. 可以储存多篇笔记
7. 完成笔记分组功能

# 编码规范
1. Vue组件在引用命名时首字母大写
2. 控制语句结束的花括号前留一空行