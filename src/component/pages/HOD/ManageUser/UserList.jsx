import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Avatar, Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import DataGridBase from '../../common/DataGridBase';
import UserEditionModal from './UserEditionModal';
import UserAdditionModal from './UserAdditionModal';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
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
};

const UserList = () => {
  const [rows, setRows] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('https://localhost:5000/api/Account/getUser')
      .then(response => {
        setRows(response.data.map(user => ({
          ...user,
          id: user.accountId,
          avatar: user.avatar || 'https://source.unsplash.com/100x100/?portrait',
        })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = useMemo(() => [
    {
      field: 'avatar',
      headerName: 'Avatar',
      flex: 0.5,
      renderCell: params => (
        <Link to={`/ManageUser/UserDetail/${params.row.id}`}>
          <Avatar src={params.row.avatar} />
        </Link>
      ),
      sortable: false,
      filterable: false,
    },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      flex: 1
    },
    {
      field: 'isVerified',
      headerName: 'Status',
      flex: 1,
      type: 'singleSelect',
      valueOptions: [
        { value: 0, label: 'Hoạt động' },
        { value: 1, label: 'Chờ xử lý' },
        { value: 2, label: 'Ngừng hoạt động' },
      ],
      renderCell: (params) => {
        const color = getColor(params.value);
        const statusText = getValueOption(params.value);
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
      ),
    },
  ], []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* "Thêm user" button aligned to the right */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                color="primary"
                onClick={() => setIsAddModalOpen(true)}
                sx={{ mb: 2 }} // Margin for spacing between the button and the data grid
              >
                <PersonAddAltIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  Thêm user
                </Typography>
              </IconButton> */}
            {/* </Box> */}

            {/* Data Grid */}
            <DataGridBase columns={columns} rows={rows} pageName='User Manager' />
          </Box>

          {/* Edit modal */}
          <UserEditionModal
            open={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedRow(null);
            }}
            rowToEdit={selectedRow}
            onSave={(updatedData) => {
              const index = rows.findIndex((row) => row.id === updatedData.id);
              if (index !== -1) {
                const updatedRows = [...rows];
                updatedRows[index] = updatedData;
                setRows(updatedRows);
              }
            }}
          />

          {/* Add modal */}
          <UserAdditionModal
            open={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={(addData) => {
              const newData = {
                ...addData,
                id: Math.max(...rows.map(row => row.id)) + 1,
                avatar: addData.avatar || 'https://source.unsplash.com/100x100/?portrait',
              };
              setRows([...rows, newData]);
            }}
          />
        </Box>
      </Box>
    </div >
  );
}

export default UserList;
