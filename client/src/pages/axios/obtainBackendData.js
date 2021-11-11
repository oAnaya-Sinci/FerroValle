import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:5000/api/',
    json: true
})

export default {

    execute(method, resource, data) {

        const accessToken = Vue.prototype.$auth.getAccessToken();

        console.log(accessToken);

        return client({
            method,
            url: resource,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(req => {
            return req.data
        })
    },

    getCoordinates() {
        return this.execute('get', 'obtainCoordinates/')
    },

    // getById(id) {
    //     return this.execute('get', `/${id}`)
    // },
    // create(data) {
    //     return this.execute('post', '/', data)
    // },
    // update(id, data) {
    //     return this.execute('put', `/${id}`, data)
    // },
}