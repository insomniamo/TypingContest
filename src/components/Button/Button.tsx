import React from 'react'
import { buttontype, styleClasses } from "./type";
import "./button.scss"

interface ButtonProps {
    children?: React.ReactNode;
}

function Button({children, buttonText, onClickEvent, style = "simple"}: ButtonProps & buttontype) {
    const stylesArray = typeof style === 'string' ? [style] : style;

    const className = stylesArray.map((s) => styleClasses[s]).join(' ');

    return (
        <button onClick = {onClickEvent} className={`button ${className}`}>
            {children && (
                <div className='button__icon-wrapper'>
                {children}
            </div>
        )}
            {buttonText && (
            <div className='button__text'>
                {buttonText}
            </div>
        )}
        </button>
    )
}

export default Button