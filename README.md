# Flomo

大约1:1复刻的[Flomo](https://flomoapp.com/) 网页版的单纯练习项目，**禁止任何商业用途**，如果对产品本身有兴趣请访问[Flomo官网](https://flomoapp.com/) 了解更多信息



## 快速开始

本项目为前端代码地址，服务端请访问[flomo-server](https://github.com/Kffhi/flomo-server) 查看，后文统一用前端&后端对应称呼这两个项目，后端项目不单独编写文档

### 线上试用

[线上地址]()不保证任何信息安全及校验，且数据会被定期清除，仅做体验试用

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
npm run start
```



## 功能说明

### 编辑器

### 标签

标签的格式为：`#标签 `，标签与后续内容之间需要添加一个空格

#### 新建标签

在编辑器中按下输入框下方工具条的“#”或者直接输入“#”字符，输入完成后点击发送会自动根据输入内容中的标签创建标签（或者将内容收录至已有的标签下）

标签支持嵌套，建议至多4级标签，多级标签的格式为：`#父级/二级/三级`，不同层级之间使用英文符号`/`隔开

标签文本内容长度不做特殊限制但是建议不要过长

#### 标签编辑

标签创建完成后支持添加图标

不支持删除标签

允许重命名标签，重命名后对应的内容中的标签文本都会被对应重命名

#### 标签排序

新增加的标签默认放在最后

选择置顶会将标签置于当前层级的最前

不支持拖动排序



### 热力图

### feature list

- [ ] 基础布局、样式及交互
- [ ] 基础富文本编辑功能
- [ ] 键盘快捷键支持
- [ ] 标签输入联想
- [ ] Memos管理
- [ ] 热力图数据展示
- [ ] 增删标签
- [ ] 标签图标
- [ ] 标签重命名
- [ ] 多级标签
- [ ] H5适配
- [ ] 单元测试
- [ ] 打包及部署
- [ ] ...



## 部分技术方案实现

### 编辑器

### 标签

#### 数据结构

标签存在于后端服务的`/src/database/tags.json`文件中

```json
[
    {
        "id": "ac33e15b-f27b-4edc-b06b-9bb2dbdb3929",
        "pid": "08412dca-d4c0-4301-894b-217817bc8d1d",
        "value": "标签名称",
        "sortId": "2020",
        "icon": "💨",
        "children": [
            {
                "id": "cc16785d-2b12-4c7d-abab-1b94f01fc9de",
                "pid": "ac33e15b-f27b-4edc-b06b-9bb2dbdb3929",
                "value": "子级标签",
                "sortId": "2020",
                "icon": "👻",
                "children": []
            }
        ]
    }
]

```



### 富文本格式

### 数据存储

### 热力图



## 接口文档

### 新增Momo

### 编辑Momo

### 删除Momo

### 新增标签

### 重命名标签

### 标签置顶

### 标签增加图标

## 单元测试

## 相关项目

基础语言/脚手架   **React+TS+Vite**

组件库   **Ant Design**：https://github.com/ant-design/ant-design/

热力图启发   **heatmap**：https://github.com/ccccai/heat-map

富文本   **Slate**：https://github.com/slatedocs/slate

