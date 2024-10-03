import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Blog Page | EarlyJobs';

        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/get-blogs`);
                setBlogs(response.data.blogs);
            } catch (err) {
                setError('Failed to fetch blogs');
                console.error('Error fetching blogs:', err);
            }
        };

        fetchBlogs();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="blog-page">
            <div className="blog-header">
                <h1>Discover New Perspectives on <br /> Professional Growth and Efficiency</h1>
                <p>Uncover valuable strategies to maximize your professional journey, <br/>   optimize time, and unlock opportunities for knowledge monetization.</p>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="blog-grid">
                {blogs.map((blog) => (
                    <div className="blog-card" key={blog.id || blog._id}> {/* Ensure unique key */}
                        <Link to={`/blogs/${encodeURIComponent(blog.title)}`}> {/* Encode title for the URL */}
                            <img src={blog.image} alt={blog.title} className="blog-image" />
                            <div className="blog-content">
                                <h2 id='blog-sub-title'>{blog.title}</h2>
                                <p className="blog-meta">
                                    {formatDate(blog.publishedDate)} | {blog.readtime}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
