import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export function Initial() {
    return (
        <div style={{ 
        width: "100%", 
        height: "100vh", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        }}>
            <CircularProgress color="secondary" style={{
                zIndex: "999",
                // position: "relative",
                // top: "50%",
                // left: "50%",
                // transform: "translate(-50%, -50%)"
            }}/>
        </div>
    )
}

export  function BlackBar() {
    return (
        <div style={{width: "100%", height: "30px", backgroundColor: "black", opacity:"0.5", display: "flex", justifyContent:"center"}}>
            {/* <p style={{color: "white"}}>Loading...</p> */}
        </div>
    )
}

export function PhotoPlaceholder () {
    return ( 
        <div style={{width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center"}} >
            <CircularProgress color="secondary" />
        </div>
    )
}