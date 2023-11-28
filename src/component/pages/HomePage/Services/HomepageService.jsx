const GetlistCourse = async () => {
    const requestOptions = {
        method: 'Get',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`https://localhost:5000/api/Course/GetCourseHomePage`, requestOptions)
        .then(response => response.json())
        .then(data => data);
};
export {
    GetlistCourse,
};
