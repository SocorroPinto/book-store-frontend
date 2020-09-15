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
		console.log("this.props.match.url", this.props.match.url);
		axios.get(`${backendUrl}${this.props.match.url}`).then((response) => {
			this.setState({
				bookDetail: response.data.book,
			});
		});
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
					<form>
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
						<h5>Rating: {this.state.bookDetail.Rating}</h5>
						<h5>
							<label>Rating:</label>
						</h5>
						<ReactStars
							value={this.state.bookDetail.Rating}
							count={5}
							size={22}
							activeColor="#ffd700"
							edit={false}
						/>
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
					<div class Name="bookDet-summary">
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
