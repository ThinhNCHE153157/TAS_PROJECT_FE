import { API } from '../component/callApi'

export const GetAllEnterprise = () => {
    return API.get('/Account/GetAllEnterprise')
}
export const AddEnterprise = (data) => {
    return API.post('/Account/AddEnterprise', data)
}