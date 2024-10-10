import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'; 
import './style.css';

const BlogDetails = () => {
    const { blogTitle } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [isLoadingRelatedBlogs, setIsLoadingRelatedBlogs] = useState(true);
    const [error, setError] = useState(null);
    
    const renderLoader = () => (
        <div data-testid="loader" className="loader-container">
            <ThreeCircles color="#EB6A4D" height={50} width={50} />
        </div>
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Blog Page | EarlyJobs';

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
                const allBlogs = response.data.blogs;
                setRelatedBlogs(allBlogs.filter(relatedBlog => relatedBlog.title.toLowerCase() !== blogTitle.toLowerCase()));
            } catch (err) {
                console.error('Error fetching related blogs:', err);
            } finally {
                setIsLoadingRelatedBlogs(false); 
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
        return renderLoader(); 
    }

    return (
        <div className="blog-details-container">
            <div className="blog-details-cont">
                <div className="blog-top-info">  
                    <img src="/early-jobs-logo2.png" alt="website logo" className='blog-logo'/>
                    <div className="blog-content">
                        <p className='admin-title'>Admin</p>
                        <p>
                            {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).replace(',', '-')} • {blog.readtime} Read
                        </p>

                    </div>
                </div>


                <h1 className='blog-details-title'>{blog.title}</h1>
                <img src={blog.image} alt={blog.title} className="blog-image-cont" />
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
                <h3 className='related-blogs-heading'>Related Blogs</h3>
                {isLoadingRelatedBlogs ? (
                    renderLoader() // Show loader while fetching related blogs
                ) : relatedBlogs.length > 0 ? (
                    <div className="related-blogs-cards">
                        {relatedBlogs.map((relatedBlog) => (
                            <Link to={`/blogs/${relatedBlog.title}`} key={relatedBlog.id} className="related-blog-card">
                                <div className="related-blog-card-content">
                                    <h4 className='realted-content-title'> {relatedBlog.title}</h4> 
                                    <div className='related-cont'>
                                    <img src="/early-jobs-logo2.png" alt="website logo" className='blog-logo'/>
                                    <div className='realted-content-logo-cont'>
                                    <p className='admin-title'>Admin</p>
                                    <p>
                                        {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: '2-digit'
                                        }).replace(',', '-')} • {blog.readtime} Read
                                    </p>
                                    </div>
                                    </div>
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
