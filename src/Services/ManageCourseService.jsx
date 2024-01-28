import React from 'react'
import { API, API_FormFile } from '../component/callApi'

export const GetAllCourse = () => {
    return API.get('/course/getAllCourse')
}
export const changeStatus = (data) => {
    return API.put(`/Course/RequestCourse`, data)
}

export const UpdateQuestion = (data) => {
    return API_FormFile.put(`/Question/UpdateQuestion`, data)
}

export const UpdatePrice = (data) => {
    return API.post(`/Course/UpdateCost`, data)
}

export const changeEnterpriseStatus = (accountId, status) => {
    return API.put(`/Account/changeStatusEnterprise?accountId=${accountId}&status=${status}`)
}
