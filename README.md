# 安装

```bash
npm init tm-web@latest
```

# 👋 vue3-nuxt3-templates

- 项目目的：减少重复性的工作
- 开发前建议通读本文
- Vue3 + Nuxt3 + Ant Design Vue

## 模板优势

> - 项目结构采用最简单的配置，可拓展性超好
> - 可打包完全静态页面
> - 可打包成服务器渲染
> - 自动生成路由
> - 自动导入组件
> - 自动导入组合式 API
> - tree-shaking 优化 js 模块
> - 自动代码拆分
> - 打包自动生成 TypeScript 类型

## 开发指南

**基础命令**

```bash
# 下载依赖
yarn install

# 开发预览
yarn dev

# 开发预览-提供 mock 数据，可自行二次开
yarn mock

# 打包-单页面应用
yarn build

# 打包-纯静态应用
yarn generate

# 打包结果预览
yarn preview

```

**基础规范**

- 文件名、文件夹名、css 名，**kebab-case**
- js 变量名、方法名，**驼峰**
- html 标签属性顺序： id > class > ref = value = 属性 > 事件
- 建议详细阅读 [泰盟前端开发规范](http://172.16.0.20/tm_java/tm_web/web-project-standard/-/tree/master/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83)

**layouts 布局目录**

- 布局是页面的包装器，包含多个页面的通用用户界面
- 默认使用 layouts 目录下 default.vue 布局
- 可新增自定义布局，在 layouts 目录下新增 custom.vue 文件
- 用法，使用该布局的 .vue 文件内增加
- 使用自定义布局

```javascript
definePageMeta({
	layout: 'layoutName',
})
```

- 不使用布局配置

```javascript
definePageMeta({
	layout: false,
})
```

**components 组件目录**

- nuxt 会自动导入组件，并进行树摇优化

**pages 路由目录**

- nuxt 会自动根据 `pages/` 下的每个文件生成对应的路由

**assets 资产目录**

- 该目录的资源会进入编译流程，需要优化的资源如 img 文件的压缩

```html
<img src="~/assets/img/nuxt.png" alt="Discover Nuxt 3" />
```

**public 静载资产目录**

- url 上公开访问的资产

```html
<img src="/img/nuxt.png" alt="Discover Nuxt 3" />
```

**路由**

- html 用法，[文档](https://nuxt.com/docs/api/components/nuxt-link)

```html
<nuxt-link to="/about">About</nuxt-link>
```

- js 用法，[文档](https://nuxt.com/docs/api/composables/use-route)

```javascript
const router = useRouter()
router.back()
router.forward()
router.go()
router.push({ path: '/home' })
router.replace({ hash: '#bio' })
```

- 获取路由参数，[文档](https://nuxt.com/docs/api/composables/use-route)

```javascript
const route = useRoute()
console.log(route.params)
```

**仅在客户端渲染的内容**

- 使用 client-only 标签包裹内容

```html
<client-only>div...</client-only>
```

## 项目资源

- [Nuxt 3 官网](https://nuxt.com/)
- [官方目录结构文档资料](https://nuxt.com/docs/guide/directory-structure/nuxt)
- [模块列表](https://nuxt.com/modules) nuxt3 专用模块查询
- [Ant Design of Vue](https://antdv.com/docs/vue/introduce-cn) Vue3 组件库
- [pinia](https://pinia.vuejs.org/zh/) 状态管理库
- [VueUse](https://vueuse.org/) 提高 vue 开发效率
- [nuxtjs/color-mode](https://color-mode.nuxtjs.org/) 自动检测系统深浅色模式
- [axios-http](https://axios-http.com/zh/docs/intro) promise 网络请求库
- [mock.js](http://mockjs.com/) 生成随机数据，拦截 Ajax 请求

## vscode 插件

- 控制代码质量，[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- 控制代码风格统一，[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- > 保存代码自动格式化，打开<首选项>-<设置>-<在搜索栏输入 save，选择 Editor: Format On Save，选中>完成保持自动格式化设置

## Git 提交规范参考

- `upd` 更新功能
- `wip` 开发中
- `feat` 新增功能
- `fix` 修复 bug
- `perf` 性能优化
- `types` 类型修改
- `docs` 文档或注释变更
- `style` 代码格式（不影响功能，例如空格、分号等格式修正）
- `refactor` 代码重构（不包括 bug 修复、功能新增）
- `build` 构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）
- `chore` 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
- `revert` 撤销 commit，回滚版本
- `test` 添加、修改测试用例
- `ci` 修改 CI 配置、脚本
- `workflow` 工作流改进
- `release` 版本发布
- `mod` 不确定分类的修改

## 目录结构

```
├─ assets                                              // 资源目录
│  ├─ js
│  ├─ json
│  │  └─ menu.json                                     // 菜单默认文件，无具体意义
│  └─ scss
│     └─ base.scss                                     // 项目全局样式或变量参考
├─ components                                          // 组件目录-默认自动导入
├─ fetch                                               // 接口文档存放目录
├─ layouts                                             // 布局目录
│  └─ default.vue                                      // 默认布局文件（详情见开发指南）
├─ pages                                               // 路由目录-默认自动生成
├─ plugins                                             // 插件目录-默认自动导入
│  ├─ ant-design-vue.js                                // antdv 组件库
│  └─ mock.js                                          // mock.js 拦截 Ajax 请求，返回模拟数据
├─ public                                              // 公共文件目录，不参与编译优化
├─ stores                                              // 状态管理目录
├─ nuxt.config.ts                                       // nuxt 配置文件
├─ package.json                                        // 配置应用程序和模块
├─ .editorconfig                                        // eslint 配置文件
├─ .eslintrc.js                                        // eslint 配置文件
├─ .gitignore                                          // git 忽略内容配置文件
├─ .husky                                              // git hooks
├─ .prettierignore                                     // prettier 配置忽略文件
├─ .prettierrc.js                                      // prettier 配置
├─ README.md                                           // 项目介绍
├─ tsconfig.json                                        // ts 配置文件
└─ yarn.lock                                           // 项目依赖缓存
```
