import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import Sidebar from '../layout/Sidebar';
import DataGridBase from '../../common/DataGridBase';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import UserAdditionModal from './UserAdditionModal'
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { FetchAllUsersByClass } from '../../common/callApi';

const ClassDetail = () => {
  const { id } = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({});
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
            // setIsEditModalOpen(true);
            // setSelectedRow(params.row);
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
      // renderCell: (params) => (
      //   <Link to={`/Admin/UserDetail/${params.row.id}`}>
      //     <Button>
      //       <AssignmentIcon />
      //     </Button>
      //   </Link>
      // )
    }
  ], [])

  useEffect(() => {
    FetchAllUsersByClass(id)
      .then(response => {
        console.log('Dữ liệu từ API:', response);
        // setData(response);

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
              sx={{ position: 'absolute', top: '25%', right: '6%', cursor: 'pointer', zIndex: 1 }}
              onClick={() => {
                setIsAddModalOpen(true);
              }}
            >
              <PersonAddAltIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Thêm vào lớp
              </Typography>
            </IconButton>
            <DataGridBase columns={columns} rows={rows} pageName='Manage Student In Class' columnsToSearch={['username']} />
          </Box>

          {/* Add modal */}
          {/* <StudentIntoClass
            open={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
            }}
            onSubmit={addRowData}
            rows={rows}
          /> */}
        </Box>
      </Box>
    </div>
  )
}

export default ClassDetail