import React, { useEffect, useState } from 'react';
import pdf from './Media/Charmaine_Lam_Resume.pdf'
import Button from '@material-ui/core/Button';
import { Toast } from 'react-bootstrap';
import './CSS/index.css'
import './CSS/contact.css'

export default function Contact () {
    const [emailCopied, setEmailCopied] = useState(false);

    useEffect(() => {
        const icons = document.getElementsByClassName("contact_buttons");
        Array.from(icons).forEach(icon => {
                icon.addEventListener('click', handleTouch, {passive: true});

        })
    }, []);

    const color = "#f7ba8e";

    const handleTouch = (e)=> {
        let icon = e.target;
        if (!icon.classList.contains("contact_buttons")) {icon = e.target.parentElement; }
        icon.style.backgroundColor = color;
        setTimeout(()=>icon.style.backgroundColor="transparent", 2000);
    };

    
    const copyEmail = (e) => {  
        let temp = document.createElement("input")
        temp.setAttribute("type", "text");
        temp.setAttribute("value", document.getElementById("email").value);
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        setEmailCopied(true);
        document.body.removeChild(temp);
    }

    return (
        <div className="contact" id="contact">
            <div className="placeholder"></div>

            <div className = "content">
                <h1 id="title">— CONTACT —</h1>
                <h3 className="subtitle">Let's connect!</h3>
                <h3 className="subtitle">I am always looking to create new <span className="color">relationships</span>, whether it's for a bubble tea (or coffee) chat or an opportunity to collaborate <span role="img" aria-label="smile">{'\u00A0'}🙂</span></h3>
                <h3 className="subtitle">I am best reached through email or a message on LinkedIn.</h3>

                <div className="contact_info"> 
                    <div id="info">
                        {/* <p id="email">
                        <FontAwesomeIcon style={{marginRight: "10px", marginBottom:"-10px"}} icon = {faEnvelope} size="3x" />
                        c73lam@uwaterloo.ca</p>    */}
                        <p style={{marginBottom: "0px", marginTop: "15px"}}>Click below to copy my email!</p>
                        <Button id="email" value="c73lam@uwaterloo.ca" onClick={copyEmail} classes={{label: 'email', root: 'contact_buttons'}}>c73lam@uwaterloo.ca</Button>
                        
                        <a href={pdf} target="_blank" rel="noopener noreferrer">
                            <Button id="resume" classes={{root: 'contact_buttons'}}>Download Resume</Button>
                        </a>
                        <Toast style={{color: "black", background: "white", borderRadius: "3px"}} show ={emailCopied} onClose={()=>setEmailCopied(false)} delay={2000} animation autohide>
                            Email Successfully Copied!
                        </Toast>
                     
                        {emailCopied? null : <div style={{height: "15px"}} />}
                    </div>
                </div>
            </div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
        </div>
    )
}