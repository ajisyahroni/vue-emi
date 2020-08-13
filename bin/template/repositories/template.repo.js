/**
 * ================================
 * ${ repoOptions.repo } REPO
 * 
 * ================================
 */
// change if you doesnt have api interface
import API from '../api'
const endpoint_domain = '${repoOptions.repo.toLocaleLowerCase()}' // just for example

export default {
    /**
    * GET POST PUT DELETE TO REST API
    * @param body object , id int
    * @return object
    */

    get() {
        return API.get('/${repoOptions.repo.toLocaleLowerCase()}/all')
    },
    find(id) {
        return API.get('/${repoOptions.repo.toLocaleLowerCase()}/' + id)
    },
    post(body) {
        return API.post('/${repoOptions.repo.toLocaleLowerCase()}/create', body)
    },
    put(id, body = {}) {
        return API.put('/${repoOptions.repo.toLocaleLowerCase()}/update/' + id, body)
    },
    delete(id) {
        return API.delete('/${repoOptions.repo.toLocaleLowerCase()}/delete/' + id)
    }
}