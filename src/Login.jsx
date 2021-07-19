import { Button } from '@material-ui/core';
import React from 'react'
import { auth, provider } from './firebase';
import "./Login.css";
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
  const [{}, dispatch] = useStateValue();
 
  const signIn=()=>{
    auth.signInWithPopup(provider).then((result)=> {

      dispatch({
        type: actionTypes.SET_USER,
        user: result.user
      });

    }).catch(error=> alert(error.message))

  }

  return (
    <div className="login">
     <div className="login_container">

       <img src="https://i.pinimg.com/564x/79/dc/31/79dc31280371b8ffbe56ec656418e122.jpg" alt="" />
       
       <div className="login_text">
         <h1>Sogn in to whatsapp</h1>
       </div>
         
      <Button className='login-btn' onClick={signIn}>
        Sign in with google
      </Button>


     </div>
    </div>
  )
}

export default Login
