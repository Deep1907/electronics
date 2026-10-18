import React from 'react'
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { FaCartPlus } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {clearCart} from "../store/CartSlice.jsx";


const Navbar = () => {

    const cartVal = useSelector((store)=>store.cart.items)

    const { uname, setUname, isLoggedIn,setIsLoggedIn } = useContext(UserContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("isLoggedIn")

        setUname("")
        setIsLoggedIn(false)
        dispatch(clearCart())
        navigate("/login")
    }


    const handleCartToNextPage = () =>{
        navigate("/cartpage")   
    }

    return (
        <div className='navbar'>
            <div className='container'>
                <div className='navbar_container'>
                    <h2>Logo</h2>
                    <div className='navbar_right'>
                        <ul>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Our Products</li>
                        </ul>
                        <div>
                        {
                            !isLoggedIn ? (
                                <div className='navbar_btn'>
                                    <button onClick={()=>navigate("/signup")}>SignUp Now</button>
                                    <button onClick={()=>navigate("/login")}>Login Now</button>
                                </div>
                            ) : (

                                <div>
                                    <button onClick={handleLogout}>Logout Now</button>
                                </div>
                            )
                        }
                        </div>
                        <div>
                        {isLoggedIn && (
                        <div>
                            <span onClick={handleCartToNextPage}><FaCartPlus />{cartVal.length}</span>
                            <FaRegUser /><span>{uname}</span>
                        </div>
                        )
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
