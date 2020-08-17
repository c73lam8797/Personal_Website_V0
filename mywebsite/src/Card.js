import React from 'react'

export default function Card({header, body}) {
    return (

        <div className={`card ${header==="" ? "front" : "back"}`}>
            {header==="" ? null : <h3 className="cardHeader">{header}</h3>}
            {body.map((text, index) => {
                if (typeof(text) === 'string') {
                    return (<p key={index}>{text}</p>)
                }
                else {
                    return text;
                }
            })}
        </div>
    )
}