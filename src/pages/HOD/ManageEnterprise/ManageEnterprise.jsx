import React, { useEffect } from 'react'
import NavBar from '../layout/NavBar'
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import { useState } from 'react'
import { Popover, Table, Tag } from 'antd'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './css/ManageEnterprise.css'
import { changeStatus } from '../../../Services/ManageCourseService'
import { GetAllEnterprise } from '../../../Services/ManageEnterprise'
import { alertError, alertSuccess } from '../../../component/AlertComponent'
import { ToastContainer } from 'react-toastify'
const formatMoneyVND = (number) => {
    return number?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

const datas = [
    {
        courseName: "title1",
        shortDescription: "desc1",
        courseCost: 2000000,
        discount: 30,
        courseLevel: 1,
        createDate: "2020-01-01",
        createUser: "user1",
        status: 1
    },
]


const ManageEnterprise = () => {
    const [tabValue, setTabValue] = useState(1)
    const [data, setData] = useState(datas);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setLoading(true);
        GetAllEnterprise().then(res => {
            console.log(res.data)
            setData(res.data)
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
            render: (value) => formatMoneyVND(value),
            sorter: (a, b) => a.courseCost - b.courseCost,
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
                console.log(record)
                const content = (
                    <div>
                        <Button variant='text' onClick={() => handleStatusChange(record, 1)}>Đang hoạt động</Button>
                        <Button variant='text' onClick={() => handleStatusChange(record, 2)}>Chờ xét duyệt</Button>
                        <Button variant='text' onClick={() => handleStatusChange(record, 3)}>Không hoạt động</Button>
                    </div>
                );

                let color, statusText;
                switch (status) {
                    case 1:
                        color = 'green';
                        statusText = 'Đang hoạt động';
                        break;
                    case 2:
                        color = 'gray';
                        statusText = 'Chờ xét duyệt';
                        break;
                    case 3:
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
    const handleStatusChange = (record, key) => {
        const data = {
            courseId: record.courseId,
            status: key
        }
        changeStatus(data).then(res => {
            console.log(res.data)
            alertSuccess({ message: 'Thay đổi trạng thái thành công' })
            setRefresh(!refresh)
        }).catch(err => {
            console.log(err)
            alertError({ message: 'Thay đổi trạng thái thất bại' })
        })
        console.log(`Change status of record ${record.courseId} to ${key}`);
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
        // const temp = tabValue === 1 ? data.filter(item => item.status === 1) : data.filter(item => item.status !== 1)
        const temp = data.filter(item => item.status === statusValue)
        return (
            <>
                <TextField
                    lable='Search'
                    placeholder='Tìm kiếm khóa học theo tên'
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
                                onClick={() => setTabValue(1)}
                                variant={tabValue === 1 ? 'contained' : 'text'}
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '20px',
                                }}
                            >
                                Doanh nghiệp trong hệ thống
                            </Button>

                            <Button
                                onClick={() => setTabValue(2)}
                                variant={tabValue === 2 ? 'contained' : 'text'}
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '20px',
                                }}
                            >
                                Doanh nghiệp đang Chờ Duyệt
                            </Button>

                            <Button
                                onClick={() => setTabValue(3)}
                                variant={tabValue === 3 ? 'contained' : 'text'}
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '20px',
                                }}
                            >
                                Doanh nghiệp Không đủ điều kiện
                            </Button>
                        </Box>
                        {
                            (tabValue === 1 || tabValue === 2 || tabValue === 3) && renderTab(tabValue)
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default ManageEnterprise