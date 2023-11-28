import { BASE_URL } from "../../../../Utils/Constants";


const GetlistQuestionOfTest = async (testId) => {
    const requestOptions = {
        method: 'Get',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${BASE_URL}Question/GetQuestionByTestId?TestId=${testId}`, requestOptions)
        .then(response => response.json())
        .then(data => data);
};
export {
    GetlistQuestionOfTest,
};
