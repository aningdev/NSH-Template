import { expect, open, test } from "nsh/test";

test("a disabled button does not activate", async () => {
  const app = await open("./Button.harness.tsx");
  await expect(app.press("Hold")).rejects.toMatchObject({
    code: "ERR_NSH_TEST_DISABLED",
  });
  expect(app.texts()).toContain("0");
});

test("a loading button does not activate again", async () => {
  const app = await open("./Button.harness.tsx");
  expect(app.enabled("Save")).toBe(false);
  await expect(app.press("Save")).rejects.toMatchObject({
    code: "ERR_NSH_TEST_DISABLED",
  });
  expect(app.texts()).toContain("0");
});

test("a selected button still shows its label", async () => {
  const app = await open("./Button.harness.tsx");
  expect(app.texts()).toContain("Chosen");
  await app.press("Chosen");
  expect(app.texts()).toContain("0");
});
