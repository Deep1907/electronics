import AddProducts from "../components/AddProducts.jsx";
import ViewProducts from "../components/ViewProducts.jsx";
import { useState } from "react";

const AdminHome = () =>{

    const [active,setActive] = useState(0)

    const adminComp = [
        {
            title : "Add Products",
            component : AddProducts
        },
        {
            title : "View Products",
            component : ViewProducts
        }
    ]

    const ActiveTabComp = adminComp[active].component

    const handleTab = (id) =>{
        setActive(id)
    }


    return(
        <>  
            <div className="admin_wrappper">
                <div className="admin_left">
                    {
                        adminComp.map((item,idx)=>(
                            <div className={`title ${active === idx ? "act" : ""}`} key={idx} onClick={()=>handleTab(idx)}>
                                <p>{item.title}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="admin_right">
                    <ActiveTabComp />
                </div>
            </div>
        </>
    )
}
export default AdminHome;