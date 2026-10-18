import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { backendURL } from '../App.jsx'
import {useNavigate} from "react-router-dom"

const AdminLogin = () => {

    const [adminEmail,setAdminEmail] = useState("")
    const [adminPassword,setAdminPassword] = useState("")

    const navigate = useNavigate()

    const handleAdminLogin = async (e) =>{
        e.preventDefault()
        const response = await axios.post(backendURL + "/api/admin/login",{adminEmail,adminPassword})
        if(response.status){
            navigate("/adminhome")
        }
    }
    

  return (
    <div className='admin'>
        <div className='container'>
            <div className='admin_form'>
                <form onSubmit={handleAdminLogin}>
                    <h2>Admin Login</h2>
                    <input type="text" value={adminEmail} onChange={(e)=>setAdminEmail(e.target.value)} placeholder="Enter Admin Email" /><br />
                    <input type="password" value={adminPassword} onChange={(e)=>setAdminPassword(e.target.value)} placeholder="Enter Password" /><br />
                    <input type="submit" value="Submit Now" />
                </form>
            </div>
        </div>
    </div>
  )
}

export default AdminLogin
