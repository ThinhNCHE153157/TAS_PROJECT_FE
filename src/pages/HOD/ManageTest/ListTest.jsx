import React, { useEffect, useMemo } from 'react'
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import SearchIcon from '@mui/icons-material/Search';
import ListTestDetail from './ListTestDetail'
import { BASE_URL } from '../../../Utils/Constants';

const TestList = () => {
    const columns = useMemo(
        () => [
            { field: 'TestId', headerName: 'Test ID', flex: 1 },
            { field: 'TestName', headerName: 'Test Name', flex: 1 },
            { field: 'Test Duration', headerName: 'Test Duration', flex: 1 },
            { field: 'TestTotalScore', headerName: 'TestTotalScore', flex: 1 },
            { field: 'TestDescription', headerName: 'TestDescription', flex: 1 },
            { field: 'Note', headerName: 'Note', flex: 1 },
            { field: 'createUser', headerName: 'Create User', flex: 1 },
            { field: 'updateUser', headerName: 'Update User', flex: 1 },
            { field: 'createDate', headerName: 'Create Date', flex: 1 },
            { field: 'updateDate', headerName: 'Update Date', flex: 1 },
        ],
        [],
    );

    const [listtest, setListTest] = React.useState([]);
    useEffect(() => {
        async function getListTest() {
            const requestUrl = `${BASE_URL}Test/GetAllTest`;
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            setListTest(responseJSON);
        }
        getListTest();
    }, []);

    const rows = listtest.map((item) => {
        const { TestId, ...otherFields } = item;
        return {
            ...otherFields,
            TestId: TestId,
            id: TestId
        };
    });

    return (
        <div>
            <NavBar />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box>
                    <Box sx={{ height: 50 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 3 }}>
                        <Box sx={{ flexGrow: 1, ml: 2 }}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                placeholder='Test Name'
                                fullWidth
                                sx={{ Width: 400 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Box>

                    <Grid container spacing={3}>
                        {rows.map(item => (
                            <Grid item xs={3} key={item.id}>
                                <ListTestDetail columns={columns} rows={rows} />
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </Box>
        </div >
    )
}
export default TestList