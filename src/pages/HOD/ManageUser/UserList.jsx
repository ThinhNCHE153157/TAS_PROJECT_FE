import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import NavBar from '../layout/NavBar'
import DataGridBase from '../../../component/DataGridBase'
import EditIcon from '@mui/icons-material/Edit';
import UserEditionModal from './UserEditionModal'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import UserAdditionModal from './UserAdditionModal'
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom'
import { AddUser, EditUser, FetchAccountManagement } from '../../../component/callApi'

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
const UserList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([])
  const [newRow, setNewRow] = useState({});

  useEffect(() => {
    FetchAccountManagement()
      .then(response => {
        console.log('Dữ liệu từ API:', response);
        setData(response);

        const forRows = response.map(item => {
          const { accountId, ...otherFields } = item;
          return {
            ...otherFields,
            accountId: accountId,
            id: accountId
          };
        });
        setRows(forRows);
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      });
  }, [newRow]);
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
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      flex: 1
    },
    { field: 'address', headerName: 'Address', flex: 2 },
    { field: 'createDate', headerName: 'Create Date', flex: 1 },
    {
      field: 'roleNames',
      headerName: 'Roles',
      flex: 1,
      valueGetter: (params) => {
        if (params.row && Array.isArray(params.row.roleNames)) {
          return params.row.roleNames.join(', ');
        }
        return ''; // Hoặc giá trị mặc định khác tùy bạn chọn
      },
    },
    // {
    //   field: 'isDelete',
    //   headerName: 'Status',
    //   editable: true,
    //   flex: 1,
    //   type: 'singleSelect',
    //   valueOptions: [
    //     { value: 0, label: 'Hoạt động' },
    //     { value: 1, label: 'Chờ xử lý' },
    //     { value: 2, label: 'Ngừng hoạt động' },
    //   ],
    //   renderCell: (params) => {
    //     const color = getColor(params.value);
    //     const statusText = getValueOption(params.value);;
    //     return (
    //       <div style={{ color }}>
    //         {statusText}
    //       </div>
    //     );
    //   }
    // },
    {
      field: 'edit',
      headerName: 'Edit',
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
    },
    {
      field: 'details',
      headerName: 'Detail',
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/Admin/UserDetail/${params.row.id}`}>
          <Button>
            <AssignmentIcon />
          </Button>
        </Link>
      )
    }
  ], [])





  const updateRowData = (updatedData) => {
    console.log('updatedData: ', updatedData)
    console.log('updatedData.accountId: ', updatedData.accountId)
    EditUser(updatedData.accountId, updatedData)
      .then(response => {
        setNewRow(updatedData);
        console.log('Dữ liệu từ API:', response);
      }).catch(error => {
        console.error('Lỗi khi gọi API:', error);
      })
  };

  const addRowData = (addData) => {
    console.log('addData: ', addData)
    AddUser(addData)
      .then(response => {
        setNewRow(addData);
        console.log('Dữ liệu từ API:', response);
      }).catch(error => {
        console.error('Lỗi khi gọi API:', error);
      })
  };

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
              sx={{ position: 'absolute', top: '19%', right: '6%', cursor: 'pointer', zIndex: 1 }}
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
            data={rows}
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