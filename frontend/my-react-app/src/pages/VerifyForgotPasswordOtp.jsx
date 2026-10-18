import {useState} from "react";
import axios from "axios"
import {backendURL} from "../App.jsx"
import {useLocation,useNavigate} from "react-router-dom"

const VerifyForgotPasswordOtp = () =>{

    const [otp,setOtp] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state.email


    const handleForgotPasswordOtp = async (e) =>{
        e.preventDefault()
        
        const response = await axios.post(backendURL + "/api/verify-forgot-password-otp",{email,otp})
        if(response.data.success){
            navigate("/confirmpassword",{
                state:{
                    email : email
                }
            })
        }
    }

    return(
        <>
            <div>
                <form onSubmit={handleForgotPasswordOtp}>
                    <input type="text" placeholder="Enter Otp" value={otp} onChange={(e)=>setOtp(e.target.value)} /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default VerifyForgotPasswordOtp;