import React, { Component } from 'react'
import Photo from './Photo'
import CreateComment from './CreateComment'
import Comment from './Comment'

import panzoom from 'panzoom'

class Canvas extends Component {

    constructor(props){
        super(props);

        this.state = { 
            click: null, 
            editedText: null, 
            currentColor: "#000000", 
            currentSize: "2.6vh", 
            comments: [],
            editBoxCommentIndex: null,
            editBoxX: null,
            editBoxY: null,
            editBoxHeight: null
        }

        this.isDesktop = props.isDesktop
        this.isMobile = props.isMobile

        this.isMyCanvas = props.isMyCanvas //important check. hook it to backend
        this.isEditable = props.isEditable

        this.canvas = React.createRef();
        this.userContent = React.createRef();
        this.editBox = React.createRef();

        this.onSave = this.onSave.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onChangeText = this.onChangeText.bind(this)

        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)

        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)

        this.mouseDrag = 0;
        this.touchDrag = 0;

        this.openEditBox = this.openEditBox.bind(this)
        this.closeEditBox = this.closeEditBox.bind(this)
        this.deleteComment = this.deleteComment.bind(this)

        this.invalidBounds = []
    }

    componentDidMount(){

        const minZoom = this.isMobile === true ? 0.2 : 0.4

        panzoom(this.canvas.current, {maxZoom: 2, minZoom: minZoom})

        this.setupInvalidBounds();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.comments.length === prevState.comments.length)
            return;

        const count = this.state.comments.length - 1;
        const comment = document.getElementById("comment"+count)
        const bounds = comment.getBoundingClientRect();

        this.addInvalidBound(bounds);

    }

    setupInvalidBounds(){

        const bounds = this.userContent.current.getBoundingClientRect();
        this.addInvalidBound(bounds);

        for( var i = 0; i<this.state.comments.length; i++){
            const comment = document.getElementById("comment"+i)
            const bounds = comment.getBoundingClientRect();
            this.addInvalidBound(bounds);
        }
    }

    addInvalidBound(bounds){
        const width = bounds.right - bounds.left
        const height = bounds.bottom - bounds.top
        
        const canvasBounds = this.canvas.current.getBoundingClientRect()
        const canvasWidth = canvasBounds.right - canvasBounds.left
        const canvasHeight = canvasBounds.bottom - canvasBounds.top

        const x = (bounds.left - canvasBounds.left)/canvasWidth
        const y = (bounds.top - canvasBounds.top)/canvasHeight

        const widthRatio = width/canvasWidth;
        const heightRatio = height/canvasHeight;

        const minX = x
        const minY = y
        const maxX = x + widthRatio
        const maxY = y + heightRatio

        this.invalidBounds.push({minX: minX, minY: minY, maxX: maxX, maxY: maxY})
    }

    onSave(e) {
        this.pushComment()

        this.setState({click: null, editedText: null})
    };

    async pushComment() {

        //ignore blank comments;
        if(this.state.editedText === null || this.state.editedText === undefined || this.state.editedText === '')
            return;

        const token = localStorage.getItem('yearbookLoginToken')
        const user = JSON.parse(localStorage.getItem('yearbookUser'))
        const page = JSON.parse(localStorage.getItem('yearbookPageDetails'))

        //sanity checks
        if(user === null || user === undefined || page === null || page === undefined)
            return;

        const comment = {
            commenterUID: '',   //client should not set this. server verifies this based on token
            commenterName: '',  //client should not set this. server verifies this based on token
            boardOwnerUID: page.user.userUID,
            messageUID: '' + Date.now() + user.userUID + page.user.userUID, //this should be pretty unique
            messageContent: this.state.editedText,
            color: this.state.currentColor,
            size: this.state.currentSize,
            x: this.state.click.x,
            y: this.state.click.y
        }

        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token, comment: comment})
        };
    
        const response = await fetch('http://localhost:8000/auth/comment/', request)
        const data = await response.json()

        const message = data.comment;
        const success = data.posted

        if(success === true){
            this.setState({
                comments: [
                    ...this.state.comments, 
                    { 
                        commenter: message.commenterName,
                        text: message.messageContent,
                        x: message.x,
                        y: message.y,
                        color: message.color, 
                        size: message.size
                    }]
            })
        } else {

            //display popup or something here. TDL
            return;
        }
        
    }

    onCancel (e) {
        this.setState({ click: null, editedText: null })
        e.stopPropagation();
    };

    onChangeText (text) {
        this.setState({ editedText: text })
    };

    setTextColor(color) {
        this.setState({ currentColor: color});
    }

    setTextSize(size) {
        this.setState({ currentSize: size});
    }

    onMouseDown() {
        this.mouseDrag = 0;
    }

    onMouseMove() {
        if(this.mouseDrag < 5)  //a number to check how long mouse is held
            this.mouseDrag++;
    }

    onMouseUp(e) {
        if(this.mouseDrag < 5)  //make sure to check it with the number above
            this.onClick(e);
    }

    onClick (e) {

        if (this.state.click) 
            return;

        const bounds = this.canvas.current.getBoundingClientRect()
        const width = bounds.right - bounds.left
        const height = bounds.bottom - bounds.top

        var x = (e.clientX - bounds.left)/width
        var y = (e.clientY - bounds.top)/height

        this.checkBounds(x, y);  //subtract to get 0,0 of box
    };

    onTouchMove() {
        if(this.touchDrag < 15)
            this.touchDrag++;
    }

    onTouchEnd(e) {
        if(this.touchDrag < 15)
            this.onTouch(e)
        this.touchDrag = 0;
    }

    onTouch (e) {

        if (this.state.click) 
            return;

        var touchX = e.changedTouches[e.changedTouches.length-1].pageX;
        var touchY = e.changedTouches[e.changedTouches.length-1].pageY;

        const bounds = this.canvas.current.getBoundingClientRect()
        const width = bounds.right - bounds.left
        const height = bounds.bottom - bounds.top

        var x = (touchX - bounds.left)/width
        var y = (touchY - bounds.top)/height

        this.checkBounds(x, y); 
    };

    checkBounds(oldX,oldY) {

        //if not user then ignore clicks to create new comment
        if(this.isMyCanvas === true)
            return;

        //if not editable then ignore as well
        if(this.isEditable === false)
            return;

        //subtracting from points to get 0,0 for createComment with safety in order to make mouse click the center of canvas
        var x = oldX - 0.1
        var y = oldY - 0.07 
        const maxX = x + 0.2
        const maxY = y + 0.2

        //console.log(x,y,maxX,maxY)

        var isInteresecting = false;

        //check if collides with any comment or something.
        this.invalidBounds.forEach(bound => {
            // console.log(x,bound.maxX);
            // console.log(maxX,bound.minX);
            // console.log(y,bound.maxY);
            // console.log(maxY,bound.minY);
            if(x < bound.maxX && maxX > bound.minX && y < bound.maxY && maxY > bound.minY){
                isInteresecting = true;
                return;
            }
        });

        if(isInteresecting)
            return;


        if(x < -0.1 || y < -0.07 || x > 1.1 || y > 1.07) //too much out of bounds, probably didnt mean to comment
            return;

        if(x < 0.02)
            x = 0.02
        if(x > 0.78)
            x = 0.78
        if(y < 0.02)
            y = 0.02
        if(y > 0.85)
            y = 0.85

        this.setState({click: {x: x, y: y}})
    }

    openEditBox(i){

        //if not my canvas i will not have access to deletion
        if(this.isMyCanvas === false)
            return;

        //if already on another editbox please delete that first
        if(this.state.editBoxCommentIndex)
            return;

        //if for some reason it is invalid bounds, return (should not be the case)
        const bound = this.invalidBounds[i+1]; //i + 1 to skip first element added to invalid list which is not a comment
        if(bound == null)
            return;

        const x = bound.minX - 0.005 //padding
        const y = bound.minY - 0.035 //remove comment place
        const height = bound.maxY - bound.minY + 0.075 //add space for remove comment and the buttons
        this.setState({editBoxCommentIndex: i, editBoxX: x, editBoxY: y, editBoxHeight: height});


        //console.log(x,y,height);
    }

    closeEditBox(){
        this.setState({editBoxCommentIndex: null, editBoxX: null, editBoxY: null, editBoxHeight: null})
    }

    deleteComment(){
        const i = this.state.editBoxCommentIndex;
        this.state.comments.splice(i,1); //delete comment, hook with backend
        this.invalidBounds.splice(i+1,1); //delete bounds, no need to hook with backend
        this.closeEditBox();
        console.log(i);
    }

    render() {

        return (
            <div className="overflow-hidden flex flex-col items-center justify-center w-full h-full" style={{backgroundColor: "#fbfbfb"}}>
                <div style= {{overflow: "hidden"}}>
                    <div ref = {this.canvas} 
                        onMouseDown={this.onMouseDown} 
                        onMouseMove={this.onMouseMove} 
                        onMouseUp={this.onMouseUp} 
                        onTouchMove={this.onTouchMove}
                        onTouchEnd={this.onTouchEnd} 
                        style = {{ 
                            overflow: "hidden", 
                            position: "relative", 
                            width: "200vh", 
                            height: "200vh", 
                            marginTop: "-58vh",
                            marginLeft: "4vh",   // this can be made a variable based on name of person
                            backgroundColor: "#ffffff", 
                            border: "dashed black 4px", 
                            zIndex: 5 
                        }} >
                        {this.state.comments.map(( {text, x, y, color, size}, i) => ( 
                            <Comment
                                    key = {"comment"+i}
                                    commentId = {"comment"+i}
                                    commentIndex = {i}
                                    commentText={text} 
                                    commentX={x} 
                                    commentY={y} 
                                    commentColor={color} 
                                    commentSize={size}
                                    openEditBox={this.openEditBox}
                                    />
                                ) 
                            )
                        }
                        {this.isEditable === true && this.state.click && ( 
                            <CreateComment color = {this.state.currentColor} 
                                        size = {this.state.currentSize} 
                                        text={this.state.editedText} 
                                        position={this.state.click} 
                                        onChangeText={this.onChangeText} 
                                        onSave={this.onSave} onCancel={this.onCancel} 
                                        style = {{position: "absolute"}} /> 
                            )
                        }
                        {this.isEditable === true && this.state.editBoxX && (
                            <div 
                                ref = {this.editBox}
                                className = "flex flex-col justify-between"
                                style = {{
                                    position: "absolute", 
                                    left: `calc(calc(100% * ${this.state.editBoxX}))`, 
                                    top: `calc(calc(100% * ${this.state.editBoxY}))`,
                                    padding: "1vh",
                                    width: "42vh",
                                    height: `calc(100% * ${this.state.editBoxHeight})`,
                                    border: "1px solid #ff6173",
                                    borderRadius: "1vh",
                                    zIndex: 80
                            }}>
                                <div style={{fontSize: "20pt"}}><b>Remove Comment?</b></div>
                                <div className = "flex items-center justify-end" style={{color: "#ffffff"}}>
                                    <button onClick = {this.closeEditBox} onTouchEnd = {this.closeEditBox} className = "shadow-button" style={{ marginRight: "1vh", backgroundColor: "#c9c9c9", borderRadius: "0.75vh", padding: "1vh"}}>KEEP</button>
                                    <button onClick = {this.deleteComment} onTouchEnd = {this.deleteComment} className = "shadow-button" style={{ backgroundColor: "#ff6173", borderRadius: "0.75vh", padding: "1vh"}}>REMOVE</button>
                                </div>
                            </div>
                        )}
                        <div 
                            ref = {this.userContent}
                            className = "flex flex-row items-center justify-center " 
                            style = {{ 
                                position: "absolute", 
                                left: "76vh", 
                                top: "92vh", 
                                width: "48vh", 
                                height: "16vh", 
                                zIndex: 50, 
                                marginLeft: "auto", 
                                marginRight: "auto", 
                                borderRadius: "1vh" 
                            }}>
                            <div className = "flex flex-col items-start justify-center" style = {{ width: "15%", height: "100%", paddingBottom: "1.5vh" }}>
                                <Photo size={"8vh"}/>
                            </div>
                            <div className = "flex flex-col items-start justify-center" style = {{ width: "85%", height: "100%"}}>
                                <div style = {{ fontSize: "2vh", paddingLeft: "2.4vh", marginBottom: "-1vh" }}> Leave a message for ...</div>
                                <div style = {{ fontSize: "5vh", paddingLeft: "2vh" }}>{this.props.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Canvas