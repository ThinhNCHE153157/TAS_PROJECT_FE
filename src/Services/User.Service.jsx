import env from 'react-dotenv';

const login = async (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    };
    return fetch(`${env.API_URL}/api/Account/UserLogin`, requestOptions)
        .then(handleResponse)
        .then((response) => response.json())
        .then((user) => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const handleResponse = (response) => {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
};

export const userService = {
    login,
    logout,
};
