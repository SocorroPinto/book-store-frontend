import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import SignUp from "./SignUp.js";
import Profile from "./Profile.js";
import LogIn from "./LogIn.js";
import Books from "./Books.js";
import BookDetails from "./BookDetails.js";
import Cart from "./Cart.js";

class App extends Component {
	constructor(props) {
		super();
		this.logOut = this.logOut.bind(this);

		this.state = {
			currentUser: undefined,
		};
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
					</div>
					<div className="App-account">
						<Link className="account-item" to="/auth/signup">
							Sign Up
						</Link>
						{currentUser && (
							<Link className="account-item" to="/profile">
								Profile
							</Link>
						)}

						<Link className="account-item" to="/auth/login">
							Log In
						</Link>
						{currentUser && (
							<Link
								className="account-item"
								to="/auth/logout"
								onClick={this.logOut}
							>
								Log Out
							</Link>
						)}
					</div>

					<div className="App-subheader">
						<Link to="/cart" id="Cart">
							<img
								alt=""
								className="iconHomePage"
								src="https://img.pngio.com/digicollect-cart-icon-png-download-submit-order-icon-cart-icon-png-840_880.png"
							/>
						</Link>
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
					</div>
				</header>
				<main className="mainHomePage">
					<Switch>
						<Route
							exact
							path={["/", "/books"]}
							component={(routerProps) => <Books {...routerProps} />}
						/>
						<Route
							exact
							path="/cart"
							component={(routerProps) => <Cart {...routerProps} />}
						/>
						<Route
							path="/books/mostrated"
							component={(routerProps) => <Books {...routerProps} />}
						/>
						<Route
							path="/books/mostselled"
							component={(routerProps) => <Books {...routerProps} />}
						/>
						<Route
							path="/books/:id"
							component={(routerProps) => <BookDetails {...routerProps} />}
						/>
						<Route
							exact
							path="/auth/signup"
							component={(routerProps) => (
								<SignUp {...routerProps} />
								// <SignUp {...routerProps} addUser={this.addUser} />
							)}
						/>
						{currentUser && (
							<Route
								exact
								path="/profile"
								component={(routerProps) => (
									<Profile {...routerProps} />
									// <SignUp {...routerProps} addUser={this.addUser} />
								)}
							/>
						)}
						<Route
							exact
							path="/auth/login"
							component={(routerProps) => (
								<LogIn {...routerProps} />
								// <LogIn {...routerProps} validateUser={this.validateUser} />
							)}
						/>
						{currentUser && (
							<Route
								exact
								path="/auth/logout"
								component={(routerProps) => <LogIn {...routerProps} />}
							/>
						)}
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
