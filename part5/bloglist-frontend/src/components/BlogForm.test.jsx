import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("blogform calls the createBlog event handler with the right details", async () => {
    const createBlog = vi.fn();
    const { container } = render(<BlogForm createBlog={createBlog} />);

    const titleInput = container.querySelector("#titleInput");
    const authorInput = container.querySelector("#authorInput");
    const urlInput = container.querySelector("#urlInput");
    const submitButton = container.querySelector("#blogSubmitButton");

    const user = userEvent.setup();
    await user.type(titleInput, "Test title");
    await user.type(authorInput, "Test author");
    await user.type(urlInput, "www.test.com");
    await user.click(submitButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog).toHaveBeenCalledWith({
      title: "Test title",
      author: "Test author",
      url: "www.test.com",
    });
  });
});
