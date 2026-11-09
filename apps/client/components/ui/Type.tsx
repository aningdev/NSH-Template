import type { TextProps } from "nsh";
import { split, Text } from "nsh";

/** 一屏一个标题。 */
export function Title(props: TextProps) {
  const [own, rest] = split(props, ["class", "children"]);
  return (
    <Text
      {...rest}
      role="header"
      accessibilityLevel={1}
      class={`text-xl font-semibold text-foreground ${own.class ?? ""}`}
    >
      {own.children}
    </Text>
  );
}

/** 标题或控件下面的一句说明。 */
export function Muted(props: TextProps) {
  const [own, rest] = split(props, ["class", "children"]);
  return (
    <Text {...rest} class={`text-sm text-muted-foreground ${own.class ?? ""}`}>
      {own.children}
    </Text>
  );
}
