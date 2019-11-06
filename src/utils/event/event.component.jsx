import CONFIG from '../../config/config.js';

export const events = {
    register
};

function register(name, email, mobile) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, email, mobile})
    };
    console.log("EVENT")

    return fetch(CONFIG.EVENT_REGISTER, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
