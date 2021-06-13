import axios from "axios";
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

class ClientService {

   getClients = async (url) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
  };

     console.log('config ', config)
      return axios.get(url, config)
        .then(response => {
          return response.data;
        })
        .catch(err => {
          if(err.response.status === 401){
            alert("Wrong email or password");
          }
          console.log(err.response.status);
          return false;
        });
  }

  getCount = async (duration) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
  };

      return axios.get(BACKEND_BASE_URL+'/admin/client/count/'+duration, config)
        .then(response => {
          return response;
        })
        .catch(err => {
          if(err.response.status === 401){
            alert("Wrong email or password");
          }
          console.log(err.response.status);
          return false
        });
  }
}

export default new ClientService();