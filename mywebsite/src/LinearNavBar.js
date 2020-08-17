import React, { useEffect } from 'react';
import './CSS/index.css';
import './CSS/header_footer.css';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';

export default function LinearNavBar ({sb, showVideo, handleShowVideo, showBar, hideNavBar, scrollFunction, isMobile}) {
    useEffect(() => {
        let navbar = document.getElementById("nb"); 
        navbar.addEventListener('mouseenter', hoverFunction);
        navbar.addEventListener('mouseleave', leaveFunction);

        // let backgroundColor = "#b7cfee";
        let backgroundColor = "#f7ba8e";
        
        document.querySelectorAll('.nav').forEach(item => {
            item.addEventListener('touchstart', function(){
                item.style.borderBottom= "2px solid white";
                item.style.color = backgroundColor
                setTimeout(()=>{
                    item.style.borderBottom = "none";
                    item.style.color = "white";
                }, 2000);  
            }, {passive: true});
            item.addEventListener('mouseenter', function(){
                item.style.borderBottom= "2px solid white";
                item.style.color = backgroundColor   
            });
            item.addEventListener('mouseleave', function(){
                item.style.borderBottom= "none";
                item.style.color = "white"  
            });
        }) 
    }, []);

    
    const handleChange = (e) => {
        if (e.target.checked) { handleShowVideo(true); }
        else { handleShowVideo(false); }
    }

    const hoverFunction = () => {
        let navbar = document.getElementById("nb"); 
        showBar(navbar);
    };

    const leaveFunction = () => {    
        scrollFunction();
    }
    
    const directories = ["home", "about", "whatido", "photos", "contact"];        
    return (
        <div className="NavBar">
            <ul id="nb">
                {directories.map((dir, index) => {
                    if (dir === "whatido") {
                        return (
                            <li key={index}><a className="nav" href = {`/#`+dir}>WHAT I DO</a></li>
                        )
                    }
                    else {
                        return (
                            <li key={index}><a className="nav" href = {`/#`+dir}>{dir.toUpperCase()}</a></li>
                        )
                    }
                })}
                <div id="switch_container">
                    <FormControlLabel style={{color: "white"}}
                                        labelPlacement="start"
                                        label={<FontAwesomeIcon icon={faPhotoVideo} size="1x" /> }
                                        id="toggle_background"
                                        control={
                                            <Switch checked={showVideo} 
                                                    size="small" 
                                                    classes={{root:'switch'}}
                                                    color="secondary"  
                                                    onChange={handleChange}/>} />
                </div>
            </ul> 
        </div> 
    )
}