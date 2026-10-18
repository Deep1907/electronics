import React from 'react'
import {useState} from "react";
import axios from "axios"
import {backendURL} from "../App.jsx"
import {useNavigate} from "react-router-dom"

const Signup = () => {

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()


  const handleSignup = async (e) =>{
      e.preventDefault()

      const signupData = {
        username,
        email,
        password
      }

      console.log("signup", signupData)
      
      // const response = await axios.post(backendURL + "/api/signup/addSignupData",{username,email,password})

      // if(response.data.success){
      //   setUsername("")
      //   setEmail("")
      //   setPassword("")

      // }

      const otpRes = await axios.post(backendURL + "/api/otp",{username,email,password})

      if(otpRes.data.success){
        alert("Otp Sent to Mail")
        navigate("/verifyotp",{
          state : {
            username : username,
            email : email,
            password : password
          }
        })
      }

  }

  return (
    <>
      <div className='box'>
        <div className='container'>

          <form onSubmit={handleSignup}>
            <div className='form_box'>
              <h2>Signup Now</h2>
              <div className='form_input_wrapper'>
                <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} /><br />
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br />
                <input type="submit" value="Signup Now" className='btn' />
              </div>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default Signup
