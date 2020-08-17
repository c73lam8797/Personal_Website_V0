
import React, { useState, useEffect } from 'react'; 
import './CSS/index.css';
import './CSS/slideshow.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const Slideshow = ({media, name, mediaId}) => {
    const [isLoaded, changeLoaded] = useState(false);
    const [imgError, changeError]  = useState(false);
    
    const id = name; //name of the photo set
    const colName = name+"_col"; 
    const first = "first_"+name;
    const last = "last_"+name; 
    const prev_col = name+"_prev_col";
    const cur_col = name+"_cur_col";
    const next_col = name+"_next_col";
       

    const scroll = () => {
        if (document.body.contains(document.getElementById(prev_col)) 
        && document.body.contains(document.getElementById(cur_col) )) {
            const previous = document.getElementById(prev_col);
            const middle = document.getElementById(cur_col);
            const x = document.getElementById(id);


            let a = x.offsetWidth-previous.offsetWidth; //subtract viewing width - width of first col. 
            let b = Math.abs(middle.offsetWidth - a); //this is the amount the middle image shown w/o scrolling and how much you should scroll to see the middle image on the right
            let c = previous.offsetWidth; //the amount to scroll to scrollpast the prev col and show the middle image on the left

            //scroll to method doesn't work in edge
            x.scrollLeft = (b+c)/2;
        } 
    }

    function check (){
        let x = false;
        const imgs = Array.from(document.getElementsByClassName(mediaId));

        for (let i =1; i<4; i++) {
            x = imgs[i].complete;
        }
        changeLoaded(x);
        scroll();
    }

    //this has to be a state because it bugs out otherwise :)
    const [slideshowMedia,   changeImg_array]   = useState([...media.map(item => {
        return (React.cloneElement(item, {onLoad: () => check()}));
    })]);

    useEffect ( () => {
        window.addEventListener('resize', scroll);

        return (() => {
            window.removeEventListener('resize', scroll);
        })
    }, [])
    

    useEffect( () => {
        showDivs(0);

        const imgs = Array.from(document.getElementsByClassName(mediaId));
        if (!isLoaded) {
            imgs.forEach((img) => {
                img.style.visibility = "hidden";
            })
        }
        else {
            imgs.forEach((img) => {
                img.style.visibility = "visible";

                if (img.id !== "dance_vid") {
                    img.style.border = "2px solid white";
                }
                
                img.style.margin = "auto 10px";
            })
        }
        
        check();
    })

    useEffect ( () => {
        if(document.body.contains(document.querySelector(`.${mediaId}`))) {
            document.querySelectorAll(`.${mediaId}`).forEach(item => {
                item.addEventListener('error', function(){
                    item.src = "https://www.asap-utilities.com/screenshots/tools/en_us/0211-File-not-found.png";
                    item.alt = "oops! error :("
                    changeError(true);
            })
        })
    }}, [])

    const showDivs = (plus) => {
        check(); 
        const x = slideshowMedia.length;

        let all_img = document.getElementById(id);
        //if we move forwards, append the first element at the end
        if (plus === (1)) { all_img.appendChild(document.getElementById(first)); }
        //if we move backwards, append the last element at the beginning
        if (plus === (-1)) { all_img.insertBefore(document.getElementById(last), all_img.childNodes[0]); }


        let prevIndex = 1;
        let curIndex = 2;
        let nextIndex = 3; 

        let cols = document.getElementsByClassName(colName);

        for (let i =0; i<cols.length; i++) {
            //add buffer to everything and remove all ids before continuing
            if (!cols[i].classList.contains("buffer")) {
                cols[i].removeAttribute("id");
                cols[i].classList.add("buffer");
            }
            //remove buffer, add ids, and fix display for corresponding indices 
            if (i===prevIndex || i===curIndex || i===nextIndex) {
                cols[i].classList.remove("buffer");
                cols[i].style.display = "flex";
                if (i===prevIndex) { cols[i].id=prev_col; }
                if (i===curIndex)  { cols[i].id=cur_col;  }
                if (i===nextIndex) { cols[i].id=next_col; }
            }

            //finally modify display of buffer cols
            if (cols[i].classList.contains("buffer")) {
                cols[i].style.display = "none";
                cols[i].removeAttribute("id");
            }

            if (i===0) { cols[i].id = first; }
            if (i===x-1) {cols[i].id = last; }
        }

        if (document.getElementById("dance_vid").style.opacity !== 1) {
            document.getElementById("dance_vid").pause();
        }
        scroll();
    } 

    return (
        <div className="slideshow">  
            <div id="image_container">
            {isLoaded? null: <div style= {{position: "relative", top: "50%", height: "fit-content"}}><CircularProgress color="secondary" /></div>}
                <div id={id} >
                {slideshowMedia.map((img, index)=> {
                    return (<div className={`img_col buffer ${colName}`} key={index}>
                        {img}
                    </div>)
                })}
                </div>
                <div id="buttons">
                    <p>{imgError? 'Error Loading Image' : ''}</p>
                    <Button id="left_button" onClick={() => showDivs(-1)}>&#10094;</Button>
                    <Button id="right_button" onClick={() => showDivs(1)}>&#10095;</Button>
                </div>
            </div>
        </div>
    );
}

export default Slideshow;