import React, { useEffect,useState } from 'react'
import axios from "axios"
import { backendURL } from "../App.jsx"

const ViewProducts = () => {

  const [prodData,setProdData] = useState([])
  const [modalOpen,setModalOpen] = useState(false)

  const [product,setProduct] = useState("")
  const [price,setPrice] = useState("")
  const [updateProductId,setUpdateProductId] = useState(null)

  useEffect(() => {
    fetchAllProducts()
  }, [])

  

  const fetchAllProducts = async () => {
    const response = await axios.get(backendURL + "/api/admin/all_products")
    setProdData(response.data.allProducts)
  }

  const handleEdit = (id) =>{
      setModalOpen(!modalOpen)
      setUpdateProductId(id)
  }

  const handleUpdateSubmit = async (e) =>{
    e.preventDefault()
    const response = await axios.put(backendURL + "/api/admin/update_product",{product,price,updateProductId})
    console.log(response)
    if(response.data.success){
      setModalOpen(!modalOpen)
      setProduct("")
      setPrice("")
      fetchAllProducts()
    }
  }

  const handleDelete = async (id) =>{
      try{
        await axios.delete(backendURL + `/api/admin/delete_product/${id}`)
        fetchAllProducts()  
      }catch(err){
        console.log(err)
      }
  }


  return (
    <div>
      <h2>View Products</h2>
      <div>
          <div>
            {
              prodData.map((item,idx)=>(
                <div className="prod_box">
                    <h2>{item.product}</h2>
                    <p>{item.price}</p>
                    <button onClick={()=>handleEdit(item._id)}>Edit</button>
                    <button onClick={()=>handleDelete(item._id)} className='del'>Delete</button>
                </div>
              ))
            }
          </div>
      </div> 

      {
        modalOpen && (
          <div>
            <form onSubmit={handleUpdateSubmit}>
              <input type="text" placeholder="Update Product Name" value={product} onChange={(e)=>setProduct(e.target.value)} /><br />
              <input type="text" placeholder="Update Product Price" value={price} onChange={(e)=>setPrice(e.target.value)} /><br />
              <input type="submit" value="Update Product" />
            </form>
          </div>  
        )
      } 
    </div>
  )
}

export default ViewProducts
