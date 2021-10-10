

const login = (username, password) => {}


const saveToken = (token) => {
    sessionStorage['token'] = token;
}

export default {login, saveToken}