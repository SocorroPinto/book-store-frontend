import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Books.css";
import FakePromo from "./FakePromo";
import FakeAd from "./FakeAd";

import axios from "axios";
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";

class Books extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			limit: 6,
			offset: 0
		};
	}

	componentDidMount() {
		let myPath = this.props.location.pathname;

		if ( myPath == '/books/mostselled') {
			axios.get(`${backendUrl}/books/mostselled?limit=${this.state.limit}&offset=${this.state.offset}`).then((response) => {
				this.setState({
					books: response.data.myBooks.books.books,
				});
			});
		} else if ( myPath == '/books/mostrated') {
			axios.get(`${backendUrl}/books/mostrated?limit=${this.state.limit}&offset=${this.state.offset}`).then((response) => {
				this.setState({
					books: response.data.myBooks.books.books,
				});
			});
		} else {
			axios.get(`${backendUrl}/books?limit=${this.state.limit}&offset=${this.state.offset}`).then((response) => {
				this.setState({
					books: response.data.myBooks.books.books,
				});
			});
		}
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
							<h5>Raiting</h5>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star"></span>
							<span className="fa fa-star"></span>
						</div>
						<form>
							<input type="submit" value="Add book" className="button" />
						</form>
					</div>
				</div>
			);
		});

		return (
			<div className="book-container">
				<div className="book-collection">
					{allBooks}
					<div className="book-pagination">
						<div><Link>{'<<<'} Prev</Link></div>
						<div><Link>Next{'>>>'}</Link></div>
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
