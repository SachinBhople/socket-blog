const { getAllBlogs, addBlogs, updateBlogs, deleteBlog } = require("../controller/blog.controller")

const router = require("express").Router()


router
    .get("/", getAllBlogs)
    .post("/add-blog", addBlogs)
    .put("/update-blog/:id", updateBlogs)
    .delete("/delete-blog/:id", deleteBlog)

module.exports = router
