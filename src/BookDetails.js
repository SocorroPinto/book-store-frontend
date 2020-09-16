import React, { Component } from "react";
import AuthService from "./services/auth.service";
import NewCart from "./services/cart.service";
import ReactStars from "react-rating-stars-component";
import "./BookDetails.css";
import axios from "axios";


const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";

class BookDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: AuthService.getCurrentUser(),
			bookDetail: [],
			cart: null,
			message: null
		};
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
	
	insertCart = (pCart, pBookId) => {
		const myCartDet = {
			CartId: null,
			BookId: pBookId,
			Quantity: 1
		}
		axios.post(`${backendUrl}/carts/`, pCart)
			.then((response) => {
				myCartDet.CartId = response.data.cart.id;
				this.insertCartDetail(myCartDet);		
            });
    }

    insertCartDetail = (pCartDet) => {
		axios.post(`${backendUrl}/cartdets/`, pCartDet)
			.then((response) => {
                this.setState({
                    cart: response.data.carts,
                });
            });
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


	componentDidMount() {
		const currentUser = this.state.currentUser;

		axios.get(`${backendUrl}${this.props.match.url}`).then((response) => {
			const myBook = response.data.book;

			if ( currentUser ) {
				axios.get(`${backendUrl}/carts/byuser/${currentUser.id}`).then((response) => {
					this.setState({
						bookDetail: myBook,
						cart: response.data.carts
					});
				});
			} else {
				this.setState({
					bookDetail: response.data.book,
				});				
			}
		});
	}

	findMyBook = (pBook) => {
		const myCart = [...this.state.cart];
		let myIndex = -1;

		myCart.forEach(cart => {
			cart.CartDetails.forEach((elem, index) => {
				if ( pBook.id === elem.BookId ) {
					myIndex = index;
				}
			});
		});
		return myIndex
	}

	handleAddBook = (e, pBook) => {
		e.preventDefault();
		const currentUser = this.state.currentUser;
		if (currentUser) {
		const myCart = [...this.state.cart]

		if ( myCart && myCart.length > 0 ) {
			let myIndex = this.findMyBook(pBook);
			if ( myIndex !== -1 ) {
				myCart[0].CartDetails[myIndex].Quantity += 1;
				myCart[0].Total = this.calcTotal(myCart);
		
				this.updateCartDetail(myCart[0].CartDetails[myIndex]);
				this.updateCart(myCart[0]);	
				this.setState({
					cart: myCart
				});
			}  else {
				const myCartDet = {
					CartId: myCart[0].id,
					BookId: pBook.id,
					Quantity: 1
				}

				myCart[0].Total += Number(pBook.Cost);

				this.updateCart(myCart[0]);	
				this.insertCartDetail(myCartDet);					
			}
		} else {
			NewCart.init(currentUser.id, pBook.Cost);
			this.insertCart(NewCart.carts, pBook.id);
		}
		} else {
			this.setState({
				message: 'Not User Logged.'
			});
		}
	}

	updateRating = (event, bookUpd) => {
		bookUpd.Rating = event;
		
		axios
		 	.put(`${backendUrl}/books/${bookUpd.id}`, bookUpd)
		 	.then((response) => {
				 this.setState({ book: response.data.updBook[0] });
			 });
	};

	render() {
		return (
			<div className="bookDetail">
				<div>{this.state.message}</div>
				<div className="bookDet-Img">
					<img
						src={`../booksImages/${this.state.bookDetail.Img}`}
						alt=""
						id="bookImg"
					/>
					<form onSubmit={(event) => {
									this.handleAddBook(event, this.state.bookDetail);
								}} >
						<input type="submit" value="Add book" className="button" />
					</form>
				</div>
				<div className="bookDet-info">
					<div className="bookDet-header">
						<h3> {this.state.bookDetail.Title}</h3>
						<h5>
							<label>Author:</label> {this.state.bookDetail.Author}
						</h5>
					</div>
					<div className="bookDet-rating">
						<h5>
							<label>Rating:</label>
						</h5>
						{ this.state.bookDetail.hasOwnProperty("Rating") &&
						(<ReactStars
								value={this.state.bookDetail.Rating}
								count={5}
								onChange={(event) => {
									this.updateRating(event, this.state.bookDetail);
								}}
								size={22}
								activeColor="#ffd700"
								edit={true}
							/>)}
					</div>
					<div className="bookDet-extraInfo">
						<h5>
							<label>Publication year:</label>
							{this.state.bookDetail.PublicationYear}
						</h5>
						<h5>
							<label>Pages:</label> {this.state.bookDetail.Pages}
						</h5>
						<h5>
							<label>Price:</label>${this.state.bookDetail.Cost}
						</h5>
						<h5>
							<label>Language:</label>
							{this.state.bookDetail.Language}
						</h5>
					</div>
					<div className="bookDet-summary">
						<h5>
							<label>Description:</label>
							{this.state.bookDetail.Descriiption}
						</h5>
						<h5>
							<label>Summary:</label>: {this.state.bookDetail.Summary}
						</h5>
					</div>
				</div>
			</div>
		);
	}
}

export default BookDetails;
