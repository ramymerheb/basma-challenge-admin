import axios from "axios";
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

class AuthenticationService {
  config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  };
  signin = async (fd) => {
    return axios
      .post(BACKEND_BASE_URL + "/admin/auth/login", fd)
      .then((response) => {
        console.log(response);
        if (response.data) {
          localStorage.setItem("jwt", response.data.access_token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          return true
        }
        return response.data;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Wrong email or password");
        }
        console.log(err.response.status);
        throw err;
      });
  };

  signOut = async () => {
    console.log("Test");
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  }

  refresh = async () => {
    console.log("step")

    return axios
      .post(BACKEND_BASE_URL + "/admin/auth/refresh", {}, this.config)
      .then((response) => {
        if (response.data) {
          console.log("step1.2")
          console.log(
         response.data.access_token

          )

          localStorage.setItem("jwt", response.data.access_token);
          console.log("step1.3")
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return
      })
      .catch((error) => {
        console.log("Error!", error);
      });
  }
}

export default new AuthenticationService();
