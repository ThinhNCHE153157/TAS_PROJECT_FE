import React, { useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import DataGridBase from '../../common/DataGridBase';

const statusOptions = {
    0: 'Hoạt động',
    1: 'Ngừng hoạt động',
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
const CourseList = () => {
    const columns = useMemo(
        () => [
            { field: 'courseId', headerName: 'Course ID', flex: 1 },
            { field: 'courseDescription', headerName: 'Course Description', flex: 1 },
            { field: 'courseLevel', headerName: 'Course Level', flex: 1 },
            { field: 'createUser', headerName: 'Create User', flex: 1 },
            { field: 'updateUser', headerName: 'Update User', flex: 1 },
            { field: 'createDate', headerName: 'Create Date', flex: 1 },
            { field: 'updateDate', headerName: 'Update Date', flex: 1 },

            {
                field: 'status',
                headerName: 'Status',
                editable: true,
                flex: 1,
                type: 'singleSelect',
                valueOptions: [
                    { value: 0, label: 'Hoạt động' },
                    { value: 1, label: 'Ngừng hoạt động' },
                ],
                renderCell: (params) => {
                    const color = getColor(params.value);
                    const statusText = getValueOption(params.value);
                    return <div style={{ color }}>{statusText}</div>;
                },
            },
        ],
        [],
    );

    const [listcourse, setListcourse] = React.useState([]);
    useEffect(() => {
        async function getListcourse() {
            const requestUrl = 'https://localhost:5000/api/Course/GetAllCourse';
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            setListcourse(responseJSON);
        }
        getListcourse();
    }, []);

    const rows = listcourse.map((item) => {
        const { courseId, ...otherFields } = item;
        return {
            ...otherFields,
            courseId: courseId,
            id: courseId,
        };
    });

    return (
        <div>
            <NavBar />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DataGridBase columns={columns} rows={rows} pageName="Course List" />
                </Box>
            </Box>
        </div>
    );
};

export default CourseList;
