/**
 * ================================
 * ${ repoName } REPOSITORY
 * 
 * ================================
 */
// change if you doesnt have api interface
import API from '../api'
const endpoint_domain = '${repoName.toLocaleLowerCase()}' // just for example

export default {
    /**
    * GET POST PUT DELETE TO REST API
    * @param {object} body  ,  
    * @param {int} id or anyting else
    * @return {Promise}
    */

    get() {
        return API.get('/${repoName.toLocaleLowerCase()}/all')
    },
    find(id) {
        return API.get('/${repoName.toLocaleLowerCase()}/' + id)
    },
    post(body) {
        return API.post('/${repoName.toLocaleLowerCase()}/create', body)
    },
    put(id, body = {}) {
        return API.put('/${repoName.toLocaleLowerCase()}/update/' + id, body)
    },
    delete(id) {
        return API.delete('/${repoName.toLocaleLowerCase()}/delete/' + id)
    }
}