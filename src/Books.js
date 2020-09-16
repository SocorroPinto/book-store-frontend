import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Books.css";
import FakePromo from "./FakePromo";
import FakeAd from "./FakeAd";
import ReactStars from "react-rating-stars-component";
import AuthService from "./services/auth.service";
import NewCart from "./services/cart.service";
import Pagination from "react-js-pagination";
import axios from "axios";

// import Pagination from "./Pagination";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api";
let myPath = "";

class Books extends Component {
	constructor(props) {
		super();
		this.state = {
			books: [],
			currentUser: AuthService.getCurrentUser(),
			cart: null,
			limit: 6,
			offset: 0,
			newRating: 0,
			activePage: 1,
			message: null,
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
	};

	insertCart = (pCart, pBookId) => {
		const myCartDet = {
			CartId: null,
			BookId: pBookId,
			Quantity: 1,
		};
		axios.post(`${backendUrl}/carts/`, pCart).then((response) => {
			myCartDet.CartId = response.data.cart.id;
			this.insertCartDetail(myCartDet);
		});
	};

	insertCartDetail = (pCartDet) => {
		axios.post(`${backendUrl}/cartdets/`, pCartDet).then((response) => {
			this.setState({
				cart: response.data.carts,
			});
		});
	};

	updateCart = (pCart) => {
		axios.put(`${backendUrl}/carts/${pCart.id}`, pCart).then((response) => {
			console.log(response.data);
		});
	};

	updateCartDetail = (pCartDet) => {
		axios
			.put(`${backendUrl}/cartdets/${pCartDet.id}`, pCartDet)
			.then((response) => {
				console.log(response.data.cartDetail);
			});
	};

	componentDidMount() {
		if (this.props.location.search !== "") {
			myPath = `/books/${this.props.location.search.substring(
				1,
				7
			)}?tag=${this.props.location.search.substring(8)}`;
		} else {
			if (this.props.location.pathname === "/") {
				myPath = "/books";
			} else {
				myPath = this.props.location.pathname;
			}
		}
		console.log("myPath: ", myPath);
		const currentUser = this.state.currentUser;

		//axios.get(`${backendUrl}${myPath}?limit=${this.state.limit}&offset=${this.state.offset*this.state.activePage}`)
		axios.get(`${backendUrl}${myPath}`).then((response) => {
			const myBooks = response.data.myBooks.books.books;
			if (currentUser) {
				axios
					.get(`${backendUrl}/carts/byuser/${currentUser.id}`)
					.then((response) => {
						this.setState({
							books: myBooks,
							cart: response.data.carts,
							displayedBooks: this.getDisplayObjects(myBooks),
						});
					});
			} else {
				this.setState({
					books: response.data.myBooks.books.books,
					displayedBooks: this.getDisplayObjects(myBooks),
				});
			}
		});
	}

	findMyBook = (pBook) => {
		const myCart = [...this.state.cart];
		let myIndex = -1;

		myCart.forEach((cart) => {
			cart.CartDetails.forEach((elem, index) => {
				if (pBook.id === elem.BookId) {
					myIndex = index;
				}
			});
		});
		return myIndex;
	};

	handleAddBook = (e, pBook) => {
		e.preventDefault();
		const currentUser = this.state.currentUser;
		if (currentUser) {
			const myCart = [...this.state.cart];

			if (myCart && myCart.length > 0) {
				let myIndex = this.findMyBook(pBook);
				if (myIndex !== -1) {
					myCart[0].CartDetails[myIndex].Quantity += 1;
					myCart[0].Total = this.calcTotal(myCart);

					this.updateCartDetail(myCart[0].CartDetails[myIndex]);
					this.updateCart(myCart[0]);
					this.setState({
						cart: myCart,
					});
				} else {
					const myCartDet = {
						CartId: myCart[0].id,
						BookId: pBook.id,
						Quantity: 1,
					};

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
				message: "Not User Logged.",
			});
		}
	};

	updateRating = (event, bookUpd) => {
		bookUpd.Rating = event;
		this.setState({ book: bookUpd });
		console.log(`${backendUrl}/books/${bookUpd.id}`);
		axios
			.put(`${backendUrl}/books/${bookUpd.id}`, bookUpd)
			.then((response) => {});
	};

	getDisplayObjects = (pBooks) => {
		const allBooks = pBooks
			.slice(this.state.offset, this.state.offset + this.state.limit)
			.map((book, index) => {
				return (
					<div className="books" key={book.id}>
						<div>{this.state.message}</div>
						<Link to={`/books/${book.id}`}>
							<img
								key={book.id}
								src={`../booksImages/${book.Img}`}
								alt=""
								className="book-id"
							/>
						</Link>

						<div className="book-info">
							<div className="book-title">
								<Link to={`/books/${book.id}`}>Title: {book.Title}</Link>
							</div>
							<div className="book-price">
								<h4>Price: ${book.Cost}</h4>
							</div>
							<div className="book-rating">
								<ReactStars
									value={book.Rating}
									count={5}
									onChange={(event) => {
										this.updateRating(event, book);
									}}
									size={22}
									activeColor="#ffd700"
									edit={true}
								/>
								<form
									onSubmit={(event) => {
										this.handleAddBook(event, book);
									}}
									className="button-form"
								>
									<input type="submit" value="Add book" className="button" />
								</form>
							</div>
						</div>
					</div>
				);
			});
		return allBooks;
	};

	handlePageChange(pageNumber) {
		this.setState({
			displayedBooks: this.getDisplayObjects(this.state.books),
			activePage: pageNumber,
			offset: (pageNumber - 1) * this.state.limit,
		});

		// axios.get(`${backendUrl}${myPath}?limit=${this.state.limit}&offset=${this.state.offset}`)
		//   .then((response) => {
		//   	this.setState({
		// 	 books: response.data.myBooks.books.books,
		//  		 activePage: pageNumber,
		//  		 offset: (pageNumber-1)*this.state.limit
		//   	});
		// });
	}

	render() {
		console.log("Books-->", this.props.location.search);
		return (
			<div className="book-container">
				<div className="book-collection">
					{/* {allBooks} */}
					{this.state.displayedBooks}
					<div className="book-pagination">
						<div className="pagination">
							<Pagination
								activePage={this.state.activePage}
								itemsCountPerPage={this.state.limit}
								totalItemsCount={this.state.books.length}
								pageRangeDisplayed={Math.ceil(
									this.state.books.length / this.state.limit
								)}
								onChange={this.handlePageChange.bind(this)}
							/>
						</div>
					</div>
				</div>
				<div className="fakeAdvertising">
					<FakeAd />
					<FakePromo />
					<FakeAd />
					{/* <FakePromo /> */}
				</div>
			</div>
		);
	}
}

export default Books;
