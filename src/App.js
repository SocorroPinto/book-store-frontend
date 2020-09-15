import React, { Component } from "react";
<<<<<<< HEAD
import { Route, Link, Switch } from "react-router-dom";
import SignUp from "./SignUp.js";
import axios from "axios";
import "./App.css";
=======
import { Redirect, Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
// import { Route, Link, Switch } from "react-router-dom";

import AuthService from "./services/auth.service";

import SignUp from "./SignUp.js";
import Profile from "./Profile.js";
>>>>>>> 78c6231adcf99be509257528a9b4a46335aeec64
import LogIn from "./LogIn.js";
import Books from "./Books.js";
<<<<<<< HEAD

const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";
=======
import BookDetails from "./BookDetails.js";
import Cart from "./Cart.js";

>>>>>>> 78c6231adcf99be509257528a9b4a46335aeec64

class App extends Component {
	constructor(props) {
		super();
<<<<<<< HEAD
		this.state = {
			books: [],
			limit: 6,
			offset: 0,
		};
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
=======
		this.logOut = this.logOut.bind(this);

		this.state = {
			currentUser: undefined
		}
	}

	componentDidMount() {
		const user = AuthService.getCurrentUser();

		if (user) {
			this.setState({
				currentUser: AuthService.getCurrentUser(),
			});
		}
	}

	logOut = () => {
		AuthService.logout();
>>>>>>> 78c6231adcf99be509257528a9b4a46335aeec64
	};

	render() {

		const { currentUser } = this.state;

		return (
			<div className="App">
				<header>
					<div className="App-header">
						<div className="App-title">
							<Link to="/" id="homePage">
								<img id="bookStoreimg" alt="" src="../img/OwlBookS.png" />
							</Link>
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
					</div>

					<div className="App-subheader">
						<Link to="/" id="Cart">
							<img
								alt=""
								className="iconHomePage"
								src="https://img.pngio.com/digicollect-cart-icon-png-download-submit-order-icon-cart-icon-png-840_880.png"
							/>
						</Link>
<<<<<<< HEAD
						<Link to="/">All books</Link>
						<Link to="/books/mostselled">Most Selled</Link>
						<Link to="/books/mostrated">Most Rated</Link>
						<div className="searchingBooks">
							<label className="subheader-item">Search:</label>
							<input className="inputField" type="text" name="search" />
							<img
								id="searchImage"
								alt=""
								src="https://freeiconshop.com/wp-content/uploads/edd/search-var-flat.png"
								className="iconHomePage"
							/>
						</div>
=======
						<h1>Owl Books Store </h1>
					</div>
					<div className="App-account">
						<Link className="account-item" to="/auth/signup">
							Sign Up
						</Link>
						{ currentUser && (<Link className="account-item" to="/profile">
							Profile
										</Link>  )}

						<Link className="account-item" to="/auth/login">
							Log In
						</Link>
						{ currentUser && (<Link className="account-item" to="/auth/logout" 	onClick={this.logOut} >
							Log Out
						</Link>  )}
					</div>
				</div>

				<div className="App-subheader">
					<Link to="/cart" id="Cart">
						<img
							alt=""
							className="iconHomePage"
							src="https://img.pngio.com/digicollect-cart-icon-png-download-submit-order-icon-cart-icon-png-840_880.png"
						/>
					</Link>
					<Link to="/" >
						All books
					</Link>
					<Link to="/books/mostselled">
						Most Selled
					</Link>
					<Link to="/books/mostrated" >
						Most Rated
					</Link>
					<div className="searchingBooks">
						<label className="subheader-item" >Search:</label>
						<input className="inputField" type="text" name="search" />
						<img id="searchImage"
							alt=""
							src="https://freeiconshop.com/wp-content/uploads/edd/search-var-flat.png"
							className="iconHomePage"
						/>
>>>>>>> 78c6231adcf99be509257528a9b4a46335aeec64
					</div>
				</header>
				<main className="mainHomePage">
					<Switch>
						<Route
							exact
							path={["/", "/books"]}
							component={(routerProps) => (
								<Books {...routerProps}  />
							)}
						/>
						<Route
							path="/cart"
							component={(routerProps) => <Cart {...routerProps}  />}
						/>
						<Route
							path="/books/mostrated"
<<<<<<< HEAD
							component={(routerProps) => <Books {...routerProps} />}
						/>
						<Route
							path="/books/mostselled"
							component={(routerProps) => <Books {...routerProps} />}
=======
							component={(routerProps) => <Books {...routerProps}  />}
						/>
						<Route
							path="/books/mostselled"
							component={(routerProps) => <Books {...routerProps}  />}
>>>>>>> 78c6231adcf99be509257528a9b4a46335aeec64
						/>
						<Route
							exact path="/auth/signup"
							component={(routerProps) => (
								<SignUp {...routerProps} />
								// <SignUp {...routerProps} addUser={this.addUser} />
							)}
						/>
						{ currentUser && (
						<Route
							exact path="/profile"
							component={(routerProps) => (
								<Profile {...routerProps} />
								// <SignUp {...routerProps} addUser={this.addUser} />
							)}
						/> )}
						<Route
							exact path="/auth/login"
							component={(routerProps) => (
								<LogIn {...routerProps} />
								// <LogIn {...routerProps} validateUser={this.validateUser} />
							)}
						/>
<<<<<<< HEAD
=======
						{ currentUser && (<Route
							exact path="/auth/logout"
							component={(routerProps) => <LogIn {...routerProps} />}
						/>)}
						<Route
							path="/books/:id"
							component={(routerProps) => (
								<BookDetails {...routerProps} books={this.state.books} />
							)}
						/>
>>>>>>> 78c6231adcf99be509257528a9b4a46335aeec64
					</Switch>
				</main>
				{/* <aside className="asideHomePage"></aside> */}
				{/* <footer className="footer">
					<div>footer</div>
				</footer> */}
			</div>
		);
	}
}

export default App;
