import axios from 'axios'
axios.defaults.timeout = 100000;

export const API = axios.create({
  baseURL: 'http://103.179.173.136:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
})

export const API_FormFile = axios.create({
  baseURL: 'http://103.179.173.136:5000/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})


export const API_Auth = axios.create({
  baseURL: 'http://103.179.173.136:5000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})



// Admin
export const fetchAccountList = () => {
  return API.get('/data');
};

export const fetchUserData = (userId) => {
  return API.get(`/users/${userId}`);
};

export const createNewData = (data) => {
  return API.post('/data', data);
};

export const FetchAccountManagement = () => {
  return new Promise((resolve, reject) => {
    API.get('/Account/GetAccountManagement')
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};

export const FetchClassCodes = () => {
  return new Promise((resolve, reject) => {
    API.get('/Class/GetClassCode')
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};

export const FetchClassListByStudentId = (accountId) => {
  return new Promise((resolve, reject) => {
    API.get(`/Class/GetClassByStudentId?studentId=${accountId}`)
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};


export const AddStudentIntoClass = (accountId, classCode) => {
  return new Promise((resolve, reject) => {
    API.post(`/Class/AddStudentIntoClass?accountId=${accountId}&classCode=${classCode}`)
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};

export const FetchClass = (accountId, classCode) => {
  return new Promise((resolve, reject) => {
    API.post(`/Class/AddStudentIntoClass?accountId=${accountId}&classCode=${classCode}`)
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};

export const AddUser = (data) => {
  return new Promise((resolve, reject) => {
    API.post('/Account/AddAccount', data)
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};


export const EditUser = (accountId, data) => {
  return new Promise((resolve, reject) => {
    API.put(`https://localhost:5000/api/Account/EditAccount?accountId=${accountId}`, data)
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};


export const FetchAllClass = () => {
  return new Promise((resolve, reject) => {
    API.get('/Class/GetAllClassesManage')
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};

export const FetchAllUsersByClass = (classId) => {
  return new Promise((resolve, reject) => {
    API.get(`Class/GetAccountInClass?classId=${classId}`)
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};


export const AddClass = (data) => {
  return new Promise((resolve, reject) => {
    API.post('/Class/AddClass', data)
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};

export const AddTopic = (data) => {
  return new Promise((resolve, reject) => {
    API.post('/Topic/AddListTopic', data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const FetchAllTeacher = () => {
  return new Promise((resolve, reject) => {
    API.get('/Account/GetAllTeacher')
      .then((response) => {
        resolve(response.data); // Trả về dữ liệu từ API
      })
      .catch((error) => {
        reject(error); // Trả về lỗi nếu có lỗi
      });
  });
};

// export const AddUser = (data) => {
//   return new Promise((resolve, reject) => {
//     API.post('/Account/AddAccount', data)
//       .then((response) => {
//         resolve(response.data); // Trả về dữ liệu từ API
//       })
//       .catch((error) => {
//         reject(error); // Trả về lỗi nếu có lỗi
//       });
//   });
// };

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

