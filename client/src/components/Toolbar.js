import React from "react"

const { useState } = React

function Toolbar(props){

    const { showToolbar, onChangeTextSize, onChangeTextColor } = props

    const colorChoices = ["#09b4f4", "#ff6173", "#ffd83c", "#3cd3c5", "#000000"]
    const sizeChoices = ["3.1vh", "2.6vh", "2.1vh"]

    const [textPaletteFlag, setTextPaletteFlag] = useState(false);
    const [colorPaletteFlag, setColorPaletteFlag] = useState(false);
    const [currentColor, setCurrentColor] = useState("#000000");
    const [currentSize, setCurrentSize] = useState("16pt");

    const TextButton = ({ size }) => (
        <button style={{ outline: "None", textAlign: "center", verticalAlign: "middle", fontSize: size}} >
            <p>Aa</p>
        </button>
    )

    const TextPalette = () => (
        <div className = "flex items-center justify-around" style = {{ position: "fixed", bottom: "11vh", left: "9vh", width: "15vh", height: "6vh" }}>
            {sizeChoices.map( (size,i) => ( <TextOptions key={"size"+i} index={i} size={size}/> ))}
        </div>
    )

    const TextOptions = ({ index, size }) => (
        <div onClick = {() => changeTextSize(index)} onTouchEnd = {() => changeTextSize(index)} style={{ marginTop: `calc(calc(calc(18pt - ${size})/2) + 0.5vh)`, textAlign: "center", fontSize: size}}>
            Aa
        </div>
    );

    const openTextPalette = () => {
        setTextPaletteFlag(!textPaletteFlag)
        setColorPaletteFlag(false)
    }

    const changeTextSize = (index) => {
        setTextPaletteFlag(false)
        onChangeTextSize(sizeChoices[index]);
        setCurrentSize(sizeChoices[index]);
    }

    const Line = () => (
        <div style={{ width: "5vh", border: "solid #A0A0A0 1px", backgroundColor: "#A0A0A0" }}/>
    );

    const ColorButton = ({ color }) => (
        <button style={{ outline: "None", width: "4vh", height: "4vh", borderRadius: "2vh", backgroundColor: color }}/>
    );

    const ColorPalette = () => (
        <div className = "flex items-center justify-around" style = {{ position: "fixed", bottom: "3vh", left: "9vh", width: "24vh", height: "6vh" }}>
            {colorChoices.map( (color,i) => ( <ColorOptions key={"color"+i} index={i} color={color}/> ))}
        </div>
    )

    const ColorOptions = ({ index, color }) => (
        <div onClick={() => changeTextColor(index)} onTouchEnd = {() => changeTextColor(index)} style={{ width: "4vh", height: "4vh", borderRadius: "2vh", backgroundColor: color }}/>
    );

    const openColorPalette = () => {
        setColorPaletteFlag(!colorPaletteFlag)
        setTextPaletteFlag(false)
    }

    const changeTextColor = (index) => {
        setColorPaletteFlag(false)
        onChangeTextColor(colorChoices[index]);
        setCurrentColor(colorChoices[index]);
    }

    return (
        <>
            {showToolbar === true && (
                <div style={{zIndex: "100"}}>
                    <div className = "shadow-toolBar" style = {{ position: "fixed", borderRadius: "0.5vh", backgroundColor: "#ffffff", boxShadow: "3vh #9E9E9E", bottom: "3vh", left: "2vh", width: "6vh", height: "14vh" }}>
                        <div className = "flex flex-col items-center justify-center w-full h-full">
                            <div onClick = {openTextPalette} className = "flex flex-col items-center justify-center" style={{flex: "0 0 6vh"}}>
                                <TextButton size={currentSize}/>
                            </div>
                            <div className = "flex flex-col items-center justify-center" style={{flex: "0 0 2vh"}}>
                                <Line/>
                            </div>
                            <div onClick = {openColorPalette} className = "flex flex-col items-center justify-center" style={{flex: "0 0 6vh"}}>
                                <ColorButton color={currentColor} />
                            </div>
                        </div>
                    </div>
                    {textPaletteFlag === true && <TextPalette/>}
                    {colorPaletteFlag === true && <ColorPalette/>}
                </div>
            )}
        </>
    )
}

export default Toolbar