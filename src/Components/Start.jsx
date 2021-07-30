import React from 'react'
import { useRef } from 'react';

function Start({setUsername}) {

    const inputRef = useRef();

    const handleClick=()=>{
        setUsername(inputRef.current.value)
    }
    return (
        <>
              <div className="start">
                    <input
                        className="startInput"
                        placeholder="enter your name"
                        ref={inputRef}
                    />
                    <button className="startButton" onClick={handleClick}>
                        Start 🎺
                    </button>
             </div>
        </>
    )
}

export default Start
