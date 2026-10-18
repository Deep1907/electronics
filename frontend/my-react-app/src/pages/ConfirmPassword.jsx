import {useState} from "react" 
import {backendURL} from "../App.jsx" 
import axios from "axios"
import {useLocation,useNavigate} from "react-router-dom"

const ConfirmPassword = () =>{

    const [pass,setPass] = useState("")
    const [confirmPass,setConfirmPass] = useState("")

    const navigate = useNavigate()

    const location = useLocation()
    const email = location.state.email

    const handlePassword = async (e) =>{
        e.preventDefault()
        const response = await axios.post(backendURL + "/api/change-password",{email,pass,confirmPass})
        console.log(response)
        if(response.data.success){
            navigate("/login")
        }
    }

    return(
        <>
            <div>
                <form onSubmit={handlePassword}>
                            <div className='form_box'>
                              <h2>Please Change Password</h2>
                              <div className='form_input_wrapper'>
                                <input type="password" placeholder="Change Password" value={pass} onChange={(e)=>setPass(e.target.value)} /><br />
                                <input type="password" placeholder="Confirm Change Password" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} /><br />
                                <input type="submit" value="Change Password" className='btn' />
                              </div>
                            </div>
                </form>
            </div>

        </>
    )
}

export default ConfirmPassword;