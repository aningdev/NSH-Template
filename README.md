# NSH-Template

Native Shell（NSH）的 TSX 应用起点：一个计数器，加上这套应用自己的主题和样式组件。运行时是 NSH，不是浏览器 DOM，也不是 Node。

设计决定写在 [docs/DESIGN.md](docs/DESIGN.md)，代码怎么分层写在 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。

## 准备

- [Bun](https://bun.sh)
- [`nsh`](https://nsh.dev/docs/installation.md)（`curl -fsSL https://nsh.dev/install.sh | sh`，命令在 `~/.local/bin`）

```sh
bun install
bun run check
bun run test
bun run dev
```

`bun run dev` 用本机的桌面后端。手机、Web 和其他桌面目标见 `apps/client/package.json` 里的 `dev:*`。产品要支持哪些平台，以 [docs/DESIGN.md](docs/DESIGN.md) 为准。

## 可选：引擎源码

`references/nsh` 是 [longbridge/nsh](https://github.com/longbridge/nsh) 的子模块，只有对照实现时才需要：

```sh
git submodule update --init references/nsh
```

改应用时以 `nsh check` 生成的 `apps/client/.nsh/types` 为准，不要把子模块当成应用的依赖。
