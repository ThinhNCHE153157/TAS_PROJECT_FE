import axios from 'axios';
import { loginStart, loginSuccess, loginFailed, logout } from './AuthSlice';
import { userStart, userSuccess, userFailed, userLogout } from './userSlice';
import { alertError, alertSuccess } from '../../component/AlertComponent';

axios.defaults.baseURL = 'http://103.179.173.136:5000/api'; // Đặt URL cơ sở
axios.defaults.timeout = 5000; // Đặt thời gian chờ tối đa (milliseconds)
axios.defaults.headers.post['Content-Type'] = 'application/json'; // Đặt kiểu dữ liệu gửi đi

export const loginUser = async function (userName, password, dispatch, navigate) {
    dispatch(loginStart());
    try {
        const response = await axios.post('/Account/UserLogin', { userName, password });
        dispatch(loginSuccess(response.data));
        localStorage.setItem('token', response.data.accessToken.toString());
        getUser(response.data.id, dispatch);
        alertSuccess({ message: "Đăng nhập thành công" });
        navigate('/');
    } catch (error) {
        dispatch(loginFailed(error));
        alertError({ message: "Đăng nhập thất bại" });
        navigate('/login');
    }
};

export const getUser = async function (id, dispatch) {
    dispatch(userStart());
    try {
        const response = await axios.get(`/Account/GetAccountById?id=${id}`);
        dispatch(userSuccess(response.data));
    } catch (error) {
        dispatch(userFailed(error));
    }
};

export const logoutUser = async function (dispatch) {
    dispatch(logout());
    dispatch(userLogout());
};
