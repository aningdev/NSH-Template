import type { JSX } from "nsh";
import { split, Text } from "nsh";
import { Button as ButtonBase, type ButtonProps as ButtonBaseProps } from "nsh/base";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

/** 应用的按钮。`nsh/base` 的 Button 只有按压、焦点和禁用，外观集中在这里。 */
export function Button(
  props: ButtonBaseProps & {
    variant?: Variant;
    size?: Size;
    children?: JSX.Element;
  },
) {
  const [own, rest] = split(props, ["variant", "size", "children", "class"]);
  return (
    <ButtonBase
      {...rest}
      class={`items-center justify-center rounded-(--radius) font-medium focus:ring-2 focus:ring-ring disabled:opacity-40 ${
        (own.variant ?? "primary") === "secondary"
          ? "bg-secondary text-secondary-foreground hover:bg-accent active:bg-accent"
          : (own.variant ?? "primary") === "outline"
            ? "border border-border bg-background text-foreground hover:bg-accent active:bg-accent"
            : (own.variant ?? "primary") === "ghost"
              ? "bg-transparent text-foreground hover:bg-accent active:bg-accent"
              : (own.variant ?? "primary") === "destructive"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/90"
                : "bg-primary text-primary-foreground hover:bg-primary/95 active:bg-primary/90"
      } ${(own.size ?? "md") === "sm" ? "px-3 py-1.5 text-sm" : (own.size ?? "md") === "lg" ? "px-6 py-3.5 text-xl" : "px-5 py-3 text-lg"} ${own.class ?? ""}`}
    >
      <Text>{own.children}</Text>
    </ButtonBase>
  );
}
