import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import EditorComponent from '../TextEditorQuill'; 

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

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [successUpload, setSuccessUpload] = useState(false);
  const [open, setOpen] = useState(false); // For popup

  const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

  const s3Client = new S3Client({
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY_ID,
    },
  });

  useEffect(() => {
    if (blogId) {
      fetchBlogDetails(blogId);
      setEditMode(true);
    }
    fetchAllBlogs();
  }, [blogId]);

  const fetchBlogDetails = async (id) => {
    try {
      const response = await axios.get(`${backendUrl}/get-blogbyid/${id}`);
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
      const response = await axios.get(`${backendUrl}/get-allblogs`);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching all blogs:', error);
    }
  };

  const handleEditClick = (id) => {
    history.push(`/edit-blog/${id}`); 
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/delete-blog/${id}`);
      if (response.status === 200) {
        setMessage('Blog deleted successfully');
        toast.success('Blog deleted successfully!');
        fetchAllBlogs();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      setMessage('Error occurred while deleting the blog.');
      toast.error('Error occurred while deleting the blog.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keywordArray = keywords.split(',').map((keyword) => keyword.trim());

    try {
      if (editMode) {
        const response = await axios.put(`${backendUrl}/edit-blog/${blogId}`, {
          title,
          content,
          image: imageUrl || image, // Use uploaded image URL or existing one
          keywords: keywordArray,
        });
        if (response.status === 200) {
          setMessage('Blog updated successfully!');
          toast.success('Blog updated successfully!');
          history.push('/blogs');
        }
      } else {
        const response = await axios.post(`${backendUrl}/create-blog`, {
          title,
          content,
          image: imageUrl, // Use uploaded image URL
          keywords: keywordArray,
        });
        if (response.status === 201) {
          setMessage('Blog created successfully!');
          toast.success('Blog created successfully!');
          setTitle('');
          setContent('');
          setImage('');
          setKeywords('');
        }
      }
    } catch (error) {
      setMessage('Error occurred. Please try again.');
      toast.error('Error occurred. Please try again.');
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const uploadImage = async () => {
    if (!file) return;
    try {
      const timestamp = Date.now();
      const params = {
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME, 
        Key: `${file.name}-${timestamp}`,
        Body: file,
        ContentType: file.type,
      };
  
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
  
      const uploadedImageUrl = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_BUCKET_REGION}.amazonaws.com/${params.Key}`;
      setImageUrl(uploadedImageUrl);
      setSuccessUpload(true);
      setFile(null);
      toast.success('Image uploaded successfully!');
      setOpen(false); // Close popup on successful upload
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      toast.error('Failed to upload image');
    }
  };
  
  return (
    <div className='blog'>
      <ToastContainer />
      <div className="blog-form-container">
        <div className="bde-content-con">
          <h1>{editMode ? 'Edit Blog' : 'Create a New Blog'}</h1>
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

            {/* Image Upload Section */}
            <div className="form-group salary-container">
              <div className="emp-work-input">
                <label className="spoc-label">Upload Image</label>
                <button
                  type="button"
                  className="bde-form-btn"
                  onClick={() => setOpen(true)} // Open popup for image upload
                >
                  Upload Image
                </button>

                {/* Display uploaded image if available */}
                {imageUrl || image ? (
                  <div>
                    <img src={imageUrl || image} alt="Uploaded" width="200" />
                  </div>
                ) : (
                  <p>No image uploaded</p>
                )}

                {/* Popup for file upload */}
                <Popup open={open} onClose={() => setOpen(false)} modal>
                  <div className="faculty-popup-form">
                    <button className="close-button" onClick={() => setOpen(false)}>
                      &times;
                    </button> 
                    <h2>Upload Image</h2>
                    <label className="faculty-image-label" htmlFor="file">
                      {file ? file.name : 'Choose File'}
                    </label> 
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <button
                      className="faculty-popup-button"
                      type="button"
                      onClick={uploadImage}
                    >
                      Upload
                    </button>
                  </div>
                </Popup>

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
            
            <button type="submit" className="bde-form-btn">
              {editMode ? 'Update Blog' : 'Submit'}
            </button>
          </form>
        </div>

        {/* Blog List Display as Cards */}
        <div className="blog-list-section">
          <h2>Blog List</h2>
          <div className="add-blog-cards-container">
            {blogs.map((blog) => (
              <div key={blog.id} className="add-blog-card">
                <h3>{blog.title}</h3>
                <p>{blog.readtime} | {blog.publishedDate.substring(0, 10)}</p>
    
                <div className="blog-actions">
                  <button onClick={() => handleEditClick(blog.id)}>Edit</button>
                  <button onClick={() => handleDeleteClick(blog.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogForm;
