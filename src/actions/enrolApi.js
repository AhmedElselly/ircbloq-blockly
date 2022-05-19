import axios from 'axios';

// const url = 'https://ircbackend.herokuapp.com/api/enrollments';
const url = 'http://64.227.74.120/api/enrollments';


export const read = async (courseId, userId) => {
    const res = await axios.get(`${url}/read/${courseId}/${userId}`);
    return res;
}