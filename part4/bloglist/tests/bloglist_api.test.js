const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
// const _ = require("lodash");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const app = require("../app");

const api = supertest(app);

describe("when there is initially some notes saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("The correct amount of blogs are returned as JSON", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("The unique identifier property of blog posts is named 'id'", async () => {
    const response = await api.get("/api/blogs");
    assert(response.body.every((entry) => "id" in entry));
  });

  describe("Addition of a new blog", () => {
    test("succeeds with valid data", async () => {
      const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
      };

      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const createdBlogId = response.body.id;
      const blogsAtEnd = await helper.blogsInDb();
      const createdBlog = blogsAtEnd.find((blog) => blog.id === createdBlogId);

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
      assert.deepStrictEqual(createdBlog, { ...newBlog, id: createdBlogId });
    });

    test("with 'like' property missing, default value is 0", async () => {
      const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      };

      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const returnedLikeValue = response.body.likes;
      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(returnedLikeValue, 0);
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    });

    test("fails with '400 Bad Request' if 'title' property missing", async () => {
      const newBlogNoTitle = {
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
      };

      await api
        .post("/api/blogs")
        .send(newBlogNoTitle)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("fails with '400 Bad Request' if 'url' property missing", async () => {
      const newBlogNoUrl = {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      };

      await api
        .post("/api/blogs")
        .send(newBlogNoUrl)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  describe("Updating a blog", () => {
    test("with selected fields and valid data", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedFields = {
        title: "This is the updated title",
        likes: 56,
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedFields)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const updatedBlog = blogsAtEnd.find(
        (blog) => blog.id === blogToUpdate.id
      );

      assert.equal(updatedBlog.title, updatedFields.title);
      assert.equal(updatedBlog.likes, updatedFields.likes);

      assert.equal(updatedBlog.author, blogToUpdate.author);
      assert.equal(updatedBlog.url, blogToUpdate.url);
    });

    test("fails with statuscode 400 if 'likes' data is invalid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedFields = {
        likes: "Fifty six",
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedFields)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("fails with statuscode 400 if id is invalid", async () => {
      const invalidBlogId = "48c93a8d94a434";
      const updatedFields = {
        title: "This is the updated title",
        likes: 56,
      };

      await api
        .put(`/api/blogs/${invalidBlogId}`)
        .send(updatedFields)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });

    test("fails with statuscode 404 if blog does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();
      const updatedFields = {
        title: "This is the updated title",
        likes: 56,
      };

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send(updatedFields)
        .expect(404)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("Deletion of a blog", () => {
    test("succeeds with status 204 if id valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
      assert.strictEqual(
        blogsAtEnd.some((blog) => blog.id === blogToDelete.id),
        false
      );
    });

    test("fails with statuscode 400 if id is invalid", async () => {
      const invalidId = "48c93a8d94a434";

      await api.delete(`/api/blogs/${invalidId}`).expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("fails with statuscode 404 if blog does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.delete(`/api/blogs/${validNonexistingId}`).expect(404);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
