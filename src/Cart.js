import React, { Component } from "react";
//import { Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import "./Cart.css";
// import FakePromo from "./FakePromo";
// import FakeAd from "./FakeAd";

import axios from "axios";
import Books from "./Books";
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            cart: null
        }
    }

    componentDidMount() {
        const { currentUser } = this.state;
        if (currentUser) {

            axios.get(`${backendUrl}/carts/byuser/${currentUser.id}`).then((response) => {

                this.setState({
                    cart: response.data.carts,
                });
            });
        }
    }
   
	render() {
        const currentUser = this.state.currentUser;
        const currentCart = this.state.cart;
        console.log('Estoy en el Cart ', currentUser);
        console.log('El carrito es', currentCart);

        let infoCart = null;

        if (currentCart) {
            infoCart = currentCart.map((cart) => {
                console.log(cart)

                const cartDetails = cart.CartDetails.map((detail) => {
                    const bookDet = detail.Books.map((book) => {
                        return(<div key={book.id} className="book-det">
                                    <div>{book.id}</div>
                                    <img className="cartImage" 
                                         src={`../booksImages/${book.Img}`} 
                                         alt="Boook Image"></img>
                                    <h3>{book.Title}</h3>
                                    <div><strong>{"Qty: "}</strong>{detail.Quantity}</div>
                                    <div><strong>{"Price: "}</strong>{book.Cost}</div>
                            </div>);
                    });
                    return (bookDet);
                });

                return(<div key={cart.id} >
                            <h3>Cart Num: {cart.id}</h3>
                        <div>
                            {cartDetails}
                            <div><strong>Delivery Address:</strong>{" "}
                            { cart.DeliveryAddress}</div>
                            <div><strong>PurchaseDate:</strong>{" "}
                            { cart.PurchaseDate}</div>
                            <div><strong>DeliveryDate:</strong>{" "}
                            { cart.DeliveryDate}</div>
                            <div><strong>Total:</strong>{" "}
                            { cart.Total}</div>
                        </div>
                      </div>);
            });
        }

        return (
            <div className="cart-container">
                {!currentUser && (<div className="cart-content">
                    Not User Logged.
                </div>)}
                {infoCart}
                <div className="cart-info">

                </div>
            </div>
        );
    }
}


export default Cart;