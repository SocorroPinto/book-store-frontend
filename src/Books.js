import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Books.css";

class Books extends Component {
	render() {
		const allBooks = this.props.books.map((book) => {
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
		console.log(this.props.books);
		return <div className="book-collection">{allBooks}</div>;
	}
}

export default Books;
