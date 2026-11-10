import { expect, open, test } from "nsh/test";

test("counts taps", async () => {
  const app = await open("./App.tsx");
  expect(app.texts()).toContain("Counter");
  expect(app.texts()).toContain("Each tap adds one.");
  expect(app.texts()).toContain("0");
  await app.press("Add");
  await app.press("Add");
  expect(app.texts()).toContain("2");
});

test("adds from the keyboard", async () => {
  // 无头测试默认是 iOS，Tab 只在输入框之间移动。桌面上 Tab 停在按钮上，Space 激活它。
  const app = await open("./App.tsx", { platform: "macos" });
  await app.keyboard.press("tab");
  await app.keyboard.press("space");
  expect(app.texts()).toContain("1");
});
