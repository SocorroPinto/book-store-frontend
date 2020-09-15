import React, { Component } from "react";
import "./BookDetails.css";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";

class BookDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookDetail: [],
		};
	}
	componentDidMount() {
		console.log(`${backendUrl}${this.props.match.url}`);
		axios.get(`${backendUrl}${this.props.match.url}`).then((response) => {
			this.setState({
				bookDetail: response.data.book,
			});
		});
		console.log(this.state.bookDetail);
	}
	render() {
		return (
			<div className="bookDetail">
				<div className="bookDet-Img">
					<img
						src={`../booksImages/${this.state.bookDetail.Img}`}
						alt=""
						id="bookImg"
					/>
				</div>

				<div className="bookDet-info">
					<div className="bookDet-header">
						<h2>Title: {this.state.bookDetail.Title}</h2>
						<h4>Author: {this.state.bookDetail.Author}</h4>
					</div>
					<div className="bookDet-rating">
						<h4>Author: {this.state.bookDetail.Rating}</h4>
						<h4>Rating:</h4>
						<ReactStars
							value={this.state.bookDetail.Rating}
							count={5}
							size={22}
							activeColor="#ffd700"
							edit={false}
						/>
					</div>
					<div className="bookDet-extraInfo">
						<div className="book-rating"></div>
						<h3>Publication year: {this.state.bookDetail.PublicationYear}</h3>
						<h3>Pages: {this.state.bookDetail.Pages}</h3>
						<h3>Price: {this.state.bookDetail.Cost}</h3>
						<h3>Language: {this.state.bookDetail.Language}</h3>{" "}
					</div>
					<div>
						<h3>Description: {this.state.bookDetail.Descriiption}</h3>
						<h3>Summary: {this.state.bookDetail.Summary}</h3>
					</div>
				</div>
			</div>
		);
	}
}

export default BookDetails;
