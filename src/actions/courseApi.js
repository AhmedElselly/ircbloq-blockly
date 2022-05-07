import axios from 'axios';
import "regenerator-runtime/runtime.js";

const url = 'https://ircbackend.herokuapp.com/api/courses';

export const getAllCourses = async () => {
    const res = await axios.get(`${url}`);
    return res;
}
