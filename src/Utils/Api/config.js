import axios from 'axios';


// const serverUrl = 'http://46.224.6.83:8026/api';
const serverUrl = 'http://om-api-test.hiweb.ir/api';


export const instance = axios.create({
    baseURL: serverUrl,
    timeout: 50000,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

export default instance;
