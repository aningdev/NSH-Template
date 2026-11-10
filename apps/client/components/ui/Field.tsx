import { platform, split, Text, View } from "nsh";
import { Input, type InputProps } from "nsh/base";

/** 指针密度。与 Button 同一规则。 */
const pointer = platform.desktop;

type FieldProps = InputProps & {
  /** 控件上方的可见标签，也是输入框的无障碍名称。 */
  label: string;
  /** 没有 `error` 时，控件下方的一句说明。 */
  hint?: string;
  /** 值不能提交。边框用 destructive；具体原因放 `error`。 */
  invalid?: boolean;
  /** 显示在控件下，并取代 `hint`。 */
  error?: string;
  /** 外层的类。输入框自己的类用 `inputClass`。 */
  class?: string;
  /** 加在输入框上的类。 */
  inputClass?: string;
};

/** 带标签的文本输入。值由调用方持有（`value` / `onChange`）。 有错误时只显示错误，避免说明和错误抢同一行。 */
export function Field(props: FieldProps) {
  const [own, rest] = split(props, [
    "label",
    "hint",
    "invalid",
    "error",
    "class",
    "inputClass",
  ]);
  const invalid = () => !!own.invalid || !!own.error;
  return (
    <View class={`w-full gap-1 ${own.class ?? ""}`}>
      <Text
        accessibilityElementsHidden
        class="text-sm font-medium text-foreground"
      >
        {own.label}
      </Text>
      <Input
        {...rest}
        accessibilityLabel={rest.accessibilityLabel ?? own.label}
        class={`${inputClass(invalid(), !!rest.readonly, !!rest.multiline)} ${own.inputClass ?? ""}`}
      />
      <If when={own.error}>
        {(message) => (
          <Text role="alert" class="text-sm text-destructive">
            {message()}
          </Text>
        )}
      </If>
      <If when={own.hint}>
        {(hint) => (
          <If when={!own.error}>
            <Text class="text-sm text-muted-foreground">{hint()}</Text>
          </If>
        )}
      </If>
    </View>
  );
}

function inputClass(invalid: boolean, readonly: boolean, multiline: boolean) {
  const frame = multiline
    ? pointer
      ? "min-h-16 px-2 py-1.5 text-sm"
      : "min-h-24 px-3.5 py-3 text-base"
    : pointer
      ? "min-h-7 px-2 text-sm"
      : "min-h-11 px-3.5 text-base";
  const edge = invalid
    ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive"
    : readonly
      ? "border-border text-muted-foreground"
      : "border-input hover:border-ring focus:border-ring focus:ring-2 focus:ring-ring";
  return `w-full rounded-(--radius) border bg-background text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-40 ${frame} ${edge}`;
}
