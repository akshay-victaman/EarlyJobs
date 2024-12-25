import { useEffect } from "react";
import React from 'react';
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import './style.css';


const ScrollUp = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    const toggleVisibility = () => {
        if (window.scrollY > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    
    return (
        isVisible && 
        <div className='hiring-partner-go-to-top' onClick={scrollToTop}>
            <FaArrowUp className='hiring-partner-go-to-top-icon' />
        </div>
    );
}


export default ScrollUp;