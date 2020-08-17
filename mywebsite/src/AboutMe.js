import React, { useState, useEffect } from 'react';
import './CSS/index.css';
import './CSS/aboutme.css';
import pic from './Media/profile_pic.jpg'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AboutMe() {
    const [isLoaded, changeLoaded] = useState(false);

    function check () {
        const img = document.getElementById("profile");
        let x = img.complete;
        changeLoaded(x);
    }

    useEffect(() => {
        if (document.body.contains (document.getElementById("profile"))) {
            let img = document.getElementById("profile");
            if (!isLoaded) {
                img.style.display = "none";
            }
            else {
                img.style.display = "block";
            }
        }   
        check();
    })

    return (
        <div className="about" id="about"> 
            <div className="placeholder"></div>

            <h1>— ABOUT ME —</h1>
            <div id="description">
                {isLoaded ? null : 
                <div style={{width: "30%", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>
                    <CircularProgress color="secondary"/>
                </div>}  
                <div id="image">
                    <div style={{position: "absolute", width: "450px", height: "300px" }} />        
                    <img
                        id = "profile"
                        src = {pic}
                        alt = "Profile"
                        border =  "2"
                        onLoad = {check}
                    /> 
                </div>
                <div id="text">
                    <p>Born Canadian and proudly Asian — my name is Charmaine and I am a Biomedical Engineering student pursuing an option in artificial intelligence at the University of Waterloo.</p>
                    <p>Here's a few things about me that I would like to share with you! </p>
                    <ul>
                        <li>I love to create. Whether it's building a prototype, putting together a visual on Photoshop, or emptying my ideas out into a sketch, I challenge myself to find ways to explore my creative ability.</li>
                        <li>My favourite colour is maroon.</li>
                        <li>I have a lot of interests. Perhaps too many. Software, robotics, visual art, dance, music, gymnastics, bouldering, yoga, tricking, food (as in eating...sometimes making it too), photography, hiking, canoeing, backpacking, reading — you name it.</li>
                        {/* <li>I believe education is one of the most important and powerful tools.</li> */}
                        <li>I am notorius for overthinking. At least I'm aware of it...but then I overthink about how much I overthink.</li>
                        <li>My goal is to ultimately drive change through innovation and creativity.</li>
                        <li>Popcorn chicken and bubble tea. Must I say more?</li>
                    </ul>
                </div>
            </div>
            <div className="placeholder"></div>
        </div>
    )
}