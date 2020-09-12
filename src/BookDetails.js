import React, { Component } from "react";
import "./BookDetails.css";

class BookDetails extends Component {
	render() {
		const bookDetail = this.props.books.find((book) => {
			return book.id == this.props.match.params.id;
		});
		console.log({ bookDetail });

		return (
			<div className="bookDetail">
				<img src={`../booksImages/${bookDetail.Img}`} alt="" id="bookImg" />

				<h2>Title: {bookDetail.Title}</h2>
				<h2>Img: {bookDetail.Img}</h2>
				<h3>Author: {bookDetail.Author}</h3>
				<h3>Description: {bookDetail.Descriiption}</h3>
				<h3>Publication year: {bookDetail.PublicationYear}</h3>
				<h3>Pages: {bookDetail.Pages}</h3>
				<h3>Price: {bookDetail.Cost}</h3>
				<h3>Summary: {bookDetail.Summary}</h3>
				<h3>Rating: {bookDetail.Rating}</h3>
				<h3>Language: {bookDetail.Language}</h3>
			</div>
		);
	}
}

export default BookDetails;
