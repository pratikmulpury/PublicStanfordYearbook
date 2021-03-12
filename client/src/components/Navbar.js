import React from 'react'
import { FaBars } from 'react-icons/fa'
import GoogleLogout from 'react-google-login'
const loggedIn = false

function Navbar(props) {

    const {isDesktop, isMobile, toggleSidebar} = props
    
    const userString = localStorage.getItem('yearbookUser');

    var firstName
    var lastName

    if(userString != null || userString!= undefined){
        const user = JSON.parse(userString);
        firstName = user.firstName;
        lastName = user.lastName.charAt(0);
    }

    

    const resetLocalStorage = () => {
        localStorage.removeItem("yearbookLoginToken");
        localStorage.removeItem("yearbookUser")
        localStorage.removeItem("yearbookPageDetails")
        goToHome()
      }

    const goToHome = () =>{
        document.location.href = '/'
    }
    const goToDiscover = () =>{
        document.location.href = '/home/discover'
    }
    const logout = (event) => {
        if(window.gapi){
            const auth2 = window.gapi.auth2.getAuthInstance()
            if (auth2 != null) {
                auth2.signOut().then(
                    auth2.disconnect().then(resetLocalStorage())
                )
            }
        } else {
            resetLocalStorage()
        }
      }
      
    const login = (event) => {
        window.location.href = '/login'
    }

    const checkAuthenticationStatus = () => {
        const token = localStorage.getItem("yearbookLoginToken")
        // const loggedIn = someApiCall(token) why? can something unauthorized happen from here?
        let loggedIn = false;
        if(token){
          loggedIn = true;
        }
        return loggedIn;
       }
  
       const checkIfWhiteboard = () => {
            let location = window.location.href
            location = location.substring(location.lastIndexOf('/')+1)
            if(location === "mypage"){
                return true
            }
            return false;
       }
       
    

    const MobileNavbar = (
        <div className="h-16 w-full shadow-navBar bg-white flex-none flex object-contain justify-between px-3 z-50">
            <button className='text-grey4 w-8 h-8 my-auto ml-3' onClick={toggleSidebar} style={{outline: 0}}><FaBars/></button>
            <img src='/images/logo.png' className='object-contain h-4 my-auto mx-auto'/>
            <img src='/images/logo192.png' className='object-contain h-4 w-8 h-8 my-auto mr-2'/>
            {/* {checkAuthenticationStatus() ? 
            <div>
            <h1 className = "object-contain h-11 my-5 mx-4 text-grey4 font-extrabold "> Pratik Mulpury </h1>
            <button
                className="object-contain h-11 my-4 mx-4 text-grey4"
                onClick={logout}>
                Logout
            </button>
            </div>
            : <button className='text-grey4 my-auto mx-auto ' onClick={login}>Log In</button>} */}
        </div>
    )

    const Banner = () => (
        <p 
            style={{
                backgroundColor: "#ffbcc4", 
                padding: "0.5vh", 
                paddingLeft: "1.5vw",  
                paddingRight: "1.5vw", 
                borderRadius: "2vh",  
                marginRight: "3vw",
                color: "#ef0820",
                fontSize: "1vw" //keep it in terms of window width for responsive design
            }}>
            Closing after virtual graduation (6/14)
        </p>
    )

    const DesktopNavbar = (
        <div className="h-16 w-full shadow-navBar bg-white object-contain flex justify-around items-center px-6 z-50">
            <div className="flex-1">
            {
                checkIfWhiteboard() ? 
                <img src='/images/chevron-left.svg' onClick = {goToDiscover} className='object-contain h-6 my-2 mx-2'/>
                 : <img src='/images/logo192.png' className='object-contain h-12 my-2 mx-2'/>
            }
            </div>
            <div className="flex-1">
                <img src='/images/logo.png' className='object-contain h-4 my-auto mx-auto'/>
            </div>
            <div className="flex-1 flex items-center justify-between">
            <div><Banner/></div>
            {checkAuthenticationStatus() ? (
                <div className="flex flex-col items-end justify-center">
                    <p className = "object-contain h-1/2 text-grey4 font-extrabold " style={{maxWidth: "10vw", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{firstName} {lastName}.</p>
                    <button 
                        className="object-contain h-1/2 text-grey4"
                        onClick={logout}>
                        Logout
                    </button>
                </div>
            ) : ( 
                <button className='text-grey4 my-2 mx-2' onClick={login}>Log In</button>
            )}
            </div>
        </div>
    )

    return (
        <>
        {isDesktop && DesktopNavbar}
        {isMobile && MobileNavbar}
        </>
    );
}

export default Navbar;
