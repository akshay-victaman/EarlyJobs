import React, { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import EditorComponent from '../TextEditorQuill'; 

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [open, setOpen] = useState(false); // For popup

  const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

  const s3Client = new S3Client({
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY_ID,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keywordArray = keywords.split(',').map((keyword) => keyword.trim());

    try {
      const response = await axios.post(`${backendUrl}/create-blog`, {
        title,
        content,
        image: imageUrl, // Use uploaded image URL
        keywords: keywordArray,
      });
      if (response.status === 201) {
        toast.success('Blog created successfully!');
        setTitle('');
        setContent('');
        setImageUrl('');
        setKeywords('');
      }
    } catch (error) {
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
      toast.success('Image uploaded successfully!');
      setOpen(false); 
      setFile(null);
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
          <h1>Create a New Blog</h1>
          <form onSubmit={handleSubmit} className="add-job-vacancies-form-con">
            <div className="form-group salary-container">
              <div className="emp-work-input">
                <label htmlFor="title" className="title-label">Title</label>
                <input
                  type="text"
                  id="title"
                  className="title-input" 
                  placeholder='Enter blog title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group salary-container">
              <div className="emp-work-input">
                <label htmlFor="content" className="content-label">Content</label>
                <EditorComponent  content={content} handleEditorChange={setContent} />
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
                {imageUrl ? (
                  <div>
                    <img src={imageUrl} alt="Uploaded" width="200" />
                  </div>
                ) : (
                  <p className='no-img-cont'>No image uploaded</p>
                )}

                {/* Popup for file upload */}
                <Popup open={open} onClose={() => setOpen(false)} modal>
                  <div className="faculty-popup-form">
                    <button className="faculty-popup-close" onClick={() => setOpen(false)}>
                      &times;
                    </button> 
                    <h2 className='upload-heading'>Upload Image</h2>
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
                  placeholder='Enter keywords'
                  className="keywords-input"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="bde-form-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
