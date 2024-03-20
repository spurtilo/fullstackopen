const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Bloglist", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Teppo Testinen",
        username: "teppo",
        password: "12345",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const usernameInput = await page.getByLabel("Username");
    const passwordInput = await page.getByLabel("Password");

    expect(usernameInput).toBeVisible();
    expect(passwordInput).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "teppo", "12345");
      await expect(
        page.getByText("Teppo Testinen is logged in...")
      ).toBeVisible();
      await expect(page.getByLabel("Username")).toBeHidden();
      await expect(page.getByLabel("Password")).toBeHidden();
      await expect(page.getByRole("button", { name: "Login" })).toBeHidden();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "teppo", "12354");
      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("invalid username or password");
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "teppo", "12345");
      await createBlog(
        page,
        "Testblog1",
        "Test Author1",
        "https://www.testaddress.fi"
      );
    });

    test("a new blog can be created", async ({ page }) => {
      const successDiv = await page.locator(".success");
      await expect(successDiv).toContainText("A new blog added:");
    });

    test("a blog can be liked", async ({ page }) => {
      await page.getByTestId("viewHideButton").click();
      await page.getByTestId("likeButton").click();
      await expect(page.getByTestId("likeCount")).toHaveText("1");
    });

    test("a blog can be removed by the user who created it", async ({
      page,
    }) => {
      page.on("dialog", (dialog) => dialog.accept());

      await page.getByTestId("viewHideButton").click();
      await page.getByTestId("removeButton").click();
      await expect(page.getByTestId("Testblog1")).toBeHidden();
    });

    test("only the creator of the blog can see the remove button", async ({
      page,
      request,
    }) => {
      await request.post("/api/users", {
        data: {
          name: "Matti Testinen",
          username: "matti",
          password: "abcde",
        },
      });

      await page.getByTestId("logoutButton").click();
      await loginWith(page, "matti", "abcde");

      await page.getByTestId("viewHideButton").click();
      await expect(page.getByTestId("removeButton")).toBeHidden();
    });

    test("blogs are arranged by number of likes in descending order", async ({
      page,
    }) => {
      test.setTimeout(30000);

      await createBlog(
        page,
        "Testblog2",
        "Test Author2",
        "https://www.testaddress.fi"
      );
      await createBlog(
        page,
        "Testblog3",
        "Test Author3",
        "https://www.testaddress.fi"
      );

      const blog1 = await page.getByTestId("Testblog1");
      await blog1.getByTestId("viewHideButton").click();
      await blog1.getByTestId("likeButton").click();
      await expect(blog1.getByTestId("likeCount")).toHaveText("1");

      const blog2 = await page.getByTestId("Testblog2");
      await blog2.getByTestId("viewHideButton").click();
      const likeButton2 = await blog2.getByTestId("likeButton");
      await likeButton2.click();
      await expect(blog2.getByTestId("likeCount")).toHaveText("1");
      await likeButton2.click();
      await expect(blog2.getByTestId("likeCount")).toHaveText("2");

      const blog3 = await page.getByTestId("Testblog3");
      await blog3.getByTestId("viewHideButton").click();
      const likeButton3 = await blog3.getByTestId("likeButton");
      await likeButton3.click();
      await expect(blog3.getByTestId("likeCount")).toHaveText("1");
      await likeButton3.click();
      await expect(blog3.getByTestId("likeCount")).toHaveText("2");
      await likeButton3.click();
      await expect(blog3.getByTestId("likeCount")).toHaveText("3");

      const expectedOrder = [
        "Testblog3 - Test Author3 Hide",
        "Testblog2 - Test Author2 Hide",
        "Testblog1 - Test Author1 Hide",
      ];
      const arrangedList = await page
        .getByTestId("blogItemTitle")
        .allInnerTexts();

      expect(arrangedList).toStrictEqual(expectedOrder);
    });
  });
});
