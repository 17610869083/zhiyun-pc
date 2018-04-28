import React from 'react';

export default function IconFont({type, className, style}) {
    const href = "#" + type;
    const myClassName = "anticon " + className;
    return (
            <svg className={myClassName} aria-hidden="true" style={style}>
                <use xlinkHref={href}></use>
            </svg>
    )
}