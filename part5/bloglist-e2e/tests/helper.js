const loginWith = async (page, username, password) => {
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "New Blog" }).click();
  await page.getByTestId("titleInput").fill(title);
  await page.getByTestId("authorInput").fill(author);
  await page.getByTestId("urlInput").fill(url);
  await page.getByRole("button", { name: "Submit" }).click();

  const regex = new RegExp(`^${title}.*`);
  await page.getByTestId(regex).waitFor();
};

export { loginWith, createBlog };
