# NSH-Template

这是一个 **Native Shell（NSH）TSX** 应用模板，不是 Bun 服务，也不是 Node 应用。界面跑在 NSH 上（QuickJS + 各平台原生视图）。Bun 只用于仓库脚本和格式化。

改 UI、主题或交互之前，先读已安装的技能 `nsh` 和 `nsh-design-guides`，再读 [docs/DESIGN.md](docs/DESIGN.md) 和 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。不要照 React、React Native 或 shadcn 猜 API。TSX 以 `apps/client/.nsh/types` 为准（`nsh check` 生成）；`references/nsh` 只在要对照引擎源码时用。

## 布局

- 入口：`apps/client/App.tsx`，旁边是 `nsh.json`。没有 `"rust"`，不要加 Rust crate。
- 原子组件：`apps/client/components/ui/`（`Button`、`Field`、`Title`、`Muted`）。页面组合它们，不要在页面里另写一套 `nsh/base` 的外观。业务组件放 `components/`，不要放进 `ui/`。
- 跨页面状态出现之前，不要加 `store.ts`。第二个页面出现之前，不要加 `NavStack`。
- 测试是组件旁边的 `*.test.tsx`，用 `nsh test`，不是 `bun test`。

## 命令

在仓库根目录：

- `bun run dev`：运行应用
- `bun run check`：`nsh check`、`nsh build`，以及 `bun fmt --check`
- `bun run fmt`：格式化
- `bun run test`：`nsh test`

应用代码不能用 Node、npm 包或 DOM。标准模块只有 `buffer`、`console`、`crypto`、`fs/promises`、`net`、`os`、`path`、`process`、`url`、`websocket`、`zlib`。
