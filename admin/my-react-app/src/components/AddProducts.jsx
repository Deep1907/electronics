import React from 'react'
import {useState} from "react"
import axios from 'axios'
import { backendURL } from '../App.jsx'

const AddProducts = () => {

    const [product,setProduct] = useState("")
    const [price,setPrice] = useState("")

    const handleProductSubmit = async (e) =>{
        e.preventDefault()

        const response = await axios.post(backendURL + "/api/admin/add_products",{product,price})

        console.log(response)

        if(response.data.success){
            setProduct("")
            setPrice("")
        }
        
    }

  return (
    <div>
      <h2>Add Products</h2>
      <div>
        <form onSubmit={handleProductSubmit}>
            <input type="text" placeholder="Product Name" className='inp' value={product} onChange={(e)=>setProduct(e.target.value)} /> <br />
            <input type="text" placeholder="Product Price" className='inp' value={price} onChange={(e)=>setPrice(e.target.value)} /> <br />
            <input type="submit" value="Add Products" className='btn_submit' />
        </form>
      </div>
    </div>
  )
}

export default AddProducts
