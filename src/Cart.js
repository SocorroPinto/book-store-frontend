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
                const cartDetails = cart.CartDetails.map((detail) => {
                    const bookDet = detail.Books.map((book) => {
                        return(<div key={book.id} className="book-det">
                                    <div className="book-det-item">{book.id}{".-  "}</div>
                                    <img className="book-det-item cartImage" 
                                         src={`../booksImages/${book.Img}`} 
                                         alt="Boook Image"></img>
                                    <div className="book-det-item book-title"><strong>{book.Title}</strong></div>
                                    <div className="book-det-item"><strong>{"Qty: "}</strong>{detail.Quantity}</div>
                                    <div className="book-det-item"><strong>{"Price: "}</strong>{book.Cost}</div>
                                    <div className="book-det-item"><button className="btn"><i className="fa fa-plus"></i></button></div>
                                    <div className="book-det-item"><button className="btn"><i className="fa fa-trash"></i></button></div>
                            </div>);
                    });
                    return (bookDet);
                });

                return(<div key={cart.id} className="cart-content">
                            <h3>Cart Num: {cart.id}</h3>
                            {cartDetails}
                            <div className="cart-delivery">
                                <div className="cart-delivery-address"><strong>Delivery Address:</strong>{" "}
                                { cart.DeliveryAddress}</div>
                                <div className="cart-delivery-dates">
                                    <div className="cart-dd-item"><strong>PurchaseDate:</strong>{" "}
                                    { cart.PurchaseDate}</div>
                                    <div className="cart-dd-item"><strong>DeliveryDate:</strong>{" "}
                                    { cart.DeliveryDate}</div>
                                    <div className="cart-dd-item"><strong>Total:</strong>{" "}
                                    { cart.Total}</div>

                                    <div className="cart-dd-item"><button className="btn"><i className="fa fa-shopping-cart"></i></button></div>
                                    <div className="cart-dd-item"><button className="btn"><i className="fa fa-cart-arrow-down"></i></button></div>
                                </div>
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
            </div>
        );
    }
}


export default Cart;