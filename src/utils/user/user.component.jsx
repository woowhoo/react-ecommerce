import CONFIG from '../../config/config.js';


export const user = {
    login,
    logout,
    register
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(CONFIG.USER_LOGIN, requestOptions)
        .then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    };

    return fetch(CONFIG.USER_SIGNUP, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if (data.length === 0){
          return null;
        }
        return data;
    });
}
