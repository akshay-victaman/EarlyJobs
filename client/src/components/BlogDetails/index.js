import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const BlogDetails = () => {
    const { id } = useParams(); // Get the blog ID from URL params
    const [blog, setBlog] = useState(null); // Blog details state
    const [recommendedBlogs, setRecommendedBlogs] = useState([]); // Recommended blogs state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top on load
        document.title = 'Blog Page | EarlyJobs'; // Set the document title

        const fetchBlogDetails = async () => {
            try {
                console.log(`Fetching blog details for ID: ${id}`); // Debugging log
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/get-blog/${id}`);
                console.log('Blog details fetched:', response.data); // Debugging log
                setBlog(response.data.blog); // Assuming the blog object is in `response.data.blog`
            } catch (err) {
                setError('Failed to fetch blog details');
                console.error('Error fetching blog details:', err); // Debugging log
            }
        };

        const fetchRecommendedBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/get-blogs`);
                setRecommendedBlogs(response.data.blogs); // Assuming the recommended blogs are in `response.data.blogs`
            } catch (err) {
                console.error('Error fetching recommended blogs:', err); // Debugging log
            }
        };

        fetchBlogDetails();
        fetchRecommendedBlogs();
    }, [id]);

    if (error) {
        return <p className="error-message">{error}</p>; // Display error message if API call fails
    }

    if (!blog) {
        return <p>Loading blog details...</p>; // Display loading state if blog data is not yet available
    }

    return (
        <div className="privacy-policy-page">
            <div className="privacy-policy-page__background">
                <h1 className='privacy-policy-heading'> Blogs</h1> 
            </div> 
            <div className="blog-detail-page">
                <div className="blog-detail-content">
                    <h1>{blog.title}</h1> {/* Render the blog title */}
                    <img src={blog.image} alt={blog.title} className="blog-detail-image" /> {/* Render the blog image */}
                    <p>{blog.description}</p> {/* Render the blog description */}
                </div>
                <div className="blog-sidebar">
                    <img src="/path/to/constant-image.jpg" alt="Constant" className="constant-image" />
                    <div className="recommended-blogs">
                        <h3>Recommended Blogs</h3>
                        {recommendedBlogs.map((recommendedBlog) => (
                            <div key={recommendedBlog.id} className="recommended-blog">
                                <h4>{recommendedBlog.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
