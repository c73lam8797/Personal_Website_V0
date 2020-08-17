import React, { useEffect, useRef, lazy, Suspense, useState } from 'react';
import './CSS/index.css';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from '@material-ui/core/Button';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Initial } from './Load';
const Home = lazy(() => import('./Home'));
const NavBar = lazy(() => import('./NavBar'));
const AboutMe = lazy(() => import('./AboutMe'));
const Contact = lazy(() => import('./Contact'));
const Socials = lazy(() => import('./Socials'));
const WhatIDo = lazy(() => import('./WhatIDo'));
const Photos = lazy(() => import('./Photos'));


function Main () {
    let scrollbar = useRef();
    let navbar = useRef();

    const [showVideo, handleShowVideo] = useState(true);
    const [isMobile, handleIsMobile] = useState(window.innerWidth < 500 ? true : false);

    useEffect (() => {
        window.addEventListener('resize', handleResize);
        handleResize();
    }, [])

    const handleResize = () => {
        if (window.innerWidth < 500) {
            handleIsMobile(true);
            handleShowVideo(false);
        }
        else {
            handleShowVideo(true);
            handleIsMobile(false);
        }
        setMargin();

    }

    const setMargin = () => {
        let a = document.getElementById("scrollbar");
        // let main = document.getElementById("main_content");
        let div = a.childNodes[0];
        if (a.scrollWidth - div.clientWidth !== 0) {
            div.style.marginRight = Math.abs(a.scrollWidth - div.clientWidth)*-1 + "px";
        }
    }

    const scrollUp = () => {
        scrollbar.current.scrollToTop();
    }

    return (
        <div className="main">
            <Suspense fallback={<Initial />}>
                
                <Scrollbars id="scrollbar" autoHide ref={e => {scrollbar.current = e;} }  noscrollx="true" universal
                    style={{ 
                        width: "100%", 
                        height: "100vh",
                        }} onScroll={() => navbar.current.scroll()}>

                    <NavBar ref={navbar} sb={scrollbar} showVideo={showVideo} handleShowVideo={handleShowVideo} isMobile={isMobile} />
                    <div className="main_content" id="main_content">
                        <Home showVideo={showVideo} isMobile={isMobile}/>
                        <div className="sub_content">
                            <AboutMe />
                            <WhatIDo />
                            <Photos />
                            <Contact />
       
                            <Button id="scrollTop" onClick={scrollUp} classes={{label: 'label'}}><FontAwesomeIcon icon={faAngleUp} /></Button>
                            <div className="placeholder_big"></div>
                            <div className="placeholder_big"></div>
                        </div>
                        {/* <div style={{width: "100%", height: "2000px"}}></div> */}
                    </div>
                    <Socials />
                </Scrollbars>
               
            </Suspense>
        </div>
    )
    
};

export default Main; 