import React, { useEffect, useState } from 'react';
import './CSS/photogallery.css';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';


export default function Gallery({media, mediaId, name, showSlideshow, changeShowSlideshow, maxHeight, calculateHeight}) {
    //this has to be a state because it bugs out otherwise :)
    let [slideshowMedia, changeImg_array] = useState([...media.map(item => {
        return (React.cloneElement(item,  {onLoad: () => calculateHeight()}));
    })]);
    const [expanded, changeExpanded] = useState(false);

    useEffect(()=> {
        calculateHeight();
        if (!expanded) {
            setHeight();
        }
    })


    const setHeight = () => {
        let imgs = document.getElementsByClassName(mediaId);

        let doneLoading = false;
        Array.from(imgs).forEach(img => {
            if (img.complete) { doneLoading = true; }
            else { doneLoading = false};
        })

        if (doneLoading) {
            const expand = document.getElementById(`expand_${name}`);
            expand.style.maxHeight = maxHeight;
        }

    }
    
    useEffect(() => {
        hideGallery();
    },[showSlideshow])

    useEffect(()=> {
        if (document.body.contains(document.getElementById("gallery"))) {
            const imgs = Array.from(document.getElementsByClassName(mediaId));
            imgs.forEach ((item) => {
                item.style.maxHeight = "100%";
                item.style.objectFit = "contain";
                // item.style.borderRadius = "5px";
            })
        }
    })

    const createGallery = () => {
        let columns = [];

        let numCols = 4;
        let buffer = [];
        for (let i = 0; i<numCols; i++) {
            buffer.push([]);
        }

        let i =0;
        while (i<slideshowMedia.length) {
            for (let j = 0; j<numCols; j++) {
                buffer[j].push(slideshowMedia[i]);
                i++;
                if (i===slideshowMedia.length) {break;}
            }
        }

        for (let i = 0; i<buffer.length; i++) {
            columns.push(<div className="gallery_column">{buffer[i]}</div>);
        }

        return columns;
    }



    const handleClickExpand = ()=> {
        if ( expanded ) { hideGallery(); }
        else {  showGallery(); }       
    }

    const hideGallery = () => {
        if (!showSlideshow) {
            const expand = document.getElementById(`expand_${name}`)
            const overlay = document.getElementById(`overlay_${name}`);
            expand.style.maxHeight = maxHeight;
            expand.style.opacity = 0.5;
            overlay.style.opacity = 1;
            overlay.style.backgroundImage = "linear-gradient(0deg, rgba(196,196,196,0.5970763305322129) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)";
            changeExpanded(false);
        }
    }

    const showGallery = () => {
        if (!showSlideshow) {
            const expand = document.getElementById(`expand_${name}`)
            const overlay = document.getElementById(`overlay_${name}`);
            expand.style.maxHeight = expand.scrollHeight+"px";
            expand.style.opacity = 1;
            overlay.style.opacity = 0;
            overlay.style.backgroundImage = "none";
            changeExpanded(true);
        }
    }

   

    return ( 
        <div className="gallery">
            <div className="expand_container">
                <div className="expandable" id={`expand_${name}`}>
                <div className="overlay" id={`overlay_${name}`}></div>    
                    {createGallery()}
                </div>
                <div className="expand_button_container">
                    <Button variant="outlined" className="expand_button" value={`expand_${name}`} onClick={handleClickExpand}>
                        {expanded?
                        <FontAwesomeIcon style={{color: "white"}} icon={faAngleDoubleUp} size="2x" /> : 
                        <FontAwesomeIcon style={{color: "white"}} icon={faAngleDoubleDown} size="2x" /> }
                    </Button>
                </div>
            </div>
        </div>
    );   
};