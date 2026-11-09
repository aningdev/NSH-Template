import type { JSX } from "nsh";
import { platform, split, Text } from "nsh";
import {
  Button as ButtonBase,
  type ButtonProps as ButtonBaseProps,
} from "nsh/base";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

/** 指针密度。`platform.desktop` 在一次运行里不变，Web 的宽视口也算桌面。 */
const pointer = platform.desktop;

const sizes: Record<Size, string> = pointer
  ? {
      sm: "min-h-6 gap-1 px-2 text-xs",
      md: "min-h-7 gap-1.5 px-3 text-sm",
      lg: "min-h-8 gap-2 px-4 text-base",
    }
  : {
      sm: "min-h-11 gap-1.5 px-3 text-sm",
      md: "min-h-11 gap-2 px-4 text-base",
      lg: "min-h-12 gap-2 px-5 text-lg",
    };

/** 基础色在前，状态类在后，这样后写的状态盖得住静止样式。 */
const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 selected:bg-primary/75",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-accent active:bg-accent selected:bg-accent selected:text-accent-foreground",
  outline:
    "border border-border bg-background text-foreground hover:bg-accent active:bg-accent selected:border-border selected:bg-accent selected:text-accent-foreground",
  ghost:
    "bg-transparent text-foreground hover:bg-accent active:bg-accent selected:bg-accent selected:text-accent-foreground",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 selected:bg-destructive/75",
};

/** 应用的按钮。`nsh/base` 的 Button 只有按压、焦点、选中和禁用。 子节点是标签，包进一个 `Text` 才能显示字符串。 */
export function Button(
  props: ButtonBaseProps & {
    variant?: Variant;
    size?: Size;
    /** 它启动的工作还在进行：disabled 阻止再按，但不套用变淡。 */
    loading?: boolean;
    children?: JSX.Element;
  },
) {
  const [own, rest] = split(props, [
    "variant",
    "size",
    "loading",
    "children",
    "class",
  ]);
  const variant = () => own.variant ?? "primary";
  const size = () => own.size ?? "md";
  return (
    <ButtonBase
      {...rest}
      disabled={!!rest.disabled || !!own.loading}
      class={`flex-row items-center justify-center rounded-(--radius) font-medium focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none ${variants[variant()]} ${sizes[size()]} ${own.loading ? "" : "disabled:opacity-40"} ${own.class ?? ""}`}
    >
      <Text>{own.children}</Text>
    </ButtonBase>
  );
}
