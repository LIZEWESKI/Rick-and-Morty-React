import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./ScrollToTopButton.css"
const ScrollButton = () => {
    const [isAtTop, setIsAtTop] = useState(true);
    useEffect(() => {
        const checkScrollPosition = () => {
            if (window.scrollY === 0) setIsAtTop(true)
            else if (window.innerHeight + window.scrollY >= document.body.offsetHeight) setIsAtTop(false);
        };
        const handleScroll = () => {
            if (window.scrollY === 0) setIsAtTop(true)
            else if (window.innerHeight + window.scrollY >= document.body.offsetHeight) setIsAtTop(false); 
        };
        // Run initial check
        checkScrollPosition();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToPosition = () => {
        if (isAtTop) window.scrollTo({top: document.body.scrollHeight})
        else window.scrollTo({top: 0});
    };

    return (
        <button className="scroll-to-top__button" onClick={scrollToPosition}>
            {isAtTop ? <FaArrowDown/> : <FaArrowUp/> }
        </button>
    );
};

export default ScrollButton;
