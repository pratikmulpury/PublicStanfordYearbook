import React from 'react';
import StyledInput from "./StyledInput";
import GoogleLogin from "react-google-login"
import Select from 'react-select';
import majors from '../assets/majors.json'
import dorms from '../assets/dorms.json'

const {useState} = React;

function SignUp() {

    const user = JSON.parse(localStorage.getItem("yearbookUser"))
    
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [dorm, setDorm] = useState('None');
    const [major, setMajor] = useState('None');

    const [error, setError] = useState({});
    const [redirect, setRedirect] = useState(false);

    const dormOptions = dorms
    const majorOptions = majors

    // setFirstName(localStorage.getItem('yearbookFirstName'))
    // setLastName(localStorage.getItem('yearbookLastName'))

    const onSubmit = async function (event) {
        event.preventDefault();
        
        if(firstName === '')
            return;

        if(lastName === '')
            return;

        if(dorm === 'None'){
            setDorm('');
            return;
        }

        if(major === 'None'){
            setMajor('');
            return;
        }

        const token = localStorage.getItem("yearbookLoginToken")

        user.firstName = firstName
        user.lastName = lastName
        user.dorm = dorm
        user.major = major

        // const userString = JSON.stringify(user)
        // locatStorage.setItem("yearbookUser", userString)
        // document.location.href='/profilecreation'

        //ideally should move this to image upload page. Resume progress from localstorage
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token, user: user})
        };
    
        const response = await fetch('http://localhost:8000/auth/register', request)
        const success = await response.json()

        const userString = JSON.stringify(user);

        if(success === false){
            localStorage.removeItem("yearbookLoginToken")
            localStorage.removeItem("yearbookUser")
            //document.location.href='/login'
        } else {
            localStorage.setItem("yearbookLoginToken", token)
            localStorage.setItem("yearbookUser", userString)
            document.location.href='/home'
        } 
        // move this part (above) to image upload page

    }

    return (
        <div className='flex flex-col items-center h-full justify-center w-3/4 md:w-1/2'>
            <div className='mb-8 flex flex-col items-center'>
                <h1 className='text-2xl font-extrabold text-grey4'>Welcome To Yearbook</h1>
                <h1 className='text-sm text-grey4'>Please tell us a bit more about you so that your friends can find you!</h1>
            </div>
            <StyledInput placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                            className="w-full mb-6" error={firstName===''}/>
            <StyledInput placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                            className="w-full mb-6" error={lastName===''}/>
            <div className="w-full mb-6 rounded">
                <Select placeholder="Dorm" options={dormOptions} onChange={(option) => setDorm(option.value)} className="w-full shadow-input bg-white rounded" styles={{input: () => ({padding: "2vh"}), placeholder: () => ({paddingLeft: "1vh", color: "#a0aec0"}), singleValue: () => ({paddingLeft: "1vh"})}} />
                {dorm === '' && <p className="text-red text-sm mt-2 px-2">This is a required field</p>}
            </div>
            <div className="w-full mb-8 rounded">
                <Select placeholder="Major" options={majorOptions} onChange={(option) => setMajor(option.value)} className="w-full shadow-input bg-white rounded" styles={{input: () => ({padding: "2vh"}), placeholder: () => ({paddingLeft: "1vh", color: "#a0aec0"}), singleValue: () => ({paddingLeft: "1vh"}) }}/>
                {major === '' && <p className="text-red text-sm mt-2 px-2">This is a required field</p>}
            </div>
            <button className="rounded shadow-button bg-blue py-2 px-6 text-white mt-8 mb-4" onClick={onSubmit}>Let's Go!</button>
        </div>
    );

}

export default SignUp;
