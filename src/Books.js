import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Books.css";
import FakePromo from "./FakePromo";
import FakeAd from "./FakeAd";
import ReactStars from "react-rating-stars-component";
import BookDetails from "./BookDetails";
import UpdateRating from "./UpdateRating";
import Pagination from "react-js-pagination";
import axios from "axios";
// import Pagination from "./Pagination";

const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";
let myPath = "";
let idToChange = "";

import axios from "axios";
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";

class Books extends Component {
	constructor(props) {
<<<<<<< HEAD
		super();
		this.state = {
			books: [],
			limit: 6,
			offset: 0,
			newRating: 0,
			activePage: 1,
=======
		super(props);
		this.state = {
			books: [],
			limit: 6,
			offset: 0
>>>>>>> 78c6231adcf99be509257528a9b4a46335aeec64
		};
	}

	componentDidMount() {
<<<<<<< HEAD
		myPath =
			this.props.location.pathname === "/"
				? "/books"
				: this.props.location.pathname;

		axios
			.get(
				`${backendUrl}${myPath}?limit=${this.state.limit}&offset=${this.state.offset}`
			)
			.then((response) => {
=======
		let myPath = this.props.location.pathname;

		if ( myPath == '/books/mostselled') {
			axios.get(`${backendUrl}/books/mostselled?limit=${this.state.limit}&offset=${this.state.offset}`).then((response) => {
>>>>>>> 78c6231adcf99be509257528a9b4a46335aeec64
				this.setState({
					books: response.data.myBooks.books.books,
				});
			});
	}

	updateRating = (event, bookUpd) => {
		console.log("Update rating");
		bookUpd.rating = event;
		this.setState({ book: bookUpd });
		axios.put(`${backendUrl}/books/${bookUpd.id}`, bookUpd).then((response) => {
			console.log(response);
		});
		console.log(bookUpd);
		console.log(bookUpd);
	};

	handlePageChange(pageNumber) {
		console.log(`active page is ${pageNumber}`);
		this.setState({ activePage: pageNumber });
	}

	render() {
		const allBooks = this.state.books.map((book, index) => {
			return (
				<div className="books" key={book.id}>
					<Link to={`/books/${book.id}`}>
						<img
							key={index}
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
						{/* <div className='book-description'>{book.Description}</div> */}
						<div className="book-rating">
							<form
								onSubmit={(event) => {
									this.updateRating(event, book.id);
								}}
							>
								<ReactStars
									count={5}
									onChange={(event) => {
										this.updateRating(event, book);
									}}
									size={22}
									activeColor="#ffd700"
									edit={true}
								/>
							</form>
							<form>
								<input type="submit" value="Add book" className="button" />
							</form>
						</div>
						<div>
							<Route
								path="/books/:id"
								component={(routerProps) => (
									<BookDetails {...routerProps} books={this.state.books} />
								)}
							/>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div className="book-container">
				<div className="book-collection">
					{allBooks}
					<div className="book-pagination">
						<div className="pagination">
							<Pagination
								activePage={this.state.activePage}
								itemsCountPerPage={6}
								totalItemsCount={this.state.books.length}
								pageRangeDisplayed={5}
								onChange={this.handlePageChange}
							/>
							{/* <Pagination
								totalBooks={this.state.books.length}
								backendUrl={backendUrl}
								myPath={myPath}
							/> */}
						</div>
					</div>
				</div>
				<div className="fakeAdvertising">
					<FakeAd/>
                    <FakePromo/>
                    <FakeAd/>
                    <FakePromo/>
                    <FakeAd/> 
				</div>
			</div>
		);
	}
}

export default Books;
