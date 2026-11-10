import { mount, signal, Text, View } from "nsh";

import { Button } from "./Button";

function Harness() {
  const count = signal(0);
  const add = () => count.update((value) => value + 1);
  return (
    <View class="flex-1 gap-4 bg-background p-4">
      <Text>{count()}</Text>
      <Button onPress={add}>Add</Button>
      <Button disabled onPress={add}>
        Hold
      </Button>
      <Button loading onPress={add}>
        Save
      </Button>
      <Button selected>Chosen</Button>
    </View>
  );
}

mount(Harness);
