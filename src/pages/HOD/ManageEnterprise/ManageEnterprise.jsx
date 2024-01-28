import React, { useEffect } from 'react'
import NavBar from '../layout/NavBar'
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import { useState } from 'react'
import { Popover, Table, Tag } from 'antd'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './css/ManageEnterprise.css'
import { changeEnterpriseStatus, changeStatus } from '../../../Services/ManageCourseService'
import { GetAllEnterprise } from '../../../Services/ManageEnterprise'
import { alertError, alertSuccess } from '../../../component/AlertComponent'
import { ToastContainer } from 'react-toastify'
const formatMoneyVND = (number) => {
    return number?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

const datas = [
    {
        enterpriseCode: "title1",
        enterpriseName: "desc1",
        foreignName: "desc1",
        shortName: "desc1",
        representativeName: "user1",
        officeAddress: "2020-01-01",
        status: 1
    }
]


const ManageEnterprise = () => {
    const [tabValue, setTabValue] = useState(2)
    const [data, setData] = useState(datas);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const [refresh, setRefresh] = useState(false);
    var temp;
    useEffect(() => {
        setLoading(true);
        GetAllEnterprise().then(res => {
            console.log(res.data)
            setData(res.data)
            console.log(data)
        })
        setLoading(false);
    }, [refresh]);
    const columns = [
        {
            title: 'Mã doanh nghiệp',
            dataIndex: 'enterpriseCode',
            sorter: true,
        },
        {
            title: 'Tên doanh nghiệp',
            dataIndex: 'enterpriseName',
            width: 400,
            resizable: true,
        },
        {
            title: 'Tên nước ngoài',
            dataIndex: 'foreignName',
        },
        {
            title: 'Tên viết tắt',
            dataIndex: 'shortName',
        },
        {
            title: 'Tên đại diện',
            dataIndex: 'representativeName',
        },
        {
            title: 'Địa chỉ văn phòng',
            dataIndex: 'officeAddress',
            sorter: true,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            render: (status, record) => {
                console.log(`status: ${status} , record: ${record}`)
                const content = (
                    <div>
                        <Button variant='text' onClick={() => handleStatusChange(record.accountId, 2)}>Đang hoạt động</Button>
                        <Button variant='text' onClick={() => handleStatusChange(record.accountId, 1)}>Chờ xét duyệt</Button>
                        <Button variant='text' onClick={() => handleStatusChange(record.accountId, 0)}>Không hoạt động</Button>
                    </div>
                );

                let color, statusText;
                switch (status) {
                    case 2:
                        color = 'green';
                        statusText = 'Đang hoạt động';
                        break;
                    case 1:
                        color = 'gray';
                        statusText = 'Chờ xét duyệt';
                        break;
                    case 0:
                        color = 'red';
                        statusText = 'Không hoạt động';
                        break;
                    default:
                        break;
                }

                return (
                    <Popover content={content} trigger="click">
                        <Tag color={color} style={{ cursor: 'pointer', fontSize: '18px' }}>
                            {statusText} <ArrowDropDownIcon />
                        </Tag>
                    </Popover>
                );
            },
        },
    ]
    const handleStatusChange = (temp, key) => {
        console.log(temp)
        changeEnterpriseStatus(temp, key).then(res => {
            console.log(res.data)
            setRefresh(!refresh)
            alertSuccess({ message: 'Thay đổi trạng thái thành công' })
        }).catch(err => {
            console.log(err)
            alertError({ message: 'Thay đổi trạng thái thất bại' })
        })
        //console.log(`Change status of record ${record.courseId} to ${key}`);
        // Gọi API hoặc thực hiện các xử lý khác tùy ý
    };
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setLoading(true); // Set loading state while fetching new data
            // Fetch data based on the new pagination parameters
            // After fetching data, set setLoading(false) to stop loading state
            // setData(newData);
        }
    };


    const renderTab = (statusValue) => {
        console.log(data)
        // const temp = tabValue === 1 ? data.filter(item => item.status === 1) : data.filter(item => item.status !== 1)
        var temp = data.filter(item => item.status === statusValue)
        console.log(temp)
        return (
            <>
                <TextField
                    lable='Search'
                    placeholder='Tìm kiếm doanh nghiệp theo tên'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <SearchIcon sx={{ color: 'blue' }} />
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        mt: '3%',
                        width: '38%',
                        fontSize: '20px'
                    }}
                >

                </TextField>

                <Table
                    columns={columns}
                    dataSource={temp}
                    style={{ width: '100%', marginTop: '5%' }}
                    rowKey={(record) => record.createDate}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                >

                </Table>
            </>
        )


    }

    return (
        <>
            <NavBar />
            <ToastContainer />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Box display='flex' mt='5%' height='80px' alignItems='center' width='95%'>
                        <Typography width='82%' fontSize='35px' ml='3%' fontWeight={500}>
                            Quản lý doanh nghiệp
                        </Typography>
                    </Box>
                    <Box
                        display='flex'
                        mt='3%'
                        alignItems='center'
                        width='95%'
                        flexDirection='column'
                        justifyItems='center'
                    >
                        <Box display='flex'>
                            <Button
                                onClick={() => setTabValue(2)}
                                variant={tabValue === 2 ? 'contained' : 'text'}
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '20px',
                                }}
                            >
                                Doanh nghiệp trong hệ thống
                            </Button>

                            <Button
                                onClick={() => setTabValue(1)}
                                variant={tabValue === 1 ? 'contained' : 'text'}
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '20px',
                                }}
                            >
                                Doanh nghiệp đang Chờ Duyệt
                            </Button>

                            <Button
                                onClick={() => setTabValue(0)}
                                variant={tabValue === 0 ? 'contained' : 'text'}
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '20px',
                                }}
                            >
                                Doanh nghiệp Không đủ điều kiện
                            </Button>
                        </Box>
                        {
                            (tabValue === 2 || tabValue === 1 || tabValue === 0) && renderTab(tabValue)
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default ManageEnterprise