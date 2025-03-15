import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';


export default function Cart({cartItems, setCartItems}) {
    const [complete, setComplete] = useState(false);

    function increaseQty(item){
        if (item.product.stock == item.qty) {
            return;
        }
        const updateItems = cartItems.map((i) => {
            if(i.product._id == item.product._id){
                i.qty++
            }
            return i;
        })
        setCartItems(updateItems)
    }

    function decreaseQty(item){
        if (item.qty > 1) {
            const updateItems = cartItems.map((i) => {
                if(i.product._id == item.product._id){
                    i.qty--
                }
                return i;
            })
            setCartItems(updateItems)
        }
    }

    function removeItem(item){
    

        const updateItems = cartItems.filter((i) => {
            if(i.product._id !== item.product._id){
                return true;
            }
        })
        setCartItems(updateItems)
    }

    function placeOrderHandler() {
        fetch(process.env.REACT_APP_API_URL +'/order', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cartItems)
        })
        .then(() => {
            setCartItems([]);
            setComplete(true);
            toast.success("Order Success!")
        })
    }


    return cartItems.length > 0 ? <Fragment>
        <div className="container container-fluid">
    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
    <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
            {cartItems.map((items) => 
            (<Fragment>
            <hr />
            <div className="cart-item">
                <div class="row">
                    <div class="col-4 col-lg-3">
                        <img src={items.product.images[0].image} alt={items.product.name} height="140" width="120"/>
                    </div>

                    <div class="col-5 col-lg-3">
                    <Link to={"/product/"+items.product._id}>{items.product.name}</Link>
                    </div>


                    <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${items.product.price}</p>
                    </div>



                    <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div class="stockCounter d-inline">
                            <span class="btn btn-danger minus" onClick={() => decreaseQty(items)}>-</span>
                            <input type="number" class="form-control count d-inline" value={items.qty} readOnly />

                            <span class="btn btn-primary plus" onClick={() =>increaseQty(items)}>+</span>
                        </div>
                    </div>

                    <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i id="delete_cart_item" onClick = {() => removeItem(items)}class="fa fa-trash btn btn-danger"></i>
                    </div>

                </div>
            </div>
            </Fragment>)
            )}
           
         
        </div>

        <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal:  <span class="order-summary-values">{cartItems.reduce((acc,item) => (acc + item.qty), 0)} (Units)</span></p>
                <p>Est. total: <span class="order-summary-values">${cartItems.reduce((acc,item) => (acc + item.product.price * item.qty), 0)}</span></p>

                <hr />
                <button id="checkout_btn" onClick = {placeOrderHandler}class="btn btn-primary btn-block">Place Order</button>
            </div>
        </div>
    </div>
</div>
    </Fragment> : (!complete ? <h2 className="mt-5">Your Cart is Empty!</h2> 
    : <Fragment> 
        <h2 className ='mt-5'>Order Complete!</h2>
        <p>Your order has been placed successfully.</p>
    </Fragment>)
}