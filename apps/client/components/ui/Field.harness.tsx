import { mount, signal, View } from "nsh";

import { Field } from "./Field";

function Harness() {
  const name = signal("");
  return (
    <View class="flex-1 gap-4 bg-background p-4 pb-[env(keyboard-inset-height)]">
      <Field
        label="Name"
        hint="What to call it."
        value={name()}
        onChange={(event) => name.set(event.value)}
      />
      <Field label="Code" disabled value="nsh" />
      <Field
        label="Email"
        invalid
        error="Enter an email address."
        value="not-an-email"
      />
    </View>
  );
}

mount(Harness);
