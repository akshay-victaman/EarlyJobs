import { Link } from 'react-router-dom';
import './style.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <img src="/page-not-found.avif" alt="not-found" className="not-found-image" />
            <h1 className="not-found-heading">Page Not Found</h1>
            <p className="not-found-text">
                we’re sorry, the page you requested could not be found
            </p>
            <Link to="/" className="go-to-home-button">
                Go to Home
            </Link>
        </div>
    );
}

export default NotFoundPage;