import { API } from '../component/callApi'

export const GetAllEnterprise = () => {
    return API.get('/Account/GetAllEnterprise')
}