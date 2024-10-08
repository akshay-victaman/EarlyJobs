const express = require('express');
const router = express.Router();
const { CreateBlog,getBlogs,getBlogbyTittle,EditBlogbyId,getAllBlogs,getBlogById,deleteBlogById} = require('../controllers/BlogsController'); // Make sure the path is correct

router.post('/create-blog', CreateBlog); 
router.get('/get-blogs', getBlogs);
router.get('/blogs/:blogTittle', getBlogbyTittle)
router.get('/get-blogbyid/:blogId', getBlogById);
router.put('/edit-blog/:blogId', EditBlogbyId);
router.get('/get-allblogs', getAllBlogs);
router.delete('/delete-blog/:blogId', deleteBlogById);


module.exports = router;