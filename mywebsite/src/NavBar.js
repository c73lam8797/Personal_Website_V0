import React, { useState, useEffect, useImperativeHandle, forwardRef, lazy, Suspense } from 'react';
import './CSS/index.css';
import './CSS/header_footer.css';

// import DropdownNavBar from './DropdownNavBar';
// import LinearNavBar from './LinearNavBar';

import { BlackBar } from './Load';

const DropdownNavBar = lazy(()=>import('./DropdownNavBar'));
const LinearNavBar = lazy(()=>import('./LinearNavBar'));

const NavBar = forwardRef( 
    ({sb, showVideo, handleShowVideo, isMobile}, ref) => {
    const [resize, handleResize] = useState( window.innerWidth <= 1024 ? true:false);
    const [clicked, handleClick] = useState(false);

    useImperativeHandle(ref, () => ({
        scroll: () => {
            scrollFunction();
        }
    }));

    useEffect(()=> {
        scrollFunction();
    }, [resize])


    useEffect(() => {
        window.addEventListener('resize', resizeFunction);       

        return (()=> {
            window.removeEventListener('resize', resizeFunction);
        })
    });
    
    const showBar = (navbar) => {
        navbar.style.backgroundColor = "black";
        navbar.style.opacity=1;
    }

    const hideNavBar = (navbar) => {
        navbar.style.backgroundColor = "transparent";
        navbar.style.opacity=0.5;
    }

    const hideDropdownBar = (navbar) => {
        navbar.style.opacity=0.5;
    }

    const hideDropdownMenu = (dropdown) => {
        dropdown.style.backgroundColor = "black";
        dropdown.style.visibility="hidden";
        dropdown.style.opacity=0;
    }

    const scrollFunction = () => {
        let scrollUp = document.getElementById("scrollTop");

        let navbar;
        if(document.body.contains(document.getElementById('nb'))) {
            navbar = document.getElementById("nb");
            if (sb.current.getScrollTop() > 200) { showBar(navbar); }
            else { hideNavBar(navbar); }
        } 
        else if (document.body.contains(document.getElementById('placeholderBar'))) {
            navbar = document.getElementById("placeholderBar")
            if (sb.current.getScrollTop() > 200) { showBar(navbar); }
            else if (!clicked) { hideDropdownBar(navbar); }
        }

        if (sb.current.getScrollTop() > 200) {
            scrollUp.style.visibility = "visible";
            scrollUp.style.opacity = 1;
        }
        else {
            scrollUp.style.opacity = 0;
            scrollUp.style.visibility = "hidden";
            
        }
    };


    const resizeFunction = () => {
        handleClick(false);
        if(window.innerWidth <= 1024) {
            handleResize(true);
            if(document.body.contains(document.getElementById('drop_nb'))) {
                const dropdown = document.getElementById("drop_nb");
                hideDropdownMenu(dropdown);
            }
        }
        else {
            handleResize(false);
            scrollFunction();
        }
    }
    
    return (
        (resize || window.innerWidth <= 1024) ? 
        <Suspense fallback={<BlackBar />} >
            <DropdownNavBar 
                sb={sb}
                showVideo={showVideo}
                handleShowVideo={handleShowVideo}
                clicked={clicked}
                handleClick={handleClick}
                hideDropdownBar={hideDropdownBar} 
                hideDropdownMenu={hideDropdownMenu}
                showBar={showBar}
                scrollFunction={scrollFunction}
                isMobile={isMobile}/>
        </Suspense>: 
        <Suspense fallback={<BlackBar />}>
            <LinearNavBar
                sb={sb}
                showVideo={showVideo}
                handleShowVideo={handleShowVideo}
                showBar={showBar}
                hideNavBar={hideNavBar}
                scrollFunction={scrollFunction}
                isMobile={isMobile} />
        </Suspense>
    )
}); 

export default NavBar;