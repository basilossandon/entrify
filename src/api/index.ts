import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8880',
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: [
        (data) => {
            return JSON.stringify(data);
        },
    ],
    transformResponse: [
        (data) => {
            return JSON.parse(data);
        },
    ],
});

export default instance;

