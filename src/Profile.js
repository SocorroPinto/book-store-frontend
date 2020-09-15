import React, { Component } from "react";
import AuthService from "./services/auth.service";
import "./Profile.css";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        }
    }

    render() {
        const { currentUser } = this.state;
        console.log(currentUser);

        return( <div className="jumbotron">
            { currentUser && (<div> <h2>
                <strong>
                    Welcome {currentUser.name}
                </strong>
            </h2>
            <h3>
                {"Profile: "} 
                <strong>
                    {currentUser.username}
                </strong>
                
            </h3>
            <p>
                <strong>Id:</strong>{" "}
                {currentUser.id} 
            </p>
            <p>
                <strong>Email:</strong>{" "}
                    {currentUser.email} 
            </p> </div>) }
            { !currentUser && (<div> <h2>
                <strong>
                    Not User Logged.
                </strong>
            </h2>
           </div>) }
        </div>);
    }
}

export default Profile;