import { BASE_URL } from "../Utils/Constants"

const GetlistCourse = async () => {
    const requestOptions = {
        method: 'Get',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${BASE_URL}Course/GetCourseHomePage`, requestOptions)
        .then(response => response.json())
        .then(data => data);
};
const GetlistTest = async () => {
    const requestOptions = {
        method: 'Get',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${BASE_URL}Test/GetlistTestFree`, requestOptions)
        .then(response => response.json())
        .then(data => data);
};
export {
    GetlistCourse,
    GetlistTest
};
