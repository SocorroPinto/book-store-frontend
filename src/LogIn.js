import React, { Component } from "react";
import "./LogIn.css";

class LogIn extends Component {
	render() {
		return (
			<div>
				<h1>Log In</h1>
				<form action="/auth/login" method="POST" className="logIn-form">
					<label>Username:</label> <input type="text" name="username" />
					<br />
					<label>Password:</label> <input type="password" name="password" />
					<br />
					<input type="submit" value="Login" className="button" />
					<br />
				</form>
			</div>
		);
	}
}

export default LogIn;
