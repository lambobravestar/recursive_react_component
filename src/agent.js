import axios from "axios";

const API_ROOT = "http://localhost:3000";

const responseBody = res => res;

let token = null;

const headers = () => {
    return {
        'Content-Type': 'application/json',
        'authorization': `Token ${token}`
    }
}

const requests = {
    get: url => 
        axios.get(`${API_ROOT}${url}`).then(responseBody),
    post: (url, body) => 
        axios.post(`${API_ROOT}${url}`, body).then(responseBody).catch(err => {console.log("login api res error:", err)}),
    getWithToken: url => 
        axios.get(`${API_ROOT}${url}`, { headers: headers() }).then(responseBody),
    postWithToken: (url, body) => 
        axios.post(`${API_ROOT}${url}`, body, { headers: headers() }).then(responseBody),

}

const Auth = {
    login: (username, password) =>
        requests.post('/users/login', { username, password }),
    register: (username, password, email) =>
        requests.post("/users/signup", {username,password,email})
}


export default {
    Auth,
    setToken : _token => {
        token = _token;
    }
};