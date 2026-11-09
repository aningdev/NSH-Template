import { mount, signal, Text, View } from "nsh";

import { Button } from "./components/ui/Button";
import { Muted, Title } from "./components/ui/Type";

function App() {
  const count = signal(0);
  return (
    <View class="flex-1 items-center justify-center gap-6 bg-background pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
      <View class="items-center gap-1">
        <Title>Counter</Title>
        <Muted>Each tap adds one.</Muted>
      </View>
      <Text class="text-3xl font-semibold text-foreground tabular-nums">{count()}</Text>
      <Button onPress={() => count.update((c) => c + 1)}>Add</Button>
    </View>
  );
}

mount(App);
