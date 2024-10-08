const { v4: uuidv4 } = require('uuid');
const BlogModel = require('../model/blogModel.js'); // Adjust the path as needed
const BlogsCollectionModel = require('../model/blogCollections.js'); // Adjust the path as needed
const CalculateReadTime = require('../utils/calculateReadTime.js'); // Assuming you place the utility function in a separate file

const CreateBlog = async (req, res) => {
  try {
      const { title, content, image,keywords} = req.body;
    // Generate a unique ID for the new blog
    const blogId = uuidv4();

    // Calculate read time
      const readtime = CalculateReadTime(content);
      console.log(keywords);

    // Create the new blog entry
    const newBlog = new BlogModel({
      id: blogId,
      title,
      content,
      image,
      readtime:`${readtime} Mins`,
      publishedDate: new Date(),
      keywords,
    });

    // Save the new blog
      const savedBlog = await newBlog.save();
    // Check if a BlogsCollection already exists
      let blogsCollection = await BlogsCollectionModel.findOne({ blog_id: blogId });
    if (!blogsCollection) {
      // If no BlogsCollection exists with this blogId, create a new one
      blogsCollection = new BlogsCollectionModel({
        blog_id: blogId,
        title,
        publishedDate: new Date(),  // Storing the publish date
        image,
        readtime,// Storing the calculated read time
        keywords,
        blogs: [savedBlog._id],
      });
      await blogsCollection.save();
    } else {
      // Update existing BlogsCollection
      blogsCollection.blogs.push(savedBlog._id);
      blogsCollection.readtime = `${readtime} Mins`;  // Aggregate read time if desired
      await blogsCollection.save();
    }
    
    res.status(201).json({
      message: 'Blog created successfully',
      blog: savedBlog,
    });
  } catch (error) {
      console.log("create blog is called but came to Error");
    res.status(500).json({ message: error.message });
  }
};


const getBlogs = async (req, res) => {
  const { page = 0, limit = 10, search = "" } = req.query;
  try {
    const blogs = await BlogModel.find({ title: { $regex: search, $options: "i" } })
      .skip(Number(page) * Number(limit))
      .limit(Number(limit));
    
    const totalBlogs = await BlogModel.countDocuments({ title: { $regex: search, $options: "i" } });

    res.json({ blogs, totalBlogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const allBlogList = await BlogModel.find(); // Use find() instead of findAll() for MongoDB/Mongoose
    if (allBlogList.length === 0) {
      return res.json({ message: "No blogs found" });
    }
    return res.status(200).json({ message: "Fetched the documents", blogs: allBlogList });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

const getBlogbyTittle = async (req, res) => {
  const { blogTittle } = req.params;
  try {
    // Fetch the blog from the database
    const blog = await BlogModel.findOne({ title: blogTittle });
    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    // Return the blog data
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};
const getBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    // Fetch the blog from the database
    const blog = await BlogModel.findOne({ id: blogId });
    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    // Return the blog data
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

const EditBlogbyId = async (req, res) => {
   const { blogId } = req.params;
  const { title, content, image,keywords } = req.body;
  try {
    // Calculate the new read time based on the updated content
    const readtime = CalculateReadTime(content);

    // Find the blog by ID and update the specified fields
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { id: blogId }, // Condition to find the blog by ID
      {
        $set: {
          title,
          content,
          image,
          readtime: `${readtime} Mins`,
          keywords:keywords
        },
      },
      { new: true } // Return the updated document
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({
      message: 'Blog updated successfully',
      blog: updatedBlog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: error.message });
  }
}

const deleteBlogById = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await BlogModel.findOne({ id: blogId });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    await BlogModel.deleteOne({ id: blogId });

    const blogsCollection = await BlogsCollectionModel.findOne({ blogs: blog._id });

    if (blogsCollection) {
      blogsCollection.blogs = blogsCollection.blogs.filter((blogId) => !blogId.equals(blog._id));

      if (blogsCollection.blogs.length === 0) {
        await BlogsCollectionModel.deleteOne({ blog_id: blogId });
      } else {
        await blogsCollection.save();
      }
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { CreateBlog ,getBlogs,getBlogbyTittle,EditBlogbyId,getAllBlogs,getBlogById,deleteBlogById};