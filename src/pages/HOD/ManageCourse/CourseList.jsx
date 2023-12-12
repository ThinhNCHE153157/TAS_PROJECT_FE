import React, { useMemo, useEffect, useState } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import DataGridBase from '../../../component/DataGridBase';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../Utils/Constants';
const statusOptions = {
    false: 'Hoạt động',
    true: 'Ngừng hoạt động',
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const getValueOption = (value) => {
    return statusOptions[value] || 'Không xác định';
};

const getColor = (value) => {
    switch (value) {
        case false:
            return 'green';

        case true:
            return 'red';

        default:
            return 'gray';
    }
};
const CourseList = () => {
    const [refresh, setRefresh] = useState(false); // This is for refresh data after edit
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const [courseName, setCourse_Name] = useState('');
    const [courseDescription, setCourse_Description] = useState('');
    const [courseLevel, setCourse_Level] = useState('');
    const handleClose = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseName, courseDescription, courseLevel }),
        };
        fetch(`${BASE_URL}Course/AddCourse`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
        setOpen(false);
        setRefresh(!refresh);
    };
    const handleClosedialog = () => {
        setOpen(false);
    };

    const columns = useMemo(
        () => [
            { field: 'courseName', headerName: 'Course Name', flex: 1 },
            { field: 'courseDescription', headerName: 'Course Description', flex: 1 },
            { field: 'courseLevel', headerName: 'Course Level', flex: 1 },
            { field: 'createUser', headerName: 'Create User', flex: 1 },
            { field: 'updateUser', headerName: 'Update User', flex: 1 },
            { field: 'createDate', headerName: 'Create Date', flex: 1 },
            { field: 'updateDate', headerName: 'Update Date', flex: 1 },

            {
                field: 'isDeleted',
                headerName: 'Status',
                editable: true,
                flex: 1,
                type: 'singleSelect',
                valueOptions: [
                    { value: false, label: 'Hoạt động' },
                    { value: true, label: 'Ngừng hoạt động' },
                ],
                renderCell: (params) => {
                    const color = getColor(params.value);
                    const statusText = getValueOption(params.value);
                    return <div style={{ color }}>{statusText}</div>;
                },
            },
            {
                field: 'datails',
                headerName: 'Detail',
                flex: 0.5,
                renderCell: (params) => (
                    <Link to={`/Admin/CourseDetail/${params.row.id}`}>
                        <Button>
                            <AssignmentIcon />
                        </Button>
                    </Link>
                )
            }
        ],
        [],
    );

    const [listcourse, setListcourse] = useState([]);
    useEffect(() => {
        async function getListcourse() {
            const requestUrl = `${BASE_URL}Course/GetAllCourse`;
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            setListcourse(responseJSON);
        }
        getListcourse();
    }, [refresh]);

    const rows = listcourse.map((item) => {
        const { courseId, createDate, updateDate, ...otherFields } = item;
        return {
            ...otherFields,
            createDate: formatDate(createDate),
            updateDate: formatDate(updateDate),
            id: courseId,
        };
    });

    return (
        <div>
            <NavBar />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "24px" }}>
                    <React.Fragment >
                        <Button sx={{ ml: '20px', mt: '30px' }} variant="outlined" onClick={handleClickOpen}>
                            Add Courser
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Add Course</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Course Name"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => setCourse_Name(e.target.value)}
                                />
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Course Description"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => setCourse_Description(e.target.value)}
                                />
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Course level"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => setCourse_Level(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClosedialog}>Cancel</Button>
                                <Button onClick={handleClose}>Add</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                    <DataGridBase columns={columns} rows={rows} />
                </Box>
            </Box>

        </div>
    );
};

export default CourseList;
