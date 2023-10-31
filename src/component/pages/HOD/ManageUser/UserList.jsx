
import React, { useMemo, useState } from 'react'
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import NavBar from '../layout/NavBar'
import DataGridBase from '../../common/DataGridBase'
import EditIcon from '@mui/icons-material/Edit';
import UserEditionModal from './UserEditionModal'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import UserAdditionModal from './UserAdditionModal'

const statusOptions = {
  0: 'Hoạt động',
  1: 'Chờ xử lý',
  2: 'Ngừng hoạt động',
};

const getValueOption = (value) => {
  return statusOptions[value] || 'Không xác định';
};

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
  }
];
const forRows = data.map(item => {
  const { data_id, ...otherFields } = item;
  return {
    ...otherFields,
    data_id: data_id,
    id: data_id
  };
});

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
const UserList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState(forRows);
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
      renderCell: (params) => (
        <Button
          onClick={() => {
            setIsEditModalOpen(true);
            setSelectedRow(params.row);
          }}
        >
          <EditIcon />
        </Button>
      )
    }
  ], [])





  const updateRowData = (updatedData) => {
    // Tìm chỉ mục của hàng trong mảng dựa trên id hoặc một trường duy nhất
    console.log(updatedData)
    const index = rows.findIndex((row) => row.id === updatedData.id);
    if (index !== -1) {
      const updatedRows = [...rows];
      updatedRows[index] = updatedData;
      setRows(updatedRows);
    }
  };

  const addRowData = (addData) => {
    // const data_id_max_row = data.find(item => item.data_id === Math.max(...data.map(item => item.data_id)));
    // console.log(addData)
    const data_id_max = Math.max(...data.map(item => item.data_id)) + 1;
    addData = { ...addData, 'id': data_id_max, 'data_id': data_id_max, 'avatar': '' }
    const updateRows = [...rows]
    updateRows.push(addData)

    setRows(updateRows)

  };
  // useEffect(() => {
  //   // Lấy dữ liệu từ database hoặc từ một nguồn khác
  //   setRows(rows);
  // }, [rows]);

  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              color="primary"
              cursor="pointer"
              sx={{ position: 'absolute', top: '25%', right: '7%', cursor: 'pointer', zIndex: 1 }}
              onClick={() => {
                setIsAddModalOpen(true);
              }}
            >
              <PersonAddAltIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Thêm user
              </Typography>
            </IconButton>
            <DataGridBase columns={columns} rows={rows} pageName='User manager' columnsToSearch={['username']} />
          </Box>

          {/* Edit modal */}
          <UserEditionModal
            open={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedRow(null);
            }}
            rowToEdit={selectedRow}
            onSave={updateRowData}
          />

          {/* Add modal */}
          <UserAdditionModal
            open={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
            }}
            onSubmit={addRowData}
          />
        </Box>
      </Box>
    </div>
  );
}

export default UserList