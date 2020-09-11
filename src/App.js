import React, { Component } from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import SignUp from "./SignUp.js";
import LogIn from "./LogIn.js";
import LogOut from "./LogOut.js";
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";

class App extends Component {
	constructor(props) {
		super();
		this.state = {
			users: [],
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
					<div className="App-title">
						<h1>Owl Books Store </h1>
					</div>
					<div className="App-account">
						<Link to="/auth/signup">Sign Up</Link>
						<Link to="/auth/login">Log In</Link>
						<Link to="/auth/logout">Log Out</Link>
					</div>
					<div id="menuIcons">
						<Link to="/" id="homePage">
							<img alt="" id="iconHomePage" src="./img/HomePage.png" />
						</Link>
					</div>
					<main>
						<Switch>
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
						</Switch>
					</main>
				</div>
			</div>
		);
	}
}

export default App;
