import React from 'react'

const config = {
    google: {
        families: ['']
    }
}

function Photo(props) {

    const { size } = props;

    return (
        <div style={{overflow: "hidden", width: size, height: size, borderRadius: `calc(${size}/2)`}}>
            <img src="https://i1.wp.com/digital-photography-school.com/wp-content/uploads/2012/06/weak-ratio.jpg?resize=600%2C600&ssl=1" alt="new" style= {{width: "100%", height: "100%", fontFamily: "Josefin Sans"}} />
        </div>
    )
}

export default Photo