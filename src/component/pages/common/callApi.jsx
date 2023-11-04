import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000'
})



// Admin
export const fetchData = () => {
  return API.get('/data');
};

export const fetchUserData = (userId) => {
  return API.get(`/users/${userId}`);
};

export const createNewData = (data) => {
  return API.post('/data', data);
};

// Student

// Teacher

export default API;


// useEffect(() => {
//   // Fetch data from one API endpoint
//   fetchData()
//     .then(response => {
//       setData(response.data);
//     })
//     .catch(error => {
//       setError(error);
//     });

//   // Fetch user data from another API endpoint
//   fetchUserData(123) // Replace with the desired user ID
//     .then(response => {
//       setUserData(response.data);
//     })
//     .catch(error => {
//       setError(error);
//     });
// }, []);