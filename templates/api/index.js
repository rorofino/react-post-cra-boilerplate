import { SubmissionError } from 'redux-form'

const baseUrl = "http://localhost:8000";

export default {
    User: {
        Login: login,
        Register: registerUser
    }
};

let loggedUser = localStorage.getItem('loggedUser');;

function fetchApi(url, body, method) {
    const methodFinal = !method ? (body != null ? 'POST' : 'GET') : method;
    return fetch(url, {
        method: methodFinal,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': loggedUser.token 
        },
        body: (methodFinal.toLowerCase() === 'post' || methodFinal.toLowerCase() === 'put')  ? JSON.stringify(body) : null
    }).then((response) => 
        new Promise(async function (resolve, reject) {
        if (response.ok) {
            resolve(await response.json());
        } else {
            var erroText = await response.text();
            try {
                var parsedError = JSON.parse(erroText);
                reject(parsedError);
                throw new SubmissionError(parsedError);
            } catch (e) {
                reject(erroText);
            }
        }
    }));
}

function login(loginObj) {
    return fetchApi(baseUrl + "/login", loginObj)
        .then((jsonResult) => new Promise(function (resolve, reject) {
            loggedUser = jsonResult;
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            resolve(jsonResult);
        }));
}

function registerUser(postParam) {
    return fetchApi(baseUrl + "/register", postParam);
}