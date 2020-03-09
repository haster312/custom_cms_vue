import Axios from "axios";
import URLs from '../config/api_url';
const apiURL = (process.env.API_URL != undefined) ? process.env.API_URL : 'http://custom.cms/cms/';
Axios.defaults.widget = true;

export default {
    URLs: URLs,
    getAPI(url, context, cb) {
        Axios.get(apiURL + url)
            .then(res => {
                // handle success
                cb(context, res, null)
            }).catch(error => {
                cb(context, null, error.response)
            });
    },
    postAPI(url, data, context, cb) {
        Axios.post(apiURL + url, data)
            .then(res => {
                // handle success
                cb(context, res, null)
            }).catch(error  => {
                cb(context, null, error.response)
            });
    },
    putAPI(url, data, context, cb) {
        Axios.put(apiURL + url, data)
            .then(res => {
                // handle success
                cb(context, res, null)
            }).catch(error  => {
            cb(context, null, error.response)
        });
    },
    deleteAPI(url, context, cb) {
        Axios.delete(apiURL + url)
            .then(res => {
                // handle success
                cb(context, res, null)
            }).catch(error  => {
                cb(context, null, error.response)
            });
    }
};