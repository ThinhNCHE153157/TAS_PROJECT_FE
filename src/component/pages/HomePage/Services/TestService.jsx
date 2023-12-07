import { BASE_URL } from "../../../../Utils/Constants";
import { API } from "../../../pages/common/callApi";

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

export {
    GetlistpartOfTest,
    GetlistQuestionOfTest,
};
