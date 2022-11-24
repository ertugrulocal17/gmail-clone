import { Button } from '@mui/material';
import React from 'react'
import {  provider } from '../../firebase';
import { signInWithPopup,getAuth } from 'firebase/auth';
import './Login.css';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
function Login() {
    const dispatch = useDispatch();
    const signIn = ()=> {
        const auth = getAuth();
        signInWithPopup(auth, provider).then((result) => {
            dispatch(login({
                displayName: result.user.displayName,
                email: result.user.email,
                photoUrl: result.user.photoURL,
            }))
        }).catch((error) => {
            alert(error.message);
        });

    }
  return (
    <div className='login'>
        <div className='login__container'>
            <img src='https://www.google.com/gmail/about/static/images/logo-gmail.png?cache=1adba63' alt=''/>
        </div>
        <Button onClick={signIn} variant='contained' color='primary' >Login</Button>
    </div>
  )
}

export default Login