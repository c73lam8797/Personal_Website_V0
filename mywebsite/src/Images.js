import React, { useEffect, useState, lazy, Suspense } from 'react';
import './CSS/photogallery.css';

import { PhotoPlaceholder } from './Load';

const Gallery = lazy(() => import('./Gallery'));
const MyCarousel = lazy (() => import ('./Carousel'));



export default function Images({media, name, mediaId}) {
    const [showSlideshow, changeShowSlideshow] = useState(window.innerWidth < 800 ? true: false);
    const [maxHeight, changeMaxHeight] = useState("500px");

    useEffect(() => {
        window.addEventListener('resize', resizeFunction);
        resizeFunction();

        return ( ()=> {
            window.removeEventListener('resize', resizeFunction);
        })
    }, [])

    useEffect(()=>{
        calculateHeight();
    })

    const resizeFunction = () => {
        if (window.innerWidth < 800) {changeShowSlideshow(true); }
        else { calculateHeight(); changeShowSlideshow(false);}
    }

    const calculateHeight = () => {
        if (document.contains(document.getElementById(`expand_${name}`))) {
            const expandable = document.getElementById(`expand_${name}`)
            const height = (expandable.scrollHeight/2) + "px";

            changeMaxHeight(height);
        }
    }

    return (
        <div>
            { (showSlideshow )? 
                <Suspense fallback={<PhotoPlaceholder />} >
                    <MyCarousel media={media} />
                </Suspense>
                :
                <Suspense fallback={<PhotoPlaceholder />} >
                    <Gallery media={media} 
                    mediaId={mediaId} 
                    name={name} 
                    showSlideshow={showSlideshow} 
                    changeShowSlideshow={changeShowSlideshow}
                    maxHeight={maxHeight} 
                    calculateHeight={calculateHeight}
                    />
                </Suspense>
            }
        </div>
    )
}