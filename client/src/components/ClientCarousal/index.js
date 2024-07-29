import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css';

const logos = [ 
    { src: '/client_logos/allsec.png', alt: 'Allsec Logo' },
    { src: '/client_logos/altrust.png', alt: 'Altrust Logo' },
    { src: '/client_logos/flipkart.png', alt: 'Flipkart Logo' },
    { src: '/client_logos/bb.png', alt: 'Big Basket Logo' },
    { src: '/client_logos/hdfc.png', alt: 'HDFC Logo' },
    { src: '/client_logos/shaadi.png', alt: 'Shaadi Logo' },
    { src: '/client_logos/hgs.png', alt: 'HGS Logo' },
    { src: '/client_logos/jindl.png', alt: 'Jindal Logo' },
    { src: '/client_logos/cogent.png', alt: 'Cogent Logo' },
    { src: '/client_logos/ebixcash.png', alt: 'Ebixcash Logo' },
    { src: '/client_logos/ecpl.png', alt: 'ECPL Logo' },
    { src: '/client_logos/genius.png', alt: 'Genius Logo' },
    { src: '/client_logos/starhealth.png', alt: 'Star Health Logo' },
    { src: '/client_logos/taurus.png', alt: 'Taurus Logo' },
    { src: '/client_logos/tp.png', alt: 'TP Logo' },
    { src: '/client_logos/qpoint1.png', alt: 'Qpoint1 Logo' },
];

const ClientCarousel = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 8
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 8
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className="client-carousel-container">
            <h2 className="client-carousel-heading">OUR CLIENTS</h2>
            <p className="client-carousel-desc">We go the extra mile for our customers!</p>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                customTransition="all 1s"
                arrows={false}
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {logos.map((logo, index) => (
                    <div key={index} className="logo-item">
                        <img src={logo.src} alt={logo.alt} draggable={false} className='carousal-logo' />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ClientCarousel;
