import React, { useMemo } from 'react'
import { Avatar, Box } from '@mui/material'
import Sidebar from './layout/Sidebar'
import NavBar from './layout/NavBar'
import DataGridBase from '../common/DataGridBase'

const statusOptions = {
  0: 'Hoạt động',
  1: 'Chờ xử lý',
  2: 'Ngừng hoạt động',
};

const getValueOption = (value) => {
  return statusOptions[value] || 'Không xác định';
};


const getColor = (value) => {
  switch (value) {
    case 0:
      return 'green';

    case 1:
      return 'blue';

    case 2:
      return 'red';

    default:
      return 'gray';
  }
}
const CourseList = () => {
  const columns = useMemo(() => [
    {
      field: 'avatar', headerName: 'Avatar', flex: 0.5,
      renderCell: params => <Avatar src={params.row.avatar} />,
      sortable: false,
      filterable: false,
    },
    { field: 'username', headerName: 'Username', flex: 1 },
    // { field: 'username', headerName: 'Username', width: 100 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      valueGetter: (params) =>
        `${params.row.first_name || ''} ${params.row.last_name || ''}`,
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      editable: true,
      flex: 1,
      type: 'singleSelect',
      valueOptions: [
        { value: 0, label: 'Hoạt động' },
        { value: 1, label: 'Chờ xử lý' },
        { value: 2, label: 'Ngừng hoạt động' },
      ],
      renderCell: (params) => {
        const color = getColor(params.value);
        const statusText = getValueOption(params.value);;
        return (
          <div style={{ color }}>
            {statusText}
          </div>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
    }

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
    {
      data_id: 3,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 4,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 5,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 6,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 7,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 8,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 9,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 10,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 11,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 12,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 13,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
    }, {
      data_id: 14,
      avatar: 'https://source.unsplash.com/100x100/?portrait?1',
      username: 'john.doe',
      email: 'john.doe@email.com',
      phone: '0123456789',
      first_name: 'John',
      last_name: 'Doe',
      status: 0 // hoạt động
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
          <DataGridBase columns={columns} rows={rows} pageName='Course List' />
        </Box>
      </Box>
    </div>
  )
}

export default CourseList