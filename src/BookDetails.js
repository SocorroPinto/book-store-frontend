import React, { Component } from "react";
import "./BookDetails.css";

class BookDetails extends Component {
	constructor(props) {
		super();
		this.state = {
			book: null,
		};
	}

	render() {
		const bookDetail = this.props.books.find((book) => {
			return book.id == this.props.match.params.id;
		});
		return (
			<div className="bookDetail">
				console.log("Book Details");
				{/* <img src={`../booksImages/${bookDetail.Img}`} alt="" id="bookImg" />
				<div className="bookDet-header">
					<h2>Title: {bookDetail.Title}</h2>
					<h3>Author: {bookDetail.Author}</h3>
				</div>
				<div>
					<div className="book-rating">
						<h5>Raiting</h5> */}
				{/* 	<span className={vClassRatingChecked}></span>
						<span className="fa fa-star"></span>
						<span className="fa fa-star"></span>
						<span className="fa fa-star"></span>
						<span className="fa fa-star"></span> */}
				{/* </div>
					<h3>Publication year: {bookDetail.PublicationYear}</h3>
					<h3>Pages: {bookDetail.Pages}</h3>
					<h3>Price: {bookDetail.Cost}</h3>
					<h3>Language: {bookDetail.Language}</h3>{" "}
				</div>
				<div>
					<h3>Description: {bookDetail.Descriiption}</h3>
					<h3>Summary: {bookDetail.Summary}</h3>
				</div> */}
			</div>
		);
	}
}

export default BookDetails;
