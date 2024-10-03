import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './style.css';
import EditorComponent from '../TextEditorQuill'; // Importing the editor component

const BlogForm = () => {
  const { blogId } = useParams();
  const history = useHistory(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [keywords, setKeywords] = useState('');
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (blogId) {
      fetchBlogDetails(blogId);
      setEditMode(true);
    }
    fetchAllBlogs();
  }, [blogId]);

  const fetchBlogDetails = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/get-blogbyid/${id}`);
      const blog = response.data;
      setTitle(blog.title);
      setContent(blog.content);
      setImage(blog.image);
      setKeywords(blog.keywords.join(', '));
      setEditMode(true);
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/get-allblogs`);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching all blogs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keywordArray = keywords.split(',').map(keyword => keyword.trim());

    try {
      if (editMode) {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/edit-blog/${blogId}`, {
          title,
          content,
          image,
          keywords: keywordArray,
        });
        if (response.status === 200) {
          setMessage('Blog updated successfully!');
          history.push('/blogs'); // Redirect to the blog list after update
        }
      } else {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/create-blog`, {
          title,
          content,
          image,
          keywords: keywordArray,
        });
        if (response.status === 201) {
          setMessage('Blog created successfully!');
          setTitle('');
          setContent('');
          setImage('');
          setKeywords('');
        }
      }
    } catch (error) {
      setMessage('Error occurred. Please try again.');
      console.error(error);
    }
  };

  const handleEditClick = (id) => {
    fetchBlogDetails(id);
    setEditMode(true);
  };

  return ( 
    <div className='blog'>
    <div className="blog-form-container">
      <div className="bde-content-con">
        <h1>{editMode ? 'Edit Blog' : 'Create a New Blog'}</h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit} className="add-job-vacancies-form-con">
          <div className="form-group salary-container">
            <div className="emp-work-input">
              <label htmlFor="title" className="spoc-label">Title</label>
              <input
                type="text"
                id="title"
                className="commission-input-con salary-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group salary-container">
            <div className="emp-work-input">
              <label htmlFor="content" className="spoc-label">Content</label>
              <EditorComponent content={content} handleEditorChange={setContent} />
            </div>
          </div>
          <div className="form-group salary-container">
            <div className="emp-work-input">
              <label htmlFor="image" className="spoc-label">Image URL</label>
              <input
                type="text"
                id="image"
                className="commission-input-con salary-input"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group salary-container">
            <div className="emp-work-input">
              <label htmlFor="keywords" className="spoc-label">Keywords (comma separated)</label>
              <input
                type="text"
                id="keywords"
                className="commission-input-con salary-input"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="bde-form-btn">{editMode ? 'Update Blog' : 'Submit'}</button>
        </form>
      </div>

      <div className="blog-list-section">
        <h2>Blog List</h2>
        <ul className="blog-list">
          {blogs.map((blog) => (
            <li key={blog.id} className="blog-item">
              <h3>{blog.title}</h3>
              <p>{blog.readtime} | {blog.publishedDate.substring(0, 10)}</p>
              <button onClick={() => handleEditClick(blog.id)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div> 
    </div>
  );
};

export default BlogForm;
