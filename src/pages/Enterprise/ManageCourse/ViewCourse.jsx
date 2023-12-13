import React, { useState } from 'react'
import NavBar from '../layout/NavBar'
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import SearchIcon from '@mui/icons-material/Search';
import { Table, Tag } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';

const formatMoneyVND = (number) => {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
const datas = [
  {
    courseName: 'course 1',
    courseCost: '200000',
    discount: 30,
    createDate: '12/12/2001',
    status: 2,
  },
  {
    courseName: 'course 2',
    courseCost: '200000',
    discount: 40,
    createDate: '13/12/2001',
    status: 1,
  },
];
const ViewCourse = () => {
  const [tabValue, setTabValue] = useState(1)
  const [data, setData] = useState(datas);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // const fetchData = () => {
    //   setLoading(true);
    //   fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
    //     .then((res) => res.json())
    //     .then(({ results }) => {
    //       setData(results);
    //       setLoading(false);
    //       setTableParams({
    //         ...tableParams,
    //         pagination: {
    //           ...tableParams.pagination,
    //           total: 200,
    //           // 200 is mock data, you should read it from server
    //           // total: data.totalCount,
    //         },
    //       });
    //     });
    // };

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const columns = [
    {
      title: 'Course name',
      dataIndex: 'courseName',
      sorter: true,
    },
    {
      title: 'Course cost',
      dataIndex: 'courseCost',
      render: (text) => formatMoneyVND(text),
      sorter: true,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      render: (text) => `${text}%`, // Thêm '%' vào đuôi
    },
    {
      title: 'Create date',
      dataIndex: 'createDate',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color, statusText;
        switch (status) {
          case 1:
            color = 'green';
            statusText = 'Approved';
            break;
          case 2:
            color = 'gray';
            statusText = 'Pending';
            break;
          case 3:
            color = 'red';
            statusText = 'Reject';
            break;
          default:
            break;
        }
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
  ]

  const renderTab = () => {
    const temp = tabValue === 1 ? data.filter(item => item.status === 1) : data.filter(item => item.status !== 1)
    return (
      <>
        <TextField
          lable='Search'
          placeholder='Tìm kiếm khóa học thêm tên'
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
          style={{ width: '80%', marginTop: '5%' }}
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
    <div >
      <NavBar />
      <Box display='flex' >
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3, m: 2 }}>
          <Box display='flex' mt='5%' height='80px' alignItems='center' width='95%'>
            <Typography width='82%' fontSize='26px' ml='3%'>
              Bắt đầu tạo khóa học
            </Typography>
            <Button
              variant='contained'
              sx={{ height: '50px' }}
              onClick={() => navigate('/Enterprise/AddCourse')}
            >
              Tạo khóa học của bạn
            </Button>
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
                variant={tabValue == 1 ? 'contained' : 'text'}
                sx={{
                  textTransform: 'none',
                  fontSize: '20px',
                }}
              >
                Khoá Học Đang Bán
              </Button>

              <Button
                onClick={() => setTabValue(2)}
                variant={tabValue == 2 ? 'contained' : 'text'}
                sx={{
                  textTransform: 'none',
                  fontSize: '20px',
                }}
              >
                Khóa Học Chờ Duyệt
              </Button>

              <Button
                onClick={() => setTabValue(3)}
                variant={tabValue == 3 ? 'contained' : 'text'}
                sx={{
                  textTransform: 'none',
                  fontSize: '20px',
                }}
              >
                Giảm Giá
              </Button>
            </Box>
            {
              (tabValue === 1 || tabValue === 2) && renderTab()
            }
          </Box>
        </Box>
      </Box>
    </div >
  )
}

export default ViewCourse