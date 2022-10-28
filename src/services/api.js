import axios from "axios";

axios.defaults.headers['X-AUTH-TOKEN'] = '4c79e552-34cb-44cc-bcc7-518299c8e98a';
const api = axios.create({
    baseURL: 'https://futdb.app/'
})

export default api;