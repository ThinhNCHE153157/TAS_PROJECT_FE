import { API, API_Auth, API_FormFile } from '../component/callApi';

export const AddCourse = async (data) => {
    const res = await API.post('/Course/AddCourse', data);
    return res;
}

export const AddTopic = async (data) => {
    const res = await API.post('/Topic/AddTopic', data);
    return res;
}

export const AddVideo = async (data) => {
    const res = await API_Auth.post('/Video/AddVideo', data);
    return res;
}

export const getTopicBycourseId = async (courseId) => {
    const res = await API.get(`/Topic/GetTopicByCourseId?courseid=${courseId}`);
    return res;
}

export const getQuestionByCourseId = async (courseId) => {
    const res = await API.get(`/Question/GetQuestionByCourseId?request=${courseId}`)
    return res
}

export const AddNewQuestion = async (data) => {
    return await API.post(`/Question/CreateQuestionForTest`, data)
}