import React, { useMemo } from 'react'
import { Avatar, Box } from '@mui/material'
import Sidebar from './layout/Sidebar'
import NavBar from './layout/NavBar'
import DataGridBase from '../common/DataGridBase'

const UserList = () => {
  const columns = useMemo(() => [
    {
      field: 'avatar', headerName: 'Avatar', width: 60,
      renderCell: params => <Avatar src={params.row.avatar} />,
      sortable: false,
      filterable: false,
    },
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'email', headerName: 'Email', width: 100 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      valueGetter: (params) =>
        `${params.row.first_name || ''} ${params.row.last_name || ''}`
    },
    {
      field: 'is_verified', headerName: 'Status', width: 100,
      valueGetter: (params) => {
        switch (params.row.status) {
          case 0:
            return 'Hoạt động';

          case 1:
            return 'Chờ xử lý';

          case 2:
            return 'Ngừng hoạt động';

          default:
            return 'Không xác định';
        }
      }
    },

  ], [])

  const data = [
    {
      data_id: 1,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    },
    {
      data_id: 2,
      avatar: 'https://source.unsplash.com/100x100/?portrait?2',
      username: 'jane.doe',
      email: 'jane.doe@email.com',
      phone: '0123456780',
      first_name: 'Jane',
      last_name: 'Doe',
      status: 1 // chờ xử lý
    },
  ];

  const rows = data.map(item => {
    const { data_id, ...otherFields } = item;
    return {
      ...otherFields,
      id: data_id
    };
  });
  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <DataGridBase columns={columns} rows={rows} pageName='User Management' />
        </Box>
      </Box>
    </div>
  )
}

export default UserList