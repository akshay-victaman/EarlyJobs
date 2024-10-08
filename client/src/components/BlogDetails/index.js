import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'; // Import the loader spinner
import './style.css';

const BlogDetails = () => {
    const { blogTitle } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [isLoadingRelatedBlogs, setIsLoadingRelatedBlogs] = useState(true);
    const [error, setError] = useState(null);

    // Loader component
    const renderLoader = () => (
        <div data-testid="loader" className="loader-container">
            <ThreeCircles color="#EB6A4D" height={50} width={50} />
        </div>
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Blog Page | EarlyJobs';

        // Fetch blog details by blog title
        const fetchBlog = async () => {
            try {
                console.log("Fetching blog with title: ", blogTitle);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/blogs/${blogTitle}`);
                setBlog(response.data);
            } catch (err) {
                setError('Failed to fetch blog details');
                console.error('Error fetching blog:', err);
            }
        };

        // Fetch related blogs
        const fetchRelatedBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/get-blogs`);
                console.log("Fetched related blogs:", response.data);

                // Access the blogs array from the response object
                const allBlogs = response.data.blogs;

                // Filter out the current blog and handle case-insensitivity
                setRelatedBlogs(allBlogs.filter(relatedBlog => relatedBlog.title.toLowerCase() !== blogTitle.toLowerCase()));
            } catch (err) {
                console.error('Error fetching related blogs:', err);
            } finally {
                setIsLoadingRelatedBlogs(false); // Stop loading after fetching
            }
        };

        if (blogTitle) {
            fetchBlog();
        }

        fetchRelatedBlogs(); // Fetch related blogs

    }, [blogTitle]);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!blog) {
        return renderLoader(); // Show loader while fetching blog details
    }

    return (
        <div className="blog-details-container">
            {/* Blog content */}
            <div className="blog-details-cont">
                <div className="blog-top-info">
                    <p>Admin</p>
                    <p>{new Date(blog.publishedDate).toLocaleDateString()} • {blog.readtime} Read</p>
                </div>

                <h1>{blog.title}</h1>
                <img src={blog.image} alt={blog.title} className="blog-image-cont" />

                <div className="blog-meta">
                    <p>Published on {new Date(blog.publishedDate).toLocaleDateString()} | {blog.readtime} Read</p>
                </div>

                <div dangerouslySetInnerHTML={{ __html: blog.content }} />

                {blog.keywords && blog.keywords.length > 0 && (
                    <div className="blog-keywords">
                        <h3>Keywords:</h3>
                        <div className="keyword-container">
                            {blog.keywords.map((keyword, index) => (
                                <span key={index} className="keyword">
                                    {keyword}
                                    {index < blog.keywords.length - 1 && ','} {/* Add comma between keywords */}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="related-blogs">
                <h3>Related Blogs</h3>
                {isLoadingRelatedBlogs ? (
                    renderLoader() // Show loader while fetching related blogs
                ) : relatedBlogs.length > 0 ? (
                    <div className="related-blogs-cards">
                        {relatedBlogs.map((relatedBlog) => (
                            <Link to={`/blogs/${relatedBlog.title}`} key={relatedBlog.id} className="related-blog-card">
                                <div className="related-blog-card-content">
                                    <h4>{relatedBlog.title}</h4>
                                    <p>{new Date(relatedBlog.publishedDate).toLocaleDateString()} • {relatedBlog.readtime} Mins Read</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No related blogs available</p>
                )}
            </div>
        </div>
    );
};

export default BlogDetails;
