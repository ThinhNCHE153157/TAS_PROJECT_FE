import React, { useEffect } from 'react'
import NavBar from '../layout/NavBar'
import { Box, Button, IconButton, InputAdornment, TextField, Tooltip, Typography, tooltipClasses } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import { useState } from 'react'
import { Popover, Space, Table, Tag } from 'antd'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PreviewIcon from '@mui/icons-material/Preview';
import AssignmentIcon from '@mui/icons-material/Assignment';
import './css/ManageCourse.css'
import styled from '@emotion/styled'
import { GetAllCourse, changeStatus } from '../../../Services/ManageCourseService'
import { alertError, alertSuccess } from '../../../component/AlertComponent'
import { ToastContainer } from 'react-toastify'
const formatMoneyVND = (number) => {
  return number?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'black',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'black',
    fontSize: '16px',
  },
}));
const datas = [
  {
    courseId: 14,
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


const ManageCourse = () => {
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
    GetAllCourse().then(res => {
      console.log(res.data)
      setData(res.data)
    })
    setLoading(false);
  }, [refresh]);
  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      sorter: true,
    },
    {
      title: 'Short Description',
      dataIndex: 'shortDescription',
      width: 400,
      resizable: true,
    },
    {
      title: 'Course Cost ',
      dataIndex: 'courseCost',
      render: (value) => formatMoneyVND(value),
      sorter: (a, b) => a.courseCost - b.courseCost,
    },
    {
      title: 'Discount ',
      dataIndex: 'discount',
      render: (text) => (
        <Tag color='green' style={{ fontSize: "18px" }}>{text}%</Tag>
      ), // Thêm '%' vào đuôi
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: 'Course Level',
      dataIndex: 'courseLevel',
      render: (courseLevel) => {
        let levelText = '';
        switch (courseLevel) {
          case 1:
            levelText = 'Toeic 500 +';
            break;
          case 2:
            levelText = 'Toeic 600 +';
            break;
          case 3:
            levelText = 'Toeic 700 +';
            break;
          default:
            break;
        }
        return <span>{levelText}</span>;
      }
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      sorter: true,
    },
    {
      title: 'Create User',
      dataIndex: 'createUser',
    },
    {
      title: 'Status',
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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <BootstrapTooltip title='Thống kê' placement="top">
            <IconButton onClick={() => handleOpenDetail(record.courseId)}>
              <AssignmentIcon />
            </IconButton>
          </BootstrapTooltip>

          <BootstrapTooltip title="Preview" placement="top">
            <IconButton onClick={() => handleOpenPreview(record.courseId)}>
              <PreviewIcon />
            </IconButton>
          </BootstrapTooltip>
        </Space>
      ),
    },
  ]

  const handleOpenPreview = (id) => {
    console.log('courseId: ', id)
    const newTabUrl = new URL(`/Preview/${id}`, window.location.origin);
    // newTabUrl.searchParams.append('id', id);
    const newTab = window.open(newTabUrl.href, '_blank');
  }

  const handleOpenDetail = (id) => {
    const newTabUrl = new URL('/', window.location.origin);
    newTabUrl.searchParams.append('id', id);
    const newTab = window.open(newTabUrl.href, '_blank');
  }
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
              Quản lý khóa học
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
                Khoá Học Đang Bán
              </Button>

              <Button
                onClick={() => setTabValue(2)}
                variant={tabValue === 2 ? 'contained' : 'text'}
                sx={{
                  textTransform: 'none',
                  fontSize: '20px',
                }}
              >
                Khóa Học Chờ Duyệt
              </Button>

              <Button
                onClick={() => setTabValue(3)}
                variant={tabValue === 3 ? 'contained' : 'text'}
                sx={{
                  textTransform: 'none',
                  fontSize: '20px',
                }}
              >
                Không hoạt động
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
export default ManageCourse