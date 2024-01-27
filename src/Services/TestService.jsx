import { BASE_URL } from "../Utils/Constants"
import { API, API_FormFile } from "../component/callApi"

const GetlistQuestionOfTest = async (testId) => {
    const requestOptions = {
        method: 'Get',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${BASE_URL}Question/GetQuestionByTestId?TestId=${testId}`, requestOptions)
        .then(response => response.json())
        .then(data => data);
};

const GetlistpartOfTest = async (testId) => {
    const requestOptions = {
        method: 'Get',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${BASE_URL}Test/getListPartOfTest?request=${testId}`, requestOptions)
        .then(response => response.json())
        .then(data => data);
}

const GetTestById = async (id) => {
    return API.get(`/Test/GetTestById?TestId=${id}`)
        .then(res => res.data)
        .catch(err => console.log(err))
}
export const AddNewTest = async (obj) => {
    return API_FormFile.post(`/Test/CreateTestForCourse`, obj)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export const UpdateTestByCourseId = async (obj) => {
    return API_FormFile.post(`/Test/UpdateTestForCourse`, obj)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export const DeleteTest = async (testId) => {
    return API.put(`/Test/DeleteTest?testId=${testId}`)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export const AddNewQuestion = async (obj) => {
    return API_FormFile.post(`/Question/CreateQuestion`, obj)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export {
    GetlistpartOfTest,
    GetlistQuestionOfTest,
    GetTestById
};
