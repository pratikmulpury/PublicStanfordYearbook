import React from "react";
import { BsCheck as OkayIcon } from "react-icons/bs"
import { RiCloseLine as CancelIcon } from "react-icons/ri"

function CreateComment(props) {

  const { color, size, text, position, onChangeText, onSave, onCancel } = props;

  const placeHolder = "Start your comment here ..."

  const onClick = e => {
    e.target.focus()
    e.stopPropagation();
  }

  const onChange = e => {
    onChangeText(e.target.value)
  }

  return (
    <div style={{ 
            position: "relative", 
            left: `calc(calc(100% * ${position.x}))`, 
            top: `calc(calc(100% * ${position.y}))`, 
            display: "inline-block", zIndex: 60 
          }}>
      <textarea 
                placeholder = {placeHolder}
                onClick={onClick} 
                onTouchEnd = {onClick} 
                onChange={onChange} 
                value={text ?? ''} 
                maxLength="400"
                style={{  
                  outline: 0,
                  WebkitUserSelect: "auto", 
                  height: "24vh", 
                  width: "40vh", 
                  borderRadius: "1.2vh", 
                  padding: "0.03vh", 
                  position: "relative", 
                  fontSize: size, 
                  color: color, 
                  resize: "none", 
                  border: "solid #c9c9c9 2px"
                }}/>
                <div>
                  <div style={{ float: "right", marginRight: "0.5vh", display: "flex", color: "white"}}>
                    <div
                         className = "flex items-center justify-center"
                         onClick={onSave} 
                         onTouchEnd = {onSave} 
                         style={{ 
                           height: "3.7vh", 
                           width: "3.7vh", 
                           marginRight: "5px", 
                           borderRadius: "50%", 
                           backgroundColor: "limegreen",
                    }}>
                      <OkayIcon/>
                    </div>
                    <div 
                         className = "flex items-center justify-center"
                         onClick={onCancel} 
                         onTouchEnd = {onCancel} 
                         style={{ 
                           height: "3.7vh", 
                           width: "3.7vh", 
                           borderRadius: "50%", 
                           backgroundColor: "red",
                         }}>
                      <CancelIcon/>
                    </div>
                  </div>
                </div>
    </div>
  );
}

export default CreateComment;
