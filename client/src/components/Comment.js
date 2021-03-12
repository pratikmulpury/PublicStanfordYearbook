import React from "react"

function Comment(props){
    const { commentIndex, commentId, commentText, commentX, commentY, commentColor, commentSize, openEditBox } = props
    //redux might help here. Comments are rerendered everytime someone types a letter.

    return (
        <p 
            onClick = {() => openEditBox(commentIndex)}
            onTouchEnd = {() => openEditBox(commentIndex)}
            id={commentId} 
            style={{ 
                position: "absolute", 
                left: `calc(calc(100% * ${commentX}))`, 
                top: `calc(calc(100% * ${commentY}))`, 
                resize: "vertical", 
                whiteSpace: "pre-wrap", 
                wordWrap: "break-word", 
                maxWidth: "40vh", 
                height: "auto", 
                fontSize: commentSize, 
                color: commentColor, 
                zIndex: 30, 
                margin: 0, 
                textOverflow: "ellipsis", 
                padding: "5px", 
                WebkitUserSelect: "none"
            }}>
            {commentText}
        </p>
    )
}

export default Comment