import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import {backendURL} from "../App.jsx"
import {useNavigate} from "react-router-dom"
import { UserContext } from '../component/UserContext.jsx'

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const {setIsLoggedIn,setUname} = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault()
    try{
    const response = await axios.post(backendURL + "/api/login/loginData",{email,password})
    console.log(response)
    if(response.data.success){
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("username",response.data.username)
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true)
      setUname(response.data.username)
      navigate("/")
    }
    }catch(err){
      console.log(err)
    }
  }

  const handleForgetPassword = async (e) =>{
    e.preventDefault()
    const response = await axios.post(backendURL + "/api/forget-password", {email})
    console.log(response.data.status)
    alert("Otp Sent")
    navigate("/verifyforgotpasswordotp",{
      state:{
        email : email
      }
    })
  }


  return (
    <div className='box'>
        <div className='container'>
          <form onSubmit={handleLogin}>
            <div className='form_box'>
              <h2>Login Now</h2>
              <div className='form_input_wrapper'>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br />
                <div><Link onClick={handleForgetPassword} className='forget_link'>Forget Password ? Click Here </Link></div><br />
                <input type="submit" value="Login Now" className='btn' />
              </div>
            </div>
          </form>

        </div>
      </div>
  )
}

export default Login
