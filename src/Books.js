import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./Books.css";
import FakePromo from "./FakePromo";
import FakeAd from "./FakeAd";
import ReactStars from "react-rating-stars-component";
import BookDetails from "./BookDetails";
import Pagination from "react-js-pagination";
import axios from "axios";
// import Pagination from "./Pagination";

const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";
let myPath = "";

class Books extends Component {
	constructor(props) {
		super();
		this.state = {
			books: [],
			limit: 30,
			offset: 0,
			newRating: 0,
			activePage: 1,
		};
	}

	componentDidMount() {
		myPath =
			this.props.location.pathname === "/"
				? "/books"
				: this.props.location.pathname;

		axios
			.get(
				`${backendUrl}${myPath}?limit=${this.state.limit}&offset=${this.state.offset}`
			)
			.then((response) => {
				this.setState({
					books: response.data.myBooks.books.books,
				});
			});
	}

	updateRating = (event, bookUpd) => {
		bookUpd.Rating = event;
		this.setState({ book: bookUpd });
		console.log(`${backendUrl}/books/${bookUpd.id}`);
		axios
			.put(`${backendUrl}/books/${bookUpd.id}`, bookUpd)
			.then((response) => {});
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
						<div className="book-rating">
							<form
								onSubmit={(event) => {
									this.updateRating(event, book.id);
								}}
							>
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
							<Route
								path="/books/mostselled"
								component={(routerProps) => (
									<BookDetails {...routerProps} books={this.state.books} />
								)}
							/>
							<Route
								path="/books/mostrated"
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
					<FakeAd />
					<FakePromo />
					<FakeAd />
					<FakePromo />
					<FakeAd />
				</div>
			</div>
		);
	}
}

export default Books;
