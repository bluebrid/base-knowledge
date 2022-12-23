# Module Federation

## How to use

使用以下步骤运行，由于 vite 是按需编译，所以 app2 必须先打包启动，无法 2 个 App 同时是开发模式

```bash
cd app2
yarn build
yarn preview
```

new Terminal

```bash
cd app1
yarn dev
```

Both `app1` and `app2` are independently deployed apps:

- `app1`: http://localhost:3001
- `app2`: http://localhost:3002

## [Vite 也可以模块联邦](https://mp.weixin.qq.com/s/orOEcRFTCaAbMO36jl8g6A)
> Module Federation: 模块联邦
> 多个独立的构建可以形成一个应用程序，这些独立的构建不会相互依赖，因此可以单独开发和部署他们，通常称为微前端。
## 存在的问题
1. CSS 样式污染问题，建议避免在 component 中使用全局样式。
2. 模块联邦并未提供沙箱能力，可能会导致 JS 变量污染
3. 在 vite 中， React 项目还无法将 webpack 打包的模块公用模块