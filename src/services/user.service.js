import axios from "axios";
import authHeader from "./auth-header";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api";

class UserService {
    getPublicContent() {
        return axios.get(backendUrl + 'all');
    }

    getUserBoard() {
        return axios.get(backendUrl + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(backendUrl + 'mod', { headers: authHeader() });        
    }

    getAdminBoard() {
        return axios.get(backendUrl + 'admin', { headers: authHeader() });            
    }
}

export default new UserService();

