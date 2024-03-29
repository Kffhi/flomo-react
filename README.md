# Flomo

大约1:1复刻的[Flomo](https://flomoapp.com/) 网页（旧）版的单纯练习玩具，**主要复刻编辑器**，别的功能看情况实现，**禁止任何商业用途**，如果对产品本身有兴趣请访问[Flomo官网](https://flomoapp.com/) 了解更多信息



## 快速开始

本项目为前端代码地址，服务端请访问[flomo-server](https://github.com/Kffhi/flomo-server) 查看，后文统一用前端&后端对应称呼这两个项目，后端项目不单独编写文档

### 线上试用

[线上地址](https://www.kffhi.com/flomo/)不保证任何信息安全及校验，且数据会被定期清除，仅做体验试用

### 本地部署

#### 前端项目（flomo-react）

```shell
git clone git@github.com:Kffhi/flomo-react.git
cd flomo-react
npm install
npm run dev
```

#### 后端项目（flomo-server）

```shell l
git clone git@github.com:Kffhi/flomo-server.git
cd flomo-server
npm install
npm run start
```



## 功能说明

### 编辑器

顶部编辑器编辑内容后点击完成新增为一条新的memo

memo列表无限滚动，默认只读

双击memo进入编辑状态，点击完成更新memo内容

#### 基础的富文本编辑功能

* 基础文本
* 加粗
* 斜体
* 下划线
* 有序列表
* 无序列表
* 多级列表

#### 标签支持

详见下文"标签"部分，呈蓝色高亮显示

#### 撤消/恢复

通过键盘快捷键操作

#### 图片支持

支持png、jpg/jpeg格式图片，单个文件大小不超过5MB

#### 快捷键支持

* 基础格式：Ctrl+B/I/U
* 无序列表：*+空格
* 有序列表：数字+空格
* 多级列表：光标置于**非同级内的第一个**列表项开头，按下Tab
* 撤销：Ctrl+Z
* 恢复：Ctrl+Shift+Z

### 标签

标签的格式为：`#标签  `，标签与后续内容之间需要添加一个空格

所有的标签都会展示在左侧的标签树

点击标签树会筛选出当前标签下所有的memo

#### 新建标签

在编辑器中按下输入框下方工具条的“#”或者直接输入“#”字符，输入完成后点击发送会自动根据输入内容中的标签创建标签（或者将内容收录至已有的标签下）

标签支持嵌套，建议至多4级标签，多级标签的格式为：`#父级/二级/三级`，不同层级之间使用英文符号`/`隔开

标签文本内容长度不做特殊限制但是建议不要过长

#### 标签编辑

~~标签创建完成后支持修改图标~~

不支持删除标签

~~允许重命名标签，重命名后对应的内容中的标签文本都会被对应重命名~~

#### 标签排序

新增加的标签默认放在最后

选择置顶会将标签置于当前层级的最前

不支持拖动排序

### 热力图

展示12周内的提交数据

只记录提交数据，删除、编辑memo不会进行记录

点击可查看当天的全部提交

### 搜索

支持关键字搜索

### 随机漫步

单纯的随机抛出一条memo

## feature list

- [x] 基础布局、样式及交互
- [x] 基础富文本编辑功能
- [x] 图片支持
- [x] 键盘快捷键支持
- [x] 标签输入联想
- [x] Memos管理，增删改
- [x] 热力图数据展示
- [ ] ~~标签图标修改~~
- [ ] ~~标签重命名~~
- [x] 多级标签
- [x] 搜索
- [x] 多级列表
- [x] 撤销恢复
- [x] 基本功能可用
- [x] 体验版部署
***
- [ ] 体验优化
- [ ] 高级查询
- [ ] 标签等扩展功能slate插件化
- [ ] ~~H5适配~~
- [ ] 单元测试
- [ ] CI/CD
- [ ] ...



## 部分技术方案实现

### 编辑器

### 标签

### 富文本格式

### 数据存储

### 热力图

## 接口文档

## 单元测试

## 相关项目

基础语言/脚手架   **React+TS+Vite**

组件库   **Ant Design**：https://github.com/ant-design/ant-design/

热力图启发   **heatmap**：https://github.com/ccccai/heat-map

富文本   **Slate**：https://github.com/slatedocs/slate

编辑器开发参考   **wangEditor**：https://github.com/wangeditor-team/wangEditor

## other
富文本写着逐渐无聊了起来，后面可能会去做一个类似VitePress的之类的玩意给自己建站用（~~毕竟语雀换Obsidian了~~），本项目我在Sentry看不见报错也没有issue的话大概率是不会再更新了，pr welcome~

