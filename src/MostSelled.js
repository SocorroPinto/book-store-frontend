import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Books.css";
import axios from "axios";
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";

class MostSelled extends Component {
	constructor(props) {
		super();
		this.state = {
			mostSelledBooks: [],
		};
	}
	componentDidMount() {
		axios.get(`${backendUrl}/books/mostselled`).then((response) => {
			this.setState({
				mostSelledBooks: response.data.myBooks.books.books,
			});
			console.log(this.state.mostSelledBooks);
		});
	}
	render() {
		console.log(this.state.mostSelledBooks);
		const mostSelledBooks = this.state.mostSelledBooks.map((book) => {
			return (
				<div className="books" key={book.id}>
					<Link to={`/books/${book.id}`}>
						<img src={`./booksImages/${book.Img}`} alt="" className="book-id" />
					</Link>
					<form>
						<input type="submit" value="Add book" className="button" />
					</form>
					<div className="book-info">
						<div className="divBook-item">
							<h3 className="book-item">Title: {book.Title}</h3>
						</div>
						<div className="divBook-item">
							<h3 className="book-item">Cost: {book.Cost}</h3>
						</div>
						<div className="divBook-item">
							<h3 className="book-item">Rating: {book.Rating}</h3>
						</div>
					</div>
				</div>
			);
		});
		return (
			<div>
				<div className="book-collection">{mostSelledBooks}</div>;
			</div>
		);
	}
}

export default MostSelled;
