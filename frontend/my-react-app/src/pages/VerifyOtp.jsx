import {useState} from "react"
import axios from "axios"
import {backendURL} from "../App.jsx" 
import {useNavigate,useLocation} from "react-router-dom"

 


const VerifyOtp = () =>{

    const [otp,setOtp] = useState("")
    const navigate = useNavigate()
    const location = useLocation()


    const email = location.state.email

    const handleVerifyOtp = async (e) =>{

        e.preventDefault()
        const otpVer = await axios.post(backendURL + "/api/verifyOtp",{otp,email})
        console.log("Otp Verify",otpVer)
        if(otpVer.data.success){
            navigate("/login")
        }
    }


    return(
        <>
            <div>
                <form onSubmit={handleVerifyOtp}>
                    <input type="number" placeholder="Write Otp" value={otp} onChange={(e)=>setOtp(e.target.value)} /><br />
                    <input value="Verify Otp" type="submit" />
                </form>    
            </div>
        </>
    )
}

export default VerifyOtp;