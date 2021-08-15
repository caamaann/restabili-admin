import React from 'react';


const ButtonComponent = (props) => {
    return (
        <button id={props.id} type="button" className={props.class} onClick={props.click}>{props.text}</button>
    );
}

export default ButtonComponent;