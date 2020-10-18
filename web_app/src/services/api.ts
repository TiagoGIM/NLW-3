import axios from 'axios';

const api = axios.create({
    //endpoint backend
    baseURL:'http://localhost:3333',

});
export default api;