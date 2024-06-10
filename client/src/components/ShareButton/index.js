import React from "react";
import { RxShare2 } from "react-icons/rx";
import "./style.css";

function ShareButton({ title, text, url }) {
  
    async function shareContent(title, text, url) {
        try {
          await navigator.share({
            title,
            text,
            url,
          });
          console.log("Content shared successfully!");
        } catch (error) {
          console.error("Error sharing:", error);
        }
    }
    
    const handleShareClick = async () => {
        if (navigator.share) {
            await shareContent(title, text, url);
        } else {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <button className='job-item-share-btn' onClick={handleShareClick}>
            <RxShare2 className="share-icon" />
        </button>
    );
}

export default ShareButton;

