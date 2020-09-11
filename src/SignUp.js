import React, { Component } from "react";
import "./SignUp.css";

class SignUp extends Component {
	render() {
		return (
			<div>
				<h1>Sign Up</h1>
				<form
					className="signUp-form"
					action="/auth/signup"
					onSubmit={this.props.addUser}
				>
					<label>Name:</label> <input type="text" name="name" />
					<br />
					<label>Username:</label>
					<input type="text" name="username" />
					<br />
					<label>Password:</label> <input type="password" name="password" />
					<br />
					<input type="submit" value="SignUp" className="button" />
				</form>
			</div>
		);
	}
}

export default SignUp;
