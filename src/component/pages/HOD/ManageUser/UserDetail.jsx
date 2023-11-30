import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import { Box, IconButton, Typography } from '@mui/material';
import Sidebar from '../layout/Sidebar';
import DataGridBase from '../../common/DataGridBase';
import { AddStudentIntoClass, FetchClassListByStudentId } from '../../common/callApi';
import PostAddIcon from '@mui/icons-material/PostAdd';
import StudentIntoClass from './StudentIntoClass';

export default function UserDetail() {
    const { id } = useParams();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState({});
    const addRowData = (e) => {
        console.log(e);

        AddStudentIntoClass(id, e.classCode)
            .then(response => {
                setNewRow(e)
                console.log('Dữ liệu từ API:', response);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    }
    const columns = useMemo(() => [
        { field: 'classId', headerName: 'Class Id', flex: 0.5 },
        { field: 'className', headerName: 'Class Name', flex: 1 },
        { field: 'classCode', headerName: 'Class Code', flex: 1 },
        { field: 'subject', headerName: 'Subject', flex: 1.5 },
        { field: 'startTime', headerName: 'Start time', flex: 1 },
        { field: 'endTime', headerName: 'End time', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
    ], [])
    useEffect(() => {
        FetchClassListByStudentId(id)
            .then(response => {
                console.log('Dữ liệu từ API:', response);
                // setData(response);

                const forRows = response.map(item => {
                    const { classId, ...otherFields } = item;
                    return {
                        ...otherFields,
                        classId: classId,
                        id: classId
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
                            <PostAddIcon />
                            <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                Thêm vào lớp
                            </Typography>
                        </IconButton>
                        <DataGridBase columns={columns} rows={rows} pageName='User manager' columnsToSearch={['username']} />
                    </Box>

                    {/* Add modal */}
                    <StudentIntoClass
                        open={isAddModalOpen}
                        onClose={() => {
                            setIsAddModalOpen(false);
                        }}
                        onSubmit={addRowData}
                        rows={rows}
                    />
                </Box>
            </Box>
        </div>
    );
}
