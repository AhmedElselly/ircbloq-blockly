import axios from 'axios';
import "regenerator-runtime/runtime.js";

const url = 'https://ircbackend.herokuapp.com/api/posts';

export const create = async (formData, userId, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.post(`${url}/create/image/${userId}`, formData);
    return res;
}
