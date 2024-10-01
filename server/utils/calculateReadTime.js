const CalculateReadTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = content.split(/\s+/).length; // Split the content by spaces to count words
    const readTime = Math.ceil(words / wordsPerMinute); // Calculate the reading time in minutes
    return readTime;
};

module.exports=CalculateReadTime