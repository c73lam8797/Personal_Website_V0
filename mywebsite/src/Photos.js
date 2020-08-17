import React from 'react';
import Images from './Images';


import './CSS/photogallery.css';

import {
    art_dance,
    photography
} from './Media/export';

export default function Photos() {
    return (
        <div className="photos" id="photos">
            <div className="placeholder" />
            <h1>— PHOTOS —</h1>
            <h3 className="subtitle">Here are a few snips of my drawings/processes, dance media, and photos I've taken over the past few years! While the photo quality or edits may not be the best, I still think it's worthwhile to share how I see the world with everyone.</h3>
            <Images media={art_dance} 
                        name="art_dance" 
                        mediaId="ad"  
                        />
            <Images media={photography} 
                        name="photography" 
                        mediaId="photo" 
                        />
            <div className="placeholder"></div>
        </div>
    );
}