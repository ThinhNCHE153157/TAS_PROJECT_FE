import { BASE_URL } from "../Utils/Constants"
import { API } from "../component/callApi";

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

const GetCourseById = async (id) => {
    return API.get(`Course/GetCourseById?id=${id}`)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export {
    GetlistCourse,
    GetlistTest,
    GetCourseById
};
