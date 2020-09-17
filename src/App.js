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
import CartHistory from "./CartHistory.js";
let searchBook = "";

class App extends Component {
	constructor(props) {
		super();
		this.logOut = this.logOut.bind(this);

		this.state = {
			currentUser: undefined,
			searchTxt: "",
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
	changeSearchTxt = (e) => {
		//console.log("Search", `${backendUrl}/books/search?tag=${e.target.value}`);
		// axios
		// 	.get(`${backendUrl}/books/search?tag=${e.target.value}`)
		// 	.then((response) => {
		// 		console.log("after axios ", response.data.myBooks.books.books);
		searchBook = e.target.value;
		console.log(e.target.value);
		console.log("searchBook-->", searchBook);
		if (e.onKeyPress == 13) {
			this.handleSearchBook(e);
		}
	};
	handleSearchBook = (event) => {
		console.log("searchBook-->", searchBook);
		this.state = {
			searchTxt: searchBook,
		};
	};
	render() {
		const { currentUser } = this.state;
		console.log(this.state.searchTxt);
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
						{currentUser  && (
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
						<Link to="/carthistory" id="Cart">
							<img id="historyIcon" alt="" src="../img/historyIcon.png" />
						</Link>
						<Link to="/">All books</Link>
						<Link to="/books/mostselled">Most Selled</Link>
						<Link to="/books/mostrated">Most Rated</Link>
						<div className="searchingBooks">
							<label className="subheader-item">Search:</label>
							<form
								onSubmit={(event) => {
									this.handleSearchBook(event);
								}}
							>
								<input
									className="inputField"
									type="text"
									name="search"
									onKeyPress={(event) => {
										this.changeSearchTxt(event);
									}}
								/>
							</form>

							<img
								id="searchImage"
								alt=""
								src="https://freeiconshop.com/wp-content/uploads/edd/search-var-flat.png"
								className="iconHomePage"
								onClick={(event) => {
									this.searchBook(event);
								}}
							/>
						</div>
					</div>
				</header>
				<main className="mainHomePage">
					<Switch>
						<Route
							exact
							path={["/", "/books"]}
							component={(routerProps) => (
								<Books {...routerProps} searchBook={this.state.searchTxt} />
							)}
						/>
						<Route
							exact
							path="/cart"
							component={(routerProps) => <Cart {...routerProps} />}
						/>
						<Route
							exact
							path="/carthistory"
							component={(routerProps) => <CartHistory {...routerProps} />}
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
							path="/books/search"
							component={(routerProps) => (
								<Books {...routerProps} searchTxt={this.state.searchTxt} />
							)}
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
				<footer className="footer">
					<div>
						<ul>
							Contacts:
							<li>Socorro Pinto </li>
							<li>Gladys Cruz </li>
						</ul>
					</div>
				</footer>
			</div>
		);
	}
}

export default App;
