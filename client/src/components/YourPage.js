import React, {useState} from "react"
import Whiteboard from "./Whiteboard"

function YourPage (props) {

    const { isDesktop, isMobile } = props
    const [ showVisitPage, setShowVisitPage ] = useState(false);

    const openYourPage = () => {

        const userString = localStorage.getItem('yearbookUser');
        
        if(userString === null || userString === undefined) { //should never be true but sanity
        
            window.location.href = '/login'
        
        } else {

            //get user id and go to that page
            const user = JSON.parse(userString);
            const id = user.userUID;
            window.location.href = '/page/'+id;
        
        }
    }

    const showVisitPageButton = () => {
        setShowVisitPage(true);
    }

    const hideVisitPageButton = () => (
        setShowVisitPage(false)
    )

    const VisitPageButton = () => (
        <div 
            className = "shadow-toolBar" 
            style = {{ position: "absolute", bottom: "7%", right: "7%", backgroundColor: "#00b4f5", borderRadius: "0.5vh", width: "auto", height: "5vh", zIndex: 90}}>
            <button 
                onClick = {openYourPage}
                className="flex flex-col items-center justify-center"
                style={{
                    textAlign: "center", 
                    verticalAlign: "middle", 
                    lineHeight: "3vh", 
                    padding: "1vh", 
                    paddingLeft: "2vw", 
                    paddingRight: "2vw", 
                    color: "#ffffff",
                    fontSize: "8pt"
                }}>VISIT PAGE</button>
        </div>
    )

    const width = isDesktop === true ? "80%" : "100%"  

    return(
        <div className="flex flex-col items-center justify-center" style={{position: "relative", width: width, height: "calc(100vh - 64px)", backgroundColor: "#f6f6f6"}}>
            <div className="shadow-toolBar overflow-hidden flex flex-col items-center justify-center" style={{position: "absolute", width: "90%", height: "90%", borderRadius: "2vh"}}>
                <div style={{width: "102%", height: "102%"}}>
                    <Whiteboard isDesktop={isDesktop} isMobile ={isMobile} isEditable={false} isMyCanvas={false} showVisitPageButton={showVisitPageButton} hideVisitPageButton={hideVisitPageButton}/>
                </div>
            </div>
            {showVisitPage && <VisitPageButton/>}
        </div>
    )

}

export default YourPage