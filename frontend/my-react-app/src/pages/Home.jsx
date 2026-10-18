import React from 'react'
import axios from "axios"
import {useEffect,useState} from "react"
import {backendURL} from "../App.jsx"
import { useDispatch } from 'react-redux'
import { addItem } from '../store/CartSlice.jsx'


const Home = () => {

  const [prod,setProd] = useState([])
  const dispatch = useDispatch()

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async () =>{
      const response = await axios.get(backendURL + "/api/getData/products")
      console.log(response)
      setProd(response.data.productsData)
  }

  const handleCart = (prd) =>{
      dispatch(addItem(prd))
  }

  return (
    <div>
        <h2>Home Page</h2>
        <div className="prod_wrapper">
            <div className="prodCard">
          {
            prod.map((item,idx)=>(
              <div className="prod">
                <h3>{item.product}</h3>
                <p>Rs. {item.price}</p>
                <button onClick={()=>handleCart(item)} className='btn_cart' >Add To Cart</button>
              </div>
            ))
          }
            </div>
        </div>
    </div>
  )
}

export default Home
