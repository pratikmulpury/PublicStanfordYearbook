import React from 'react';

function StyledInput(props) {
    return (
        <div className={props.className}>
            <input placeholder={props.placeholder} value={props.value} onChange={props.onChange} type={props.type ?? 'text'}
                   className="shadow-input bg-white rounded w-full" style={{padding: "2vh", color: "#000000", outline: "1px solid #c9c9c9"}}/>
            {props.error === true && <p className="text-red text-sm mt-2 px-2">This is a required field</p>}
        </div>
    );
}

export default StyledInput
