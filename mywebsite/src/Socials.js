import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './CSS/header_footer.css';

export default function Socials() {
    useEffect(() => {
        const backgroundColor = "#3e5d86";
        
        document.querySelectorAll('.social').forEach(item => {
            item.addEventListener('touchstart', function() {
                item.style.backgroundColor = backgroundColor;
                setTimeout(()=>item.style.backgroundColor="black", 2000);
            }, {passive: true})
            item.addEventListener('mouseenter', function() {
                item.style.backgroundColor = backgroundColor;
            });
            item.addEventListener('mouseleave', function() {
                item.style.backgroundColor = "black";
            });
        })
            
    });

    return (
        <div className="Socials">
            <ul>
                <li><a className="social" target="_blank" rel="noopener noreferrer" href = "https://www.github.com/c73lam8797"><FontAwesomeIcon icon={faGithub} size="2x" /></a></li>
                <li><a className="social" target="_blank" rel="noopener noreferrer" href = "https://www.linkedin.com/in/lam-charmaine/"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a></li>
            </ul>
        </div>
    );
};