import axios from "axios";
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000/api";

class AuthService {
    login(username, password) {
        return axios.post(`${backendUrl}/auth/login/`, {
            username,
            password
        }).then(response => {
            if (response.data.myUser.token) {
                localStorage.setItem("user", JSON.stringify(response.data.myUser));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(name, username, password, email) {
        return axios.post(`${backendUrl}/auth/signup/`, {
            name, 
            username,
            password,
            email
        }).then((response) => {
            console.log(response);
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }

}

export default new AuthService();