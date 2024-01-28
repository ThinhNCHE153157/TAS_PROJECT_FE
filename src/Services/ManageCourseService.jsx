import React from 'react'
import { API } from '../component/callApi'

export const GetAllCourse = () => {
    return API.get('/course/getAllCourse')
}
export const changeStatus = (data) => {
    return API.put(`/Course/RequestCourse`, data)
}

export const changeEnterpriseStatus = (accountId, status) => {
    return API.put(`/Account/changeStatusEnterprise?accountId=${accountId}&status=${status}`)
}
