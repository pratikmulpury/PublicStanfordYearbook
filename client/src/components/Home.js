import React from 'react';
import Menu from './Menu';
import {Switch, Route, Redirect} from 'react-router-dom'
import Discover from './Discover';
import YourPage from './YourPage';
import Profile from './Profile';

function Home(props) {

    const { isDesktop, isMobile } = props

    const RouteLogic = () => (
        <Switch>
            <Route path="/home/discover" render={(props) => <Discover {...props} isDesktop={isDesktop} isMobile ={isMobile}/> }/>
            <Route path="/home/yourpage" render={(props) => <YourPage {...props} isDesktop={isDesktop} isMobile ={isMobile}/> }/> 
            <Route path="/home/profile" render={(props) => <Profile {...props} isDesktop={isDesktop} isMobile ={isMobile}/> }/> 
            <Redirect exact from="/home" to="/home/discover"/>
            <Redirect exact from="/home/:unknown" to="/home/discover"/>
        </Switch> 
    )

    const DesktopHome = () => (
        <div className="bg-white w-full h-auto flex flex-col items-center" style={{backgroundColor: "#f6f6f6"}}>
            <div className="w-full flex">   
                <div style={{width: "20%", minHeight: "calc(100vh - 64px)", borderRight: "1px solid #848484", backgroundColor: "#f6f6f6"}}>
                    <Menu width={"100%"} height={"100%"} isDesktop={isDesktop} isMobile = {isMobile}/>
                </div>
                <RouteLogic/>
            </div>
        </div>
    )

    const MobileHome = () => (
        <RouteLogic/>
    )

    return (
        <>
            {isDesktop && <DesktopHome/>}
            {isMobile && <MobileHome/>}
        </>
    );
}

export default Home;