import { expect, open, test } from "nsh/test";

test("edits the value and shows the hint", async () => {
  const app = await open("./Field.harness.tsx");
  expect(app.texts()).toContain("What to call it.");
  expect(app.value("Name")).toBe("");
  await app.type("Name", "Ada");
  expect(app.value("Name")).toBe("Ada");
});

test("a disabled field is not editable", async () => {
  const app = await open("./Field.harness.tsx");
  expect(app.enabled("Code")).toBe(false);
  expect(app.value("Code")).toBe("nsh");
});

test("an error replaces the hint", async () => {
  const app = await open("./Field.harness.tsx");
  expect(app.value("Email")).toBe("not-an-email");
  expect(app.texts()).toContain("Enter an email address.");
});
