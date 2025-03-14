import axios from "axios";

const API_URL = "http://localhost:9091/Admin/auth/";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(API_URL + "signin", {
        username,
        password
      });
      
      if (response.data.accessToken) {
        localStorage.setItem("admin", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error("Credentials are incorrect.");
      }
    } catch (error) {
      // Handle specific error cases or return a generic message
      if (error.response && error.response.status === 401) {
        throw new Error("Invalid username or password.");
      } else {
        throw new Error("Login failed. Please try again later.");
      }
    }
  }

  logout() {
    localStorage.removeItem("admin");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("admin"));
  }
}

export default new AuthService();
