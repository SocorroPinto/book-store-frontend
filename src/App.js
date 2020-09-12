import React, { Component } from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import SignUp from "./SignUp.js";
import LogIn from "./LogIn.js";
import LogOut from "./LogOut.js";
import Books from "./Books.js";
import BookDetails from "./BookDetails.js";
import MostSelled from "./MostSelled.js";
import MostRated from "./MostRated.js";
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";

class App extends Component {
	constructor(props) {
		super();
		this.state = {
			books: [],
		};
	}
	componentDidMount() {
		axios.get(`${backendUrl}/books`).then((response) => {
			this.setState({
				books: response.data.myBooks.books.books,
			});
		});
	}

	addUser = (e) => {
		axios
			.post(`${backendUrl}/auth/signup`, {
				name: e.target.name.value,
				username: e.target.username.value,
				password: e.target.password.value,
				email: e.target.email.value,
			})
			.then((response) => {
				console.log(response);
			});
		console.log(e.target.name.value);
	};
	validateUser = (e) => {
		console.log(e.target.username.value);
		console.log(e.target.password.value);
		axios
			.post(`${backendUrl}/auth/login`, {
				username: e.target.username.value,
				password: e.target.password.value,
			})
			.then((response) => {
				console.log(response);
			});
	};
	logOut = (e) => {
		console.log(e.target.value);
		axios.get(`${backendUrl}/auth/logout`).then((response) => {
			console.log(response);
		});
	};
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img id="bookStoreimg" alt="" src="./img/owlBookStore.png" />
					<div className="App-title">
						<h1>Owl Books Store </h1>
					</div>
					<div className="App-account">
						<Link className="account-item" to="/auth/signup">
							Sign Up
						</Link>
						<Link className="account-item" to="/auth/login">
							Log In
						</Link>
						<Link className="account-item" to="/auth/logout">
							Log Out
						</Link>
					</div>
					<div id="menuIcons">
						<Link to="/" id="homePage">
							<img alt="" className="iconHomePage" src="./img/HomePage.png" />
						</Link>
					</div>
				</div>

				<div className="App-subheader">
					<Link to="/" className="subheader-item">
						All books
					</Link>
					<Link to="/books/mostselled" className="subheader-item">
						Most Selled
					</Link>
					<Link to="/books/mostrated" className="subheader-item">
						Most Rated
					</Link>
					<label>Search:</label>
					<input className="inputField" type="text" name="search" />
					<img alt="" src="./img/search.png" className="iconHomePage" />
					<Link to="/" id="Cart">
						<img alt="" className="iconHomePage" src="./img/basket.png" />
					</Link>
				</div>
				<main className="mainHomePage">
					<Switch>
						<Route
							exact
							path="/"
							component={(routerProps) => (
								<Books {...routerProps} books={this.state.books} />
							)}
						/>
						<Route
							path="/books/mostrated"
							component={(routerProps) => <MostRated {...routerProps} />}
						/>
						<Route
							path="/books/mostselled"
							component={(routerProps) => <MostSelled {...routerProps} />}
						/>
						<Route
							path="/auth/signup"
							component={(routerProps) => (
								<SignUp {...routerProps} addUser={this.addUser} />
							)}
						/>
						<Route
							path="/auth/login"
							component={(routerProps) => (
								<LogIn {...routerProps} validateUser={this.validateUser} />
							)}
						/>
						<Route
							path="/auth/logout"
							component={(routerProps) => <LogOut {...routerProps} />}
						/>
						<Route
							path="/books/:id"
							component={(routerProps) => (
								<BookDetails {...routerProps} books={this.state.books} />
							)}
						/>
					</Switch>
				</main>
				<aside className="asideHomePage"></aside>
				{/* <footer className="footer">
					<div>footer</div>
				</footer> */}
			</div>
		);
	}
}

export default App;
