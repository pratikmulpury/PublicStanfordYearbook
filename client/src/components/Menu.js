import React from "react"
import Photo from "./Photo"
import { BsSearch as DiscoverIcon } from "react-icons/bs"
import { FaRegUserCircle as YourPageIcon} from "react-icons/fa"
import { AiOutlineBulb as InfoIcon } from "react-icons/ai"
import { FiSettings as ProfileIcon } from "react-icons/fi"



function Menu(props) {

    const {width, height, isDesktop, isMobile} = props

    //user name logic
    const userString = localStorage.getItem('yearbookUser');

    var firstName
    var lastName

    if(userString != null || userString!= undefined){
        const user = JSON.parse(userString);
        firstName = user.firstName;
        lastName = user.lastName;
    }

    // path routing logic
    const discoverPathname = '/home/discover'
    const yourpagePathname = '/home/yourpage'
    const profilePathname = '/home/profile'

    var currentPathName = null

    const location = window.location.pathname

    if(location === discoverPathname || yourpagePathname || profilePathname)
        currentPathName = location
    
    if(isMobile === true)
        currentPathName = null

    const ProfileTile = () => (
        <div className="w-full" style={{marginBottom: "2vh"}}>
            <div className="flex items-center justify-start h-full w-full" style={{padding: "3vh", borderBottom: "1.5px #c4c4c4 solid"}}>
                <Photo size={"6vh"}/>
                <>
                <div style = {{marginLeft: "2vh"}}>{firstName}<br></br>{lastName}</div>
                </>
            </div>
        </div>
    ) 

    const Info = () => (
        <div className='w-full h-auto' style={{outline: 0, marginTop: "2vh", marginBottom: "4vh", }}>
            <div className="flex items-center justify-start" style={{paddingLeft: "10%", paddingTop: "5%", paddingRight: "20%", color: "#a0a0a0", verticalAlign: "middle"}}>
            <>
                <InfoIcon style={{ width:"8vh", height: "8vh"}}/>
                <p style={{marginLeft: "5%", fontSize: "10pt", textAlign: "left"}}> Search for friends, acquaintances, classmates, or anyone you want to send a positive message to! </p>
            </>
            </div>
        </div>
    )


    const ButtonContent = (props) => (
        <div className="flex items-center justify-start" style={{ padding: "7%", paddingLeft: "20px",  color: "#a0a0a0", verticalAlign: "middle"}}>
            <>
                {props.url === discoverPathname ? <DiscoverIcon/> : props.url === yourpagePathname ? <YourPageIcon/> : <ProfileIcon/>}
                <div style={{marginLeft: "5%"}}> {props.text} </div>
            </>
        </div>
    )

    const NormalButton = (props) => (
        <button className='w-11/12 h-auto' onClick={() => window.location.href = props.url} style={{outline: 0, fontSize: "14pt"}}>
            <ButtonContent text={props.text} url={props.url}/>
        </button>
    )

    const HighlightedButton = (props) => (
        <button className='w-11/12 h-auto' onClick={() => window.location.href = props.url} style={{outline: 0, fontSize: "14pt", backgroundColor: "#ffffff", borderRadius: "0vh 1vh 1vh 0vh", borderLeft: "10px solid blue", boxShadow: "0px 0px 10px #C9C9C9"}}>
            <ButtonContent text={props.text} url={props.url}/>
        </button>
    )

    const Discover = () => (
        <div className='w-full h-auto'>
           {currentPathName === discoverPathname && <HighlightedButton text={'Discover'} url={discoverPathname} />}
           {currentPathName !== discoverPathname && <NormalButton text={'Discover'} url={discoverPathname} />}
        </div>
    )

    const YourPage = () => (
        <div className='w-full h-auto'>
           {currentPathName === yourpagePathname && <HighlightedButton text={'Your Page'} url={yourpagePathname}/>}
           {currentPathName !== yourpagePathname && <NormalButton text={'Your Page'} url={yourpagePathname}/>}
        </div>
    )

    const Profile = () => (
        <div className='w-full h-auto'>
           {currentPathName === profilePathname && <HighlightedButton text={'Profile'} url={profilePathname}/>}
           {currentPathName !== profilePathname && <NormalButton text={'Profile'} url={profilePathname}/>}
        </div>
    )

    return (
        <div className = "flex flex-col items-center justify-start" style={{width: width, height: height}}>
            {isMobile && <ProfileTile/>}
            {isDesktop && <Info/>}
            <Discover />     
            <YourPage />  
            <Profile />      
        </div>
    )
}

export default Menu