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

##单篇笔记表
- 单篇笔记ID noteId int 10(主键,自增)
- 内容 content longtext
- 星标标记 star bit 1
- 所属笔记本ID(外键)

#todo
- 前端demo
    - ~~login 登录页面
    - admin 后端管理页面(spa)
    - ~~index 前台用户页面(spa)
- ~~用户登录,用户和管理员的登录做在一起
- ~~完成单篇笔记文本的增删改查
- ~~可以储存多篇笔记
- 支持上传图片
- 为笔记增加tags
- 增加对markdown格式的支持

# 目前在express中使用的session值
- req.session.userId 当前用户ID
- req.session.userName 当前用户Name
- req.session.notebookId 当前打开的笔记本ID