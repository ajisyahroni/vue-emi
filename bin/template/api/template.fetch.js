import config from './config'
const api = config.baseURL;

const options = (method = 'GET', body = {}) => {
    let s = JSON.stringify;
    return {
        method: method,
        body: s(body),
        headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer JWT_TOKEN`
        }
    }
}

export default {
    get(url = "") {
        return fetch(`${api}${url}`).then(r => r.json())
    },
    post(url, body) {
        return fetch(`${api}${url}`, options('POST', body)).then(r => r.json())
    },
    put(url, body) {
        return fetch(`${api}${url}`, options('PUT',body)).then(r => r.json())
    },
    delete(url) {
        return fetch(`${api}${url}`, options('DELETE')).then(r => r.json())
    }
}