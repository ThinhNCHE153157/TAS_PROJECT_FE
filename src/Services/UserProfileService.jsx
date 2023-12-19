import { BASE_URL } from "../Utils/Constants"
import { API } from '../component/callApi'

const GetUserById = async (id) => {
    return new Promise((resolve, reject) => {
        API.get(`/Account/GetAccountById?id=${id}`)
            .then((response) => {
                resolve(response.data); // Trả về dữ liệu từ API
            })
            .catch((error) => {
                reject(error); // Trả về lỗi nếu có lỗi
            });
    });
};

export { GetUserById };
