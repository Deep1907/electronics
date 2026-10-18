import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { incQty,decQty } from "../store/CartSlice.jsx"
import axios from "axios"
import {backendURL} from "../App.jsx"

const CartPage = () => {

    const cartVal = useSelector((store) => store.cart.items)
    const dispatch = useDispatch()



    console.log("Cart:", cartVal)

    const total = cartVal.reduce((acc, item) => {
    return acc + item.qty * item.price;
    }, 0);

    
const handleBuy = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            return;
        }

        const response = await axios.post(
            backendURL + "/api/payment/create",
            { total },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const { amount, currency, notes, orderId, keyId } = response.data;

        const options = {
            key: keyId,
            order_id: orderId,
            amount: amount,
            currency: currency,
            name: "Electronics Ecomm",
            description: "Transaction",
            prefill: {
                name: notes?.username || ""
            },
            theme: {
                color: "#FF0000"
            }
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
            console.error("Payment failed:", response.error);
            alert(response.error.description || "Payment failed");
        });

        rzp.open();

    } catch (err) {
        console.error(
            "Payment error:",
            err.response?.data || err.message
        );

        alert(
            err.response?.data?.message ||
            "Unable to create payment order"
        );
    }
};



    return (
        <>
            <div>
                <h2>Cart Page</h2>
                <div>
                    {
                        cartVal && cartVal.map((item) => (
                            <>
                            <div className="cart_box">
                                <div className="cart_wrap">
                                    <h2>{item.price}</h2>
                                    <div className="cart_btns">
                                        <button onClick={()=>dispatch(decQty(item._id))}>-</button>
                                        <p>{item.qty}</p>
                                        <button onClick={()=>dispatch(incQty(item._id))}>+</button>
                                    </div>
                                </div>
                            </div>    
                            </>
                        ))
                    }

                    <div>
                        <h2>Total : {total}</h2>
                        <button onClick={handleBuy}>Place Order</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CartPage;