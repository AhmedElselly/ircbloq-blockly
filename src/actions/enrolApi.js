import axios from 'axios';

const url = 'https://ircbackend.herokuapp.com/api/enrollments';


export const read = async (courseId, userId) => {
    const res = await axios.get(`${url}/read/${courseId}/${userId}`);
    return res;
}