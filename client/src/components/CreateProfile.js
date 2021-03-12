import React from 'react';
import '../assets/createProfile.css';
import { FaStepForward } from 'react-icons/fa';
const {useState} = React;

function CreateProfile() {

    const [uploadCompleted, setUploadCompleted] = useState(false);
    const [status, setStatus] = useState("");
  // const[fileURL,setFileURL] = useState("");
    const[file, setFile] = useState(null)
    const[fileURL, setFileURL] = useState("")

    const uploadFile = () =>{
        document.getElementById('fileUpload').click();        
    }
    // error for no image uploaded
    // upload failed on the server please try again
    // image was succesfully uploaded
    // image was succesfully reuploaded
    const onChange = e => {
        setFile(e.target.files[0])
        if(fileURL){
            URL.revokeObjectURL(fileURL)
        }
        if(e.target.files[0]){
            const test = URL.createObjectURL(e.target.files[0])
            setFileURL(test)
            // if succesful api call success message, else failed message
            if(true){
                setStatus("Success")
                setUploadCompleted(true)
            }else{
                setStatus("Failed")
            }
         }else {
            setStatus("NotImage")
        }
    }
    const ImageUploadButton = (
        <>
            <div className='flex flex-col items-center h-full justify-center w-1/2'>
                        
                <h1 className='xs: text-xl sm:2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-extrabold text-grey4'>Upload a picture so your <br></br> friends can find you!</h1>
                <div class = "circleContainer" onClick = {uploadFile}> 
                    <div id = "testBackground" class = "circle plus"  >
                        <img class = "backImage" src= {fileURL} style = {fileURL ? {} : {display:'none'}}/>
                    </div>
                    { status ==="Success" &&  <p className="xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center font-extrabold  text-grey4"> Image upload success! </p>}
                    { status === "NotImage" && <p className="xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center font-extrabold text-red"> No image selected! </p>}
                    { status === "Failed" && <p className="xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center font-extrabold  text-red"> Image upload failure!</p>}
                </div>
                <div className = "flex justify-between" class = "moveRight">
                    { !uploadCompleted &&
                        <a href='/discover'>
                            <button onClick={ ()=>console.log("test")} class="xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl rounded bg-grey3 hover:bg-grey2 text-white font-bold py-2 px-16 rounded justify-end">
                                    <span>Skip</span>
                            </button>
                        </a>
                    }
                    {
                        uploadCompleted && 
                        <a href='/discover'>
                            <button onClick={ ()=>console.log("test")} class="xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl rounded bg-blue hover:bg-lightblue text-white font-bold py-2 px-16 rounded justify-end">
                                    <span>Go</span>
                            </button>
                        </a>
                    }
                    <input id='fileUpload' type='file' onChange = {onChange} hidden/>
                </div>
            </div>
        </>
    )

    return (
        <>
        {ImageUploadButton}
        </>
    );
}

export default CreateProfile;