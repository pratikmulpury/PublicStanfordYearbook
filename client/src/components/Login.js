import React from 'react';
import StyledInput from "./StyledInput";
import GoogleLogin from "react-google-login"
import '../assets/login.css';

const {useState} = React;

function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    const onSubmit = (event) => {
        event.preventDefault();
        //fill on Submit details
        window.location.href = '/discover'


    };

    const onSuccess = async (response) => {
        /*
        console.log(response); 
        console.log("The first name is: " + response.profileObj.givenName);
        console.log("The last name is: " + response.profileObj.familyName);
        */
        // const token = someApiCall(input using the profile obj
        // console.log(response.tokenObj.access_token );
        // console.log(response.tokenObj.id_token);
        // const googelAccessToken = response.profileObj.givenName;
        // const token = localhost/login
        // const token = googelAccessToken
        //localStorage.setItem("yearbookLoginToken",token )

        const token = response.tokenObj.id_token;

        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token})
        };
        
        const serverResponse = await fetch('http://localhost:8000/auth/login', request)
        const data = await serverResponse.json()

        const user = JSON.stringify(data.user);

        const serverToken = data.token
        const newUser = data.newUser

        //console.log(serverToken);

        localStorage.setItem("yearbookLoginToken", serverToken)
        localStorage.setItem("yearbookUser", user)


        if(newUser === true)
            document.location.href = '/register'
        else
            document.location.href = '/home'

        //console.log("before changing pages")
        //document.location.href = '/home/discover'
    }

    const onFailure = response => {
        console.log(response);
    }

    return (
        <div className='flex flex-col items-center h-full justify-center w-1/2'>
                <div className='mb-8 flex flex-col items-center'>
                    <h1 className='text-2xl font-extrabold text-grey4'>Welcome To Yearbook</h1>
                    <GoogleLogin
                        clientId="481852567239-rnkn002124j78ii2ibtrcu9b44rnvrh1.apps.googleusercontent.com"
                        buttonText="Login with your Stanford email"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        isSignedIn = {false}
                        cookiePolicy={'single_host_origin'}
                        redirectUri = "http://localhost:3000/home"
                />
                {error['credentials'] &&
                <p className="text-red text-sm mt-2 px-2">Sorry, it looks like you've entered the wrong email or
                    password.</p>}
            </div>
            <p className="text-sm text-grey4"> Don't have an account? <a className="text-blue" href='/register'>Sign
                Up</a>
            </p>
        </div>
    )
}

export default SignIn;