# 架构

TSX 应用。`apps/client/nsh.json` 没有 `"rust"`，UI 和逻辑都在 TypeScript 里，由 QuickJS 跑在 NSH 引擎上。不在这个模板里加 Rust crate 或 npm UI。

## 分层

依赖只向下：

```text
App.tsx
  └─ components/       业务组件。现在还没有
       └─ ui/          原子样式组件（Button、Field、Title、Muted）
            └─ nsh/base  行为：按压、焦点、禁用、无障碍。没有外观
                 └─ nsh   视图、文本、信号、主题
```

`nsh/base` 不负责颜色、圆角和字号。缺的外观加在 `components/ui/`，缺的颜色角色先加进 `theme.json`。页面不要直接给 `nsh/base` 的控件写一套只在这一屏用的样式。由原子组合成的业务组件放在 `components/`，不要放进 `ui/`。

## 文件

```text
apps/client/
  App.tsx            入口，mount(App)。这一屏的状态留在这里
  nsh.json           应用名、id、版本、theme
  theme.json         语义颜色和圆角。原始色值只放这里
  components/ui/     原子组件。页面和业务组件都从这里取外观
  *.test.tsx         跟在被测文件旁边
```

现在只有一个页面，所以没有 `pages/` 和 `store.ts`。第二屏再用 `NavStack` 和 `pages/`。状态要跨页面时，再把信号放进 `store.ts`，页面只读它导出的函数。

组件函数只跑一次。会变的值在 JSX 里读（`count()`、`own.variant`），不要在函数体里读完再当成会跟着变。

## 仓库

| 路径              | 作用                                 |
| ----------------- | ------------------------------------ |
| `package.json`    | Bun 工作区，脚本转发到 `apps/client` |
| `docs/DESIGN.md`  | 平台、密度、token、文案              |
| `references/nsh`  | 可选的引擎源码子模块，不是应用依赖   |
| `.agents/skills/` | 给代理用的 NSH 技能                  |

根目录的 TypeScript 配置给仓库工具用。应用的类型检查是 `nsh check`，它使用 `apps/client/tsconfig.json`。
