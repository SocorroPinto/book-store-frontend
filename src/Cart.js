import React, { Component } from "react";
//import { Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import "./Cart.css";
// import FakePromo from "./FakePromo";
// import FakeAd from "./FakeAd";

import axios from "axios";
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            isEditable: false,
            cart: null,
        }
    }

    calcTotal = (pCart) => {
        let myTotal = 0;

        pCart.forEach((cart) => {
            cart.CartDetails.forEach((detail) => {
                detail.Books.forEach((book) => {
                    myTotal += detail.Quantity * book.Cost;
                });
            });
        });  
        return myTotal;   
    }

    updateCart = (pCart) => {
		axios.put(`${backendUrl}/carts/${pCart.id}`, pCart)
			.then((response) => {
                console.log(response.data)
            });
    }

    updateCartDetail = (pCartDet) => {
		axios.put(`${backendUrl}/cartdets/${pCartDet.id}`, pCartDet)
			.then((response) => {
                console.log(response.data.cartDetail)
            });
    }

    deleteCart = (pCart) => {
		axios.delete(`${backendUrl}/carts/${pCart.id}`)
			.then((response) => {
                console.log(response.data.message)
            });
    }

    deleteCartDetail = (pCartDet) => {
        console.log('Detalle del carrito a borrar: ', pCartDet);
        console.log('El id: ', pCartDet.id);
        axios.delete(`${backendUrl}/cartdets/${pCartDet.id}`)
			.then((response) => {
                console.log(response.data.message)
            });
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

    handleAddBook = (e, indexDetail) => {
        e.preventDefault();
        let myCart = [...this.state.cart];

        myCart[0].CartDetails[indexDetail].Quantity += 1;
        myCart[0].Total = this.calcTotal(myCart);

        this.updateCartDetail(myCart[0].CartDetails[indexDetail]);
        this.updateCart(myCart[0]);

        this.setState({
            cart: myCart
        });
    }

    handleDelBook = (e, indexDetail) => {
        e.preventDefault();
        let myCart = [...this.state.cart];

        if ( myCart[0].CartDetails[indexDetail].Quantity > 1 ) {
            myCart[0].CartDetails[indexDetail].Quantity -= 1;
            myCart[0].Total = this.calcTotal(myCart);
            this.updateCartDetail(myCart[0].CartDetails[indexDetail]);
            this.updateCart(myCart[0]);
        } else {
            const myDeleted = [...myCart[0].CartDetails.splice(indexDetail, 1)];
            this.deleteCartDetail(myDeleted[0]);
            console.log('Lo que según esto borre', myDeleted)
            myCart[0].Total = this.calcTotal(myCart);
            if ( myCart[0].Total > 0 ) {
                this.updateCart(myCart[0]);
            } else {
                this.deleteCart(myCart[0]);
                myCart = null;
            }
        }
        console.log(indexDetail);
        console.log(myCart)

        this.setState({
            cart: myCart
        });
    }
   
    handleConfirm = (e) => {
        e.preventDefault();
        let myCart = [...this.state.cart];

        myCart[0].Status = "Confirmed";

        this.updateCart(myCart[0]);

        this.setState({
            cart: null
        });
    }

    handleDiscard = (e) => {
        e.preventDefault();
        let myCart = [...this.state.cart];
        this.deleteCart(myCart[0]);

        this.setState({
            cart: null
        });
    }

    handleEdit = (e) => {
        e.preventDefault();

        this.setState({
            isEditable: true
        });
    }

	render() {
        const currentUser = this.state.currentUser;
        const isEditable = this.state.isEditable;
        const currentCart = this.state.cart;

        let infoCart = null;

        if (currentCart) {
            infoCart = currentCart.map((cart) => {
                const cartDetails = cart.CartDetails.map((detail, dIndex) => {
                    const bookDet = detail.Books.map((book) => {
                        return(<div key={book.id} className="book-det">
                                    <div className="book-det-item">{dIndex+1}{".-  "}</div>
                                    <img className="book-det-item cartImage" 
                                         src={`../booksImages/${book.Img}`} 
                                         alt="Boook"></img>
                                    <div className="book-det-item book-title-cart"><strong>{book.Title}</strong></div>
                                    <div className="book-det-item"><strong>{"Qty: "}</strong>{detail.Quantity}</div>
                                    <div className="book-det-item"><strong>{"Price: $"}</strong>{book.Cost}</div>
                                    <div className="book-det-item"><button onClick={(event) => {
                                        this.handleAddBook(event, dIndex);
                                    }} className="btn"><i className="fa fa-plus"></i></button></div>
                                    <div className="book-det-item"><button onClick={(event) => {
                                        this.handleDelBook(event, dIndex);
                                    }} className="btn"><i className="fa fa-trash"></i></button></div>
                            </div>);
                    });
                    return (bookDet);
                });

                return(<div key={cart.id} className="cart-content">
                            <h3>Cart Num: {cart.id}</h3>
                            <div className="cart-delivery">
                                <div className="cart-delivery-address">
                                    <div className="cart-dd-item"><strong>Delivery Address:</strong>{" "}
                                    <div className="item-address">{ cart.DeliveryAddress}</div></div>
                                    {isEditable && (
                                        <div className="cart-dd-item">
                                            <button class="btn">
                                                <i class="fa fa-save"></i>{" Save"}
                                            </button>
                                        </div> )}
                                    {!isEditable && (
                                        <div className="cart-dd-item">
                                            <button class="btn">
                                                <i class="fa fa-edit"></i>{" Edit Address"}
                                            </button>
                                        </div>)}
                                </div>

                                <div className="cart-delivery-dates">
                                    <div className="cart-dd-item"><strong>PurchaseDate:</strong>{" "}
                                    { cart.PurchaseDate}</div>
                                    <div className="cart-dd-item"><strong>DeliveryDate:</strong>{" "}
                                    { cart.DeliveryDate}</div>
                                    <div className="cart-dd-item"><strong>Total:</strong>{" $"}
                                    { cart.Total}</div>
                                    <div className="cart-dd-item"><button  onClick={(event) => {
                                        this.handleConfirm(event);
                                    }} className="btn"><i className="fa fa-shopping-cart"></i>{" Confirm"}</button></div>
                                    <div className="cart-dd-item"><button  onClick={(event) => {
                                        this.handleDiscard(event);
                                    }} className="btn"><i className="fa fa-cart-arrow-down"></i>{" Discard"}</button></div>
                                </div>
                            </div>
                            {cartDetails}
                      </div>);
            });
        }

        return (
            <div className="cart-container-screen">
                {!currentUser && (<div className="cart-content">
                    Not User Logged.
                </div>)}
                {infoCart}
            </div>
        );
    }
}


export default Cart;