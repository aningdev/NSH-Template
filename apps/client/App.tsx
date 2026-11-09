import { mount, signal, Text, View } from "nsh";

import { Button } from "./components/Button";

function App() {
  const count = signal(0);
  return (
    <View class="flex-1 items-center justify-center gap-4 bg-background pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
      <Text class="text-3xl font-semibold text-foreground">{count()}</Text>
      <Button onPress={() => count.update((c) => c + 1)}>Tap</Button>
    </View>
  );
}

mount(App);
