const Blog = require("../models/Blog");

// create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content, tags, authorName } = req.body;
    const newBlog = new Blog({
      title,
      content,
      tags,
      authorName,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog post", error: error.message });
  }
};

// Get all blog posts with search, author, pagination and sorting
exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const search = req.query.search || "";
    const author = req.query.author || "";
    const sortParam = req.query.sort || "createdAt_desc";
    const skip = (page - 1) * limit;

    // Determine sort field and order
    const [sortField, sortOrder] = sortParam.split("_");
    const sortFieldForQuery = sortField === "tags" ? "primaryTag" : sortField;
    const sort = { [sortFieldForQuery]: sortOrder === "asc" ? 1 : -1 };

    const escapeRegex = (text) => {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    const escapedSearch = escapeRegex(search);

    const query = {
      $and: [
        {
          $or: [
            { title: { $regex: escapedSearch, $options: "i" } },
            { tags: { $elemMatch: { $regex: escapedSearch, $options: "i" } } },
            { authorName: { $regex: escapedSearch, $options: "i" } },
          ],
        },
      ],
    };

    if (author) {
      query.$and.push({ authorName: { $regex: `^${author}$`, $options: "i" } });
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query).sort(sort).skip(skip).limit(limit);

    res.status(200).json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

// get a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blog post", error: error.message });
  }
};

// update a blog post by ID
exports.updateBlogById = async (req, res) => {
  try {
    const { title, content, tags, authorName } = req.body;
    const updateBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, authorName },
      { new: true }
    );
    if (!updateBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updateBlog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating blog post", error: error.message });
  }
};

// delete a blog post by ID
exports.deleteBlogById = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog post", error: error.message });
  }
};

// Toggle Save/Unsave Blog
exports.toggleSaveBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.body.userId;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const index = blog.savedBy.indexOf(userId);

    if (index === -1) {
      blog.savedBy.push(userId); // Save
    } else {
      blog.savedBy.splice(index, 1); // Unsave
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save/unsave", error: err.message });
  }
};

// get all blogs saved by a specific user
exports.getSavedBlogs = async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const search = req.query.search?.toLowerCase() || "";
  const sortParam = req.query.sort || "createdAt_desc";

  // Determine sort field and order
  const [sortField, sortOrder] = sortParam.split("_");
  const sortFieldForQuery = sortField === "tags" ? "primaryTag" : sortField;
  const sort = { [sortFieldForQuery]: sortOrder === "asc" ? 1 : -1 };

  const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
  const escapedSearch = escapeRegex(search);

  try {
    const query = {
      savedBy: userId,
      $or: [
        { title: { $regex: escapedSearch, $options: "i" } },
        { tags: { $elemMatch: { $regex: escapedSearch, $options: "i" } } },
        { authorName: { $regex: escapedSearch, $options: "i" } },
      ],
    };

    const total = await Blog.countDocuments(query);
    const savedBlogs = await Blog.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      savedBlogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching saved blogs", error: error.message });
  }
};

// comment on a blog post
exports.commentBlog = async (req, res) => {
  const { author, text } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    blog.comments.push({ author, text });
    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};
