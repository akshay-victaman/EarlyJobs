import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'; 
import './BlogPage.css';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Blog Page | EarlyJobs';

        const fetchBlogs = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/get-blogs`);
                setBlogs(response.data.blogs);
            } catch (err) {
                setError('Failed to fetch blogs');
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false); 
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
                <h1>Unlocking Career Opportunities: Insights from EarlyJobs</h1>
                <p>Expert Tips and Success Stories to Help You Navigate the Job Market.</p>
            </div>

            {error && <p className="error-message">{error}</p>}

            {loading ? ( 
                <div className="loading-container">
                     <Oval
                         visible={true}
                         height="20"
                         width="20"
                         color="#ffffff"
                         strokeWidth="4"
                         ariaLabel="oval-loading"
                         wrapperStyle={{}}
                         secondaryColor="#ffffff"
                         wrapperClass=""
                     />
                </div>
            ) : (
                <div className="blog-grid">
                    {blogs.map((blog) => (
                        <div className="blog-card" key={blog.id || blog._id}> 
                            <Link to={`/blogs/${encodeURIComponent(blog.title)}`}> 
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
            )}
        </div>
    );
};

export default BlogPage;
