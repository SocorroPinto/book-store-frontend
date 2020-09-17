import React, { Component } from "react";
//import { Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import FakePromo from "./FakePromo";
import FakeAd from "./FakeAd";
import "./CartHistory.css";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api";


class CartHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            cart: null,
            message: ""
        }
    }

    componentDidMount() {
        const { currentUser } = this.state;
        if (currentUser) {
            axios.get(`${backendUrl}/carts/byuserhis/${currentUser.id}`).then((response) => {
                this.setState({
                    cart: response.data.carts,
                });
            });
        } 
    }

	render() {
        const currentUser = this.state.currentUser;
        const currentCart = this.state.cart;
        const myMessage = this.state.message;

        let infoCart = null;


        if (currentCart) {
            infoCart = currentCart.map((cart) => {
                const cartDetails = cart.CartDetails.map((detail, dIndex) => {
                    const bookDet = (<div key={detail.Book.id} className="book-det">
                                    <div className="book-det-item">{dIndex+1}{".-  "}</div>
                                    <img className="book-det-item cartImage" 
                                         src={`../booksImages/${detail.Book.Img}`} 
                                         alt="Boook"></img>
                                    <div className="book-det-item book-title-cart"><strong>{detail.Book.Title}</strong></div>
                                    <div className="book-det-item"><strong>{"Qty: "}</strong>{detail.Quantity}</div>
                                    <div className="book-det-item"><strong>{"Price: $"}</strong>{detail.Book.Cost}</div>
                            </div>);

                    return (bookDet);
                });

                return(<div key={cart.id} className="cart-content">
                            <div className="cart-delivery">
                                <div className="cart-dd-item">
                                    <h2 className='cart-dd-order'>Cart Order: {cart.id}</h2>
                                </div>
                                <div className="cart-delivery-dates">
                                    <div className="cart-dd-item"><strong>PurchaseDate:</strong>{" "}
                                    { cart.PurchaseDate.replace(/[A-Za-z]/g, ' ') }</div>
                                    <div className="cart-dd-item"><strong>DeliveryDate:</strong>{" "}
                                    { cart.DeliveryDate ? cart.DeliveryDate.replace(/[A-Za-z]/g, ' ') : null }</div>
                                    <div className="cart-dd-item"><strong>Total:</strong>{" $"}
                                    { cart.Total}</div>
                                </div>
                                <div className="cart-delivery-address">
                                    <div className="cart-dd-item"><strong>Delivery Address:</strong>{" "}
                                    <div className="item-address">{ cart.DeliveryAddress}</div>
                                    </div>
                                </div>
                            </div>
                            {cartDetails}
                      </div>);
            });
        }

        return (
            <div className="cart-container-above">
                <div className="cart-container-screen">
                    {infoCart}
                    {!currentUser && (<div className="cart-message">
                        <h1><strong>Not User Logged.</strong></h1>
                    </div>)}
                    {( currentUser && (!currentCart || currentCart.length <= 0)) && (<div className="cart-message">
                        <h1><strong>{'There is not Cart History.'}</strong></h1>
                    </div>)}
                </div>
                {( currentUser && currentCart && currentCart.length > 0) && (<div className="fakeAdvertising">
					<FakeAd />
					<FakePromo />
				</div>)}
            </div>
        );
    }
}


export default CartHistory;