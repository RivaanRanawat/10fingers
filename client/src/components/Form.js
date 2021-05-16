import React, { useEffect, useRef, useState } from 'react'
import socket from '../socketConfig';

const Form = ({isJoin, isOver, gameID}) => {
    const [userInput, setUserInput] = useState("");
    const textInput = useRef(null);
    useEffect(() => {
        if(!isJoin) {
            textInput.current.focus()
        }
    }, [isJoin])
    
    const onChange = (e) => {
        const value = e.target.value;
        const lastChar = value.charAt(value.length - 1);
        // entered spacebar
        if(lastChar === " ") {
            socket.emit("userInput", {userInput, gameID})
            setUserInput("")
        } else {
            setUserInput(e.target.value);
        }
    }
    return (
        <div className="row my-3">
            <div className="col-sm"></div>
            <div className="col-sm-4">
                <form>
                    <div className="form-group">
                        <input type="text" readOnly={isJoin||isOver} onChange={onChange} 
                        value={userInput} ref={textInput} className="form-control"/>
                    </div>
                </form>
            </div>
            <div className="col-sm"></div>
        </div>
    )
}

export default Form
