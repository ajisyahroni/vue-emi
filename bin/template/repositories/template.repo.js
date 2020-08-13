/**
 * ================================
 * ${ repoOptions.repo } REPO
 * 
 * ================================
 */
// change if you doesnt have api interface
import API from '../api'
const endpoint_domain = "blog" // just for example

export default {
    /**
    * GET POST PUT DELETE TO REST API
    * @param body object , id int
    * @return object
    */

    get() {
        return API.get('/tweets/all')
    },
    find(id) {
        return API.get('/tweets/all' + id)
    },
    post(body) {
        return API.post('/tweets', body)
    },
    put(id, body = {}) {
        return API.put('/tweets/' + id, body)
    },
    delete(id) {
        return API.delete('/tweets/' + id)
    }
}