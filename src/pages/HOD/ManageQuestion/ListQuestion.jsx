import React, { useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBar from '../layout/NavBar';
import DataGridBase from '../../../component/DataGridBase';
import { BASE_URL } from '../../../Utils/Constants';

const QuestionList = () => {
    const columns = useMemo(
        () => [
            { field: 'TestId', headerName: 'Test ID', flex: 1 },
            { field: 'QuestionId', headerName: 'Question ID', flex: 1 },
            { field: 'Description', headerName: 'Description', flex: 1 },
            { field: 'Image', headerName: 'Image', flex: 1 },
            { field: 'Type', headerName: 'Type', flex: 1 },
            { field: 'Note', headerName: 'Note', flex: 1 },
            { field: 'createUser', headerName: 'Create User', flex: 1 },
            { field: 'updateUser', headerName: 'Update User', flex: 1 },
            { field: 'createDate', headerName: 'Create Date', flex: 1 },
            { field: 'updateDate', headerName: 'Update Date', flex: 1 },
            { field: 'IsDeleted', headerName: 'Is Deleted', flex: 1 },
        ],
        [],
    );

    const [QuestionList, setListquestion] = React.useState([]);
    useEffect(() => {
        async function getListquestion() {
            const requestUrl = `${BASE_URL}Question/GetAllQuestion`;
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            setListquestion(responseJSON);
        }
        getListquestion();
    }, []);

    const rows = QuestionList.map((item) => {
        const { QuestionId, ...otherFields } = item;
        return {
            ...otherFields,
            QuestionId: QuestionId,
            id: QuestionId,
        };
    });

    return (
        <div>
            <NavBar />
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <DataGridBase columns={columns} rows={rows} pageName="Question List" />
                </Box>
            </Box>
        </div>
    );
}
export default QuestionList;