import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Sidebar from 'react-sidebar'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Whiteboard from './components/Whiteboard'
import Menu from './components/Menu' 
import CreateProfile from "./components/CreateProfile"


function Client() {

  const [sidebarFlag, setToggleSidebar] = useState(false)

  const isDesktop = useMediaQuery({ query: '(min-device-width: 1280px)' })
  const isMobile = useMediaQuery({ query: '(max-device-width: 1279px)' })

  const toggleSidebar = () => {
    setToggleSidebar(!sidebarFlag)
  }

  const checkAuthenticationStatus = () => {
    const token = localStorage.getItem("yearbookLoginToken")
    let loggedIn = true;

    if(token === null || token === undefined){
      loggedIn = false;
    }

    return loggedIn;
   }
  
  return (
    <Router>
        <Sidebar 
            sidebar={<Menu width={"50vw"} height={"100vh"} isDesktop={isDesktop} isMobile ={isMobile}/>}
            open={sidebarFlag}
            onSetOpen={toggleSidebar}
            styles={{ 
              sidebar: { background: "white", zIndex: 1000}, 
              overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999}
            }} >
            <div className='w-full h-screen bg-grey1 flex flex-col items-center'>
                <Navbar 
                    isDesktop={isDesktop} 
                    isMobile ={isMobile} 
                    toggleSidebar={toggleSidebar}/>
                <Switch>
                    <Route path = '/' exact component={Landing} />
                    <Route path = '/register' component={Register} />
                    <Route path = '/login' component={Login} />
                    {/* <Route path = '/home' component={Home} /> */}
                    <Route path="/page/:id" render={() => (
                      <Whiteboard isDesktop={isDesktop} isMobile ={isMobile} showVisitPageButton = {() => {}} hideVisitPageButton = {() => {}}/> //need to pass empty function here but yourpage needs this method
                    )}/>
                    <Route exact path="/profilecreation" render={() => (
                      !checkAuthenticationStatus() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <CreateProfile />
                      )
                    )}/>
                    <Route path="/home" render={() => (    //adding exact here will cause unauthorized access to home's subcomponents
                      !checkAuthenticationStatus() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <Home isDesktop={isDesktop} isMobile ={isMobile}  />
                      )
                    )}/>
                </Switch>
            </div>
        </Sidebar>
    </Router>
  );
}

export default Client;
