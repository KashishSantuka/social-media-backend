const express = require("express");
const { getAllBlogs, saveBlogs, updateBlogs ,deleteBlog, getByIdBlogs} = require("../controllers/blog");

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getByIdBlogs);
blogRouter.post("/", saveBlogs);
blogRouter.put("/:id", updateBlogs);
blogRouter.delete("/:id", deleteBlog);

module.exports = blogRouter;
