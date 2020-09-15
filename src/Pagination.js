import React, { Component } from "react";

var ceil = require("math-ceil");

class Pagination extends Component {
	constructor(props) {
		super();
		this.state = {
			activePage: 1,
			itemsPerPage: 6,
			totalBooks: 0,
			pageRangeDisplay: 2,
			offset: 0,
		};
	}

	componentDidMount() {
		console.log("component did mount");

		this.setState({
			totalBooks: this.props.totalBooks,
			pages: ceil(this.props.totalBooks / this.state.itemsPerPage),
		});
	}
	render() {
		console.log("Pagination Component");
		for (let i = 0; i < this.state.pages; i++) {
			console.log(
				`${this.props.backendUrl}${this.props.myPath}?limit=${this.state.itemsPerPage}&offset=${this.state.offset}`
			);
			// <a
			// 	href={`${this.props.backendUrl}${this.props.myPath}?limit=${this.state.itemsPerPage}&offset=${this.state.offset}`}
			// >
			// 	1
			// </a>;
		}
		return (
			<div>
				<div>Pagination</div>
			</div>
		);
	}
}

export default Pagination;
