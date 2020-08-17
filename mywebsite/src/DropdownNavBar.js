import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import './CSS/index.css';
import './CSS/header_footer.css';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';

export default function DropdownNavBar ({sb, showVideo, handleShowVideo, clicked, handleClick, hideDropdownBar, hideDropdownMenu, showBar, scrollFunction, isMobile}) {

    useEffect(() => {
        let navbar = document.getElementById("placeholderBar"); 
        navbar.addEventListener('touchstart', scrollFunction, {passive: true})
        navbar.addEventListener('mouseenter', hoverFunction);
        navbar.addEventListener('mouseleave', leaveFunction);
    });

    useEffect(() => {
        const dropdown = document.getElementById("drop_nb");
        hideDropdownMenu(dropdown);
    }, []);
    
    const handleChange = (e) => {
        if (e.target.checked) { handleShowVideo(true); }
        else { handleShowVideo(false); }
    }

    const hoverFunction = () => {
        if (!clicked) {
            if (document.body.contains(document.getElementById('placeholderBar'))) { 
                let navbar = document.getElementById("placeholderBar"); 
                showBar(navbar);
            } 
        }
    };

    const leaveFunction = () => {    
        if (!clicked) {
            scrollFunction();
        } 
    }

    function dropdown () {
        handleClick(!clicked);
        const dropdown = document.getElementById('drop_nb');
        const header = document.getElementById("placeholderBar");
        if (dropdown.style.visibility === "hidden") {
            dropdown.style.visibility = "visible"
            dropdown.style.transition = "opacity 0.5s ease-in"
            dropdown.style.opacity = 1;

            header.style.opacity = 1;
            header.removeEventListener('mouseenter', hoverFunction);
            header.removeEventListener('mouseleave', leaveFunction);
            header.removeEventListener('touchstart', scrollFunction, {passive: true})
        }
        else {
            hideDropdownMenu(dropdown);
            scrollFunction();
        }
    }


    const directories = ["home", "about", "whatido", "photos", "contact"];

    return (
        <div className="DropNavBar" id="DropNavBar">
            <div id="placeholderBar">
                <div style={{display: "inline-block", position:"relative"}}> 
                    <button id="toggle" onClick={dropdown}>
                        {clicked? 
                        <FontAwesomeIcon icon={faWindowClose} size="1x" /> :
                        <FontAwesomeIcon icon={faAlignJustify} size="1x" />}
                    </button>
                </div>
                {isMobile? null :
                <div id="switch_container" >
                    <FormControlLabel style={{color: "white"}}
                                        labelPlacement="start"
                                        label={<FontAwesomeIcon icon={faPhotoVideo} size="1x" /> }
                                        id="toggle_background"
                                        control={
                                            <Switch checked={showVideo} 
                                                    size="small" 
                                                    classes={{root:'switch'}}
                                                    color="secondary"  
                                                    onChange={handleChange}/>}  />
                    
                </div>
                }    
            </div>
            <ul id="drop_nb">
                {directories.map((dir, index) => {
                    if (dir === "whatido") {
                        return (
                            <li key={index}><a href = {`/#`+dir}>WHAT I DO</a></li>
                        )
                    }
                    else {
                        return (
                            <li key={index}><a href = {`/#`+dir}>{dir.toUpperCase()}</a></li>
                        )
                    }
                })}
            </ul>
        </div>
    )
}