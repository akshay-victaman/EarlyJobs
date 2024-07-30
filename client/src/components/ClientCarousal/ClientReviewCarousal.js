import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css';

const ClientReviewCarousel = ({ reviewCards }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1660 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1600, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className="review-carousel-container">
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                customTransition="all 1s"
                arrows={true}
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {reviewCards.map((review, index) => (
                    <div key={index} className="reivew-item">
                        <img src={review.companyLogo} alt='company logo' draggable={false} className='carousal-review-logo' />
                        <p className="carousal-review-desc">{review.review}</p>
                        <div className="carousal-review-profile">
                            <img src={review.profileImage} alt='profile' draggable={false} className='carousal-review-profile-image' />
                            <div className="review-profile-details">
                                <h3 className="review-name">{review.name}</h3>
                                <p className="review-role">{review.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ClientReviewCarousel;
