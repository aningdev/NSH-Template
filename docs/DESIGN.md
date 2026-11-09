# 设计标准

计数器这一屏要让人看出：当前数量是内容，Add 是下一步。标题和说明只负责说清这件事。

## 平台

支持桌面（macOS、Windows、Linux）、手机和平板（iOS、Android）、以及 Web。

不支持 TUI。GPUI 是嵌入宿主，不是另一套外观：`platform.desktop` 为真时用指针密度，否则用触摸密度。Mac Catalyst 走 iOS，算移动端。

`package.json` 里的 `dev:*` 是运行目标，不代表每个目标都有单独的布局。Web 在宽视口上算桌面。

## 密度

整个界面同一套密度，不单改一个控件。

|                     | 指针（`platform.desktop`）  | 触摸                          |
| ------------------- | --------------------------- | ----------------------------- |
| Button sm / md / lg | 最小高度 24 / 28 / 32       | 44 / 44 / 48                  |
| Field               | 最小高度 28，字号 `text-sm` | 最小高度 44，字号 `text-base` |

高度用 `min-h-*`，让系统字号变大时撑开，不用写死的高度。触摸目标已经到 44，不再加 `hitSlop`。指针尺寸可以小于 44。

间距用 Tailwind 的 4 点一档：标题和说明 `gap-1`，这一屏上的几块内容 `gap-6`。圆角只用主题的 `radius`（`rounded-(--radius)`，`0.5rem`）。

## 颜色

组件里只用语义类：`bg-primary`、`text-muted-foreground`、`border-input`、`ring-ring`。不要写 hex、`rgb()` 或 `bg-blue-500`。缺角色时先改 `theme.json`。

| Token                                                                                              | 用途                                   |
| -------------------------------------------------------------------------------------------------- | -------------------------------------- |
| 默认的 background、foreground、primary、secondary、accent、muted、border、input、ring、destructive | 表面、文字、主操作、结构、危险操作     |
| `success` / `warning` / `info`                                                                     | 只表示成功、警告、信息。这一屏还没用到 |
| `overlay`                                                                                          | 以后弹层的遮罩                         |
| `radius`                                                                                           | 控件和表面的圆角                       |

亮色和暗色成对。`destructive` 用主题自带的前景色，不要单独改成白色。

## 组件

原子组件在 `apps/client/components/ui/`。页面只组合它们。

| 组件     | 做什么                                                                                                                                                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Title`  | 一屏一个标题，`role="header"`                                                                                                                                                                                                                                             |
| `Muted`  | 标题或控件下的一句说明                                                                                                                                                                                                                                                    |
| `Button` | `primary`（这一屏的 Add）、`secondary`、`outline`、`ghost`、`destructive`。尺寸 `sm` / `md` / `lg`。`selected` 是保持住的选中，`disabled` 变淡并且不能按。`loading` 同样不能按，但不变淡。`nsh/base` 的 Button 不接收 `accessibilityState`，所以读屏把 loading 报成不可用 |
| `Field`  | 带标签的单行或多行输入。`invalid` 或 `error` 用 destructive 边；有 `error` 时不显示 `hint`                                                                                                                                                                                |

状态用类，不用另一套颜色：`hover:`、`active:`、`focus-visible:`、`selected:`、`disabled:`。`focus-visible:` 在 NSH 里等于有焦点。

子节点是按钮文字，组件内部包进 `Text`，字符串才能显示。图标按钮以后再加槽位，不要把任意 `View` 塞进这个 `Text`。

## 文案

示例界面用英文，句子大小写：标题 `Counter`，说明 `Each tap adds one.`，按钮 `Add`（结果，不是手势 `Tap`）。短标签不加句号，完整说明加句号。

产品文案选定一种语言后整屏使用。不要中英混排，也不要在这个模板里加 i18n。
