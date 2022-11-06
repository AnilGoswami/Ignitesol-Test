
// ** Axios
import axios from 'axios'
import { baseURL } from './EndPoints'

export const getBookData = (params, callback) => {

    axios
        .get(baseURL + "books/" + params)
        .then(res => {
            if (res) {
                callback(res.data)
            }
        })
        .catch(err => {
            console.log('err', err)
        })
}
