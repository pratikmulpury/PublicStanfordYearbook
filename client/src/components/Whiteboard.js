import React, { Component } from "react";
import Toolbar from './Toolbar'
import Canvas from './Canvas.js'

import { BsFillExclamationDiamondFill as ErrorIcon } from 'react-icons/bs'


const LOADING = 0;
const SUCCESS = 1;
const FAILURE = -1;

class Whiteboard extends Component {

  constructor(props){
    super(props)

    this.state = {status: LOADING};  //status takes three values

    this.name = '';
    this.img = '';

    this.canvas = React.createRef();

    this.isDesktop = props.isDesktop
    this.isMobile = props.isMobile

    // unlocks my canvas features like deleting comments but disables creating new ones
    //
    // whiteboard can currently come two ways. Frome home/yourpage or page/:id
    // Set isMyCanvas accordingly. This is just client side changes. 
    // Any adding/deleting comment shall be authorized with tokens

    const url = window.location.pathname
    const userString = localStorage.getItem('yearbookUser')

    this.path = url //store this so that whiteboard knows which page we are on
    
    this.id = url.substring(url.lastIndexOf('/')+1)

    if(url === '/home/yourpage'){

      //set it to true cause it doesnt matter in yourpage (no editting required).
      this.isMyCanvas = true; 
      this.isEditable = false;

      //set this.id to user id cause yourpage doesnt display id
      this.id = JSON.parse(userString).userUID;

    } else {

      if(userString === null || userString === undefined) {

        this.isMyCanvas = false; //should be set to false if not logged in
        this.isEditable = false; // should be set to false if not logged in

      } else {

          const user = JSON.parse(userString);

          if(this.id === user.userUID){

            this.isMyCanvas = true;  //this should be true if I opened my page
            this.isEditable = true;  //this should be true if it is my page


          } else {

            this.isMyCanvas = false; // this should be false if it is not my page
            this.isEditable = true; // this should be true if it is not my page

          }

      }

    }

    this.onChangeTextSize = this.onChangeTextSize.bind(this)
    this.onChangeTextColor = this.onChangeTextColor.bind(this)

  }

  componentDidMount() {
    //do database check if id requested is valid
    this.isValidPage()
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.status === prevState.status)
        return;

    if(this.state.status === SUCCESS)
      this.props.showVisitPageButton();
    else
      this.props.hideVisitPageButton();
  } 

  async isValidPage() {

    // stop rerendering calls to server
    const details = JSON.parse(localStorage.getItem('yearbookPageDetails'))

    //if id is same as that of stored. Then there is no need to fetch
    if(details!=null && this.id === details.user.userUID) {
      this.updateState(SUCCESS,details)
      return;
    }

    // assume the worst
    let status = FAILURE

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id: this.id})
    };
    
    console.log('sending request')

    const response = await fetch('http://localhost:8000/page/details', request)
    const data = await response.json()
    
    const isValidPage = data.valid

    if(isValidPage === true){

      status = SUCCESS
      //need to do some caching here or too much load on server.
      localStorage.setItem('yearbookPageDetails', JSON.stringify(data));

    } else {
      status = FAILURE
    }  

    this.updateState(status,data);

  }

  updateState(status,data){

    this.name = data.user.firstName + ' ' + data.user.lastName
    //this.img = data.user.imgBlob

    this.setState({status: status})

  }


  onChangeTextSize = (size) => {
    this.canvas.current.setTextSize(size)
  }

  onChangeTextColor = (color) => {
    this.canvas.current.setTextColor(color)
  }

  render() {

    const Share = () => (
      <div className = "shadow-toolBar" style = {{ position: "fixed", zIndex: "100" , backgroundColor: "#00b4f5", borderRadius: "0.5vh", bottom: "3vh", right: "2vh", width: "10vh", height: "5vh" }}>
        <p style={{textAlign: "center", verticalAlign: "middle", lineHeight: "5vh", color: "#ffffff"}}>SHARE</p>
      </div>
    )

    const LoadingScreen = () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white">
        <img src="/gif/loading.gif" alt="Loading gif" style={{width: "10vh", height: "10vh"}}/>
      </div>
    )

    const CanvasScreen = () => (
      <>
        <Canvas ref = {this.canvas} isDesktop={this.isDesktop} isMobile ={this.isMobile} isMyCanvas = {this.isMyCanvas} isEditable = {this.isEditable} name={this.name} />
        <Toolbar showToolbar = {this.isEditable && !this.isMyCanvas} onChangeTextSize = {this.onChangeTextSize}  onChangeTextColor = {this.onChangeTextColor}/>
        {this.path !== '/home/yourpage' && <Share/>}
      </>
    )

    const FailedScreen = () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white">
        <ErrorIcon style={{fontSize: "10vh", color: "#c9c9c9", marginBottom: "3vh"}}/>
        FAILED TO LOAD PAGE
      </div>
    )

    return (
      <>
        {this.state.status === LOADING ? <LoadingScreen/> : this.state.status === SUCCESS ? <CanvasScreen/> : <FailedScreen/>}
      </>
    );
  }
}

export default Whiteboard;