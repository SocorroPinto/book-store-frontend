import React, { Component } from "react";
//import { Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import FakePromo from "./FakePromo";
import FakeAd from "./FakeAd";
import "./Cart.css";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api";


class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            isEditable: false,
            cart: null,
            message: ""
        }
    }

    calcTotal = (pCart) => {
        let myTotal = 0;

        pCart.forEach((cart) => {
            cart.CartDetails.forEach((detail) => {
                myTotal += detail.Quantity * detail.Book.Cost;
            });
        });  
        return myTotal;   
    }

    updateCart = (pCart) => {
		axios.put(`${backendUrl}/carts/${pCart.id}`, pCart)
			.then((response) => {
                console.log(response.data);
            });
    }

    updateCartDetail = (pCartDet) => {

		axios.put(`${backendUrl}/cartdets/${pCartDet.id}`, pCartDet)
			.then((response) => {
                console.log(response.data.cartDetail);
            });
    }

    deleteCart = (pCart) => {
		axios.delete(`${backendUrl}/carts/${pCart.id}`)
			.then((response) => {
                this.setState({
                    message: 'There isn\'t a cart open.'
                });
            });
    }

    deleteCartDetail = (pCartDet) => {
        axios.delete(`${backendUrl}/cartdets/${pCartDet.id}`)
			.then((response) => {
                console.log(response.data.message);
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

            myCart[0].Total = this.calcTotal(myCart);
            if ( myCart[0].Total > 0 ) {
                this.updateCart(myCart[0]);
            } else {
                this.deleteCart(myCart[0]);
                myCart = null;
            }
        }
        // console.log(indexDetail);
        // console.log(myCart)

        this.setState({
            cart: myCart
        });
    }
   
    handleConfirm = (e) => {
        e.preventDefault();
        let myCart = [...this.state.cart];
        if ( myCart[0].DeliveryAddress ) {
            myCart[0].Status = "Confirmed";
    
            this.updateCart(myCart[0]);
    
            this.setState({
                cart: null,
                message: 'There isn\'t a cart open.'
            });
        } else {
            this.setState({
                message: 'Please, add a delivery address.'
            });
        }
    }

    handleDiscard = (e) => {
        e.preventDefault();
        let myCart = [...this.state.cart];
        this.deleteCart(myCart[0]);

        this.setState({
            cart: null,
            message: 'There isn\'t a cart open.'
        });
    }

    handleEdit = (e) => {
        e.preventDefault();

        this.setState({
            isEditable: true
        });
    }

    handleSave = (e) => {
        e.preventDefault();
        let myCart = [...this.state.cart];
        myCart[0].DeliveryAddress = e.target.delAddressInput.value;
        this.updateCart(myCart[0]);
        this.setState({
            isEditable: false,
            cart: myCart,
            message: ""
        });
    }

	render() {
        const currentUser = this.state.currentUser;
        const isEditable = this.state.isEditable;
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
                                    <div className="book-det-item"><button onClick={(event) => {
                                        this.handleAddBook(event, dIndex);
                                    }} className="btn"><i className="fa fa-plus"></i></button></div>
                                    <div className="book-det-item"><button onClick={(event) => {
                                        this.handleDelBook(event, dIndex);
                                    }} className="btn"><i className="fa fa-trash"></i></button></div>
                            </div>);

                    return (bookDet);
                });

                return(<div key={cart.id} className="cart-content">
                            <div>
                                <h3>Cart Order: {cart.id}</h3>
                                <strong className="cart-message">{myMessage}</strong>
                            </div>
                            <div className="cart-delivery">
                                <div className="cart-delivery-address">
                                    <div className="cart-dd-item"><strong>Delivery Address:</strong>{" "}
                                    {!isEditable && (<div className="item-address">{ cart.DeliveryAddress}</div>)}
                                    {isEditable && (<div>
                                                    <form id="deliveryAddressForm" onSubmit={(event) => {
                                                        this.handleSave(event) } } >
                                                        <textarea type="text" id="delAddressInput" name="delAddressInput" rows="4" cols="100">{cart.DeliveryAddress}</textarea>
                                                    </form> 
                                                </div>)}                                    
                                    {isEditable && ( <div className="cart-dd-item">
                                                        <button type="submit" form="deliveryAddressForm" className="btn">
                                                        <i className="fa fa-save"></i>{" Save"}
                                                    </button>
                                                </div> )} 
                                    {!isEditable && (
                                        <div className="cart-dd-item">
                                            <button onClick={(event) => {
                                                        this.handleEdit(event);
                                                }}  className="btn">
                                                <i className="fa fa-edit"></i>{" Edit Address"}
                                            </button>
                                        </div>)}
                                    </div>
                                </div>

                                <div className="cart-delivery-dates">
                                    <div className="cart-dd-item"><strong>PurchaseDate:</strong>{" "}
                                    { cart.PurchaseDate.replace(/[A-Za-z]/g, ' ') }</div>
                                    <div className="cart-dd-item"><strong>DeliveryDate:</strong>{" "}
                                    { cart.DeliveryDate ? cart.DeliveryDate.replace(/[A-Za-z]/g, ' ') : null }</div>
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
            <div className="cart-container-above">
                <div className="cart-container-screen">
                    {infoCart}
                    {!currentUser && (<div className="cart-message">
                        <h1><strong>Not User Logged.</strong></h1>
                    </div>)}
                    {( currentUser && (!currentCart || currentCart.length <= 0)) && (<div className="cart-message">
                        <h1><strong>{'There isn\'t a cart open.'}</strong></h1>
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


export default Cart;