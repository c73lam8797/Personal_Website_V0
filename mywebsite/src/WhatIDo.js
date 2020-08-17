import React, { useEffect } from 'react'; 
import Card from './Card';
import './CSS/index.css';
import './CSS/whatido.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHeartbeat, faPalette, faCompass, faProjectDiagram, faUsers } from '@fortawesome/free-solid-svg-icons';


export default function WhatIDo() {
    useEffect(()=> {
        Array.from(document.getElementsByClassName("column")).forEach(col => {

            col.addEventListener('click', function() {
                if (col.classList.contains("col_active")) {
                    col.classList.remove("col_active");
                }
                else {
                    col.classList.add("col_active");
                }
            })
        })
    }, [])

    const tech_front = {
        header: "" ,
        body: [<FontAwesomeIcon className="card_face" icon={faCode} size="5x"/>]
    }
    const tech_back = {
        header: "Technology",
        body: [
            "I code — I know C++, C#, Python, TypeScript, JavaScript, HTML, CSS. So far, I have done most on my work on technologies such as React, LINQ, Node, Blazor Web Assembly, ASP.NET Core, SQL Server, and Entity Framework with a focus in web development. I have also used Tensorflow to dabble in machine learning - some of the things I've worked on include: experimenting with different sequence to sequence models to build a chatbot and using image classification to recognize cells infected with Malaria.",
            "Currently, I am co-leading an engineering design team to devise an Arduino based project that assists with gait retraining for people with Parkinson's disease."
        ]
    }
    const tech=[tech_front, tech_back];

    const dance_front = {
        header: "" ,
        body: [<FontAwesomeIcon className="card_face" icon={faHeartbeat} size="5x"/>]
    }
    const dance_back = {
        header: "Dance",
        body: [
            "I've danced competitively since I was 8 years old in various genres. My favourite styles are acrobatics and contemporary (although I would love to get into hip-hop). At 14, I competed with Team Canada at the World Championships in Germany, and brought home a bronze medal.",
            "Why dance? — I dance because it has not only taught me to persevere and be resilient, but also how to tell stories and express myself in a way that is unique to me. Oh and also, nothing replicates the feeling of being on stage and doing what you love."
        ]
    }
    const dance=[dance_front, dance_back];


    const art_design_front = {
        header: "" ,
        body: [<FontAwesomeIcon className="card_face" icon={faPalette} size="5x"/>]
    }
    const art_design_back = {
        header: "Art + Design",
        body: [
            "I draw, I guess. Though I've acquired a liking for black and white pencil sketches, I have explored with mediums such as watercolour, ink, and charcoal. Nowadays, I don't have much time to do much art, so I make my school notes visually elaborate to satisfy my desire to draw.",
            "For leisure, I've taken up photography and photo editing, and sometimes shoot short video clips.",
            "Fun fact: I'm self taught in both!"
        ]
    }
    const art_design = [art_design_front, art_design_back];

    const row1 = [tech, dance, art_design];




    const leadership_front = {
        header: "" ,
        body: [<FontAwesomeIcon className="card_face" icon={faCompass} size="5x"/>]
    }
    const leadership_back = {
        header: "Leadership",
        body: [
            "An alumnus of Vision Youth Leadership Program, I now give back to the program by volunteering as an Outdoor Leadership Coordinator. The work I do not only helps youth work towards their Duke of Edinburgh Awards, but emphasizes leadership development in an outdoor environment - I teach foundational survival skills, develop safety procedures, plan training schedules and lead multi-night expeditions."
        ]
    }
    const leadership = [leadership_front, leadership_back];


    const teaching_front = {
        header: "" ,
        body: [<FontAwesomeIcon className="card_face" icon={faUsers} size="5x"/>]
    }
    const teaching_back = {
        header: "Teaching and Mentorship",
        body: [
            "To me, education is one of the most powerful tools that exists.",
            "Though I'm not any Einstein, I actively try my best to share my experiences with others. Since I was 11, I've volunteered at my dance studio and have taught kids as young as 3 and as old as 15. I'm currently also reaching out to students to assist with ther preparation and transitioning to post-secondary, and hope to carry this act out into an official initiative."
        ]
    }
    const teaching = [teaching_front, teaching_back]

    const projects_front = {
        header: "" ,
        body: [<FontAwesomeIcon className="card_face" icon={faProjectDiagram} size="5x"/>]
    }
    const projects_back = {
        header: "Community Projects",
        body: [
            "One of the more notable projects I've done is planning and organizing a coffeehouse with 3 of my peers to teach high school students methods to cope with stress. Through artistic performances, guest speakers and activities, we were able to successfully reach out to 20+ students through this project. I've also been part of the MP's Youth Constituency Council to advocate and discuss solutions to issues local in my community, such as mental health and education."
        ]
    }
    const projects = [projects_front, projects_back];
    
    const row2 = [leadership, teaching, projects];

    return (
        <div className="whatido" id="whatido">
            <div className="placeholder"></div>

            <h1>— WHAT I DO —</h1>
            <h3 className="subtitle">Flip the cards to learn more!</h3>
            <div className="table">
                <h4 className="top">Creating is My </h4>
                <h2 className="bottom">PASSION</h2>
                <div className="row">
                    {row1.map((card,index) => {
                        return (
                            <div className="column" key={index}> 
                            {card.map(((face, i) => {
                                return <Card header={face.header} body={face.body} key={i}/>
                            }))}
                            </div>
                        )
                    })}
                </div>

                <h4 className="top">Leadership + Involvement in the</h4>
                <h2 className="bottom">COMMUNITY</h2>
                <div className="row">
                    {row2.map((card,index) => {
                        return (
                            <div className="column" key={index}>
                            {card.map(((face, i) => {
                                return <Card header={face.header} body={face.body} key={i}/>
                            }))}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="placeholder"></div>
        </div>    
    );
};