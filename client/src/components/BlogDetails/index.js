import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the title from the URL
import axios from 'axios';
import './style.css';

const BlogDetails = () => {
    const { blogTitle } = useParams(); // Get the blog title from the URL
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => { 
        window.scrollTo(0, 0);
        document.title = 'Blog Page | EarlyJobs'; 
        
        const fetchBlog = async () => {
            try {
                // Since the blogTitle is already encoded in the URL, don't encode it again.
                console.log("Fetching blog with title: ", blogTitle);
                
                // Fetch blog details without re-encoding the title
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/blogs/${blogTitle}`);
                
                setBlog(response.data);
            } catch (err) {
                setError('Failed to fetch blog details');
                console.error('Error fetching blog:', err);
            }
        };

        if (blogTitle) {
            fetchBlog();
        }
    }, [blogTitle]); // Re-fetch blog if blogTitle changes

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!blog) {
        return <p>Loading...</p>; // Show a loading message while the blog details are being fetched
    }

    return (
        <div className="blog-details">
            <h1>{blog.title}</h1>
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-meta">
                <p>Published on {new Date(blog.publishedDate).toLocaleDateString()} | {blog.readtime}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} /> {/* Render blog content */}
        </div>
    );
};

export default BlogDetails;
