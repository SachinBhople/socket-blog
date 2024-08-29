const asyncHanlder = require("express-async-handler")
const Blog = require("../model/Blog")
const { io } = require("../socket/socket")

exports.getAllBlogs = asyncHanlder((async (req, res) => {
    const result = await Blog.find()
    res.status(200).json({ message: "blog Fetch success", result })
}))

exports.addBlogs = asyncHanlder((async (req, res) => {
    await Blog.create(req.body)
    const result = await Blog.find()
    io.emit("blog-create-response", result)
    res.status(200).json({ message: "blog add success" })
}))
exports.updateBlogs = asyncHanlder((async (req, res) => {
    const { id } = req.params
    await Blog.findByIdAndUpdate(id, req.body)
    const result = await Blog.find()
    io.emit("blog-create-response", result)
    res.status(200).json({ message: "blog update success" })
}))
exports.deleteBlog = asyncHanlder((async (req, res) => {

    const { id } = req.params
    await Blog.findByIdAndDelete(id)
    const result = await Blog.find()
    io.emit("blog-create-response", result)
    res.status(200).json({ message: "blog delete success" })
}))