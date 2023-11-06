import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import NavBar from '../layout/NavBar'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListTestDetail from './ListTestDetail'

const data = [
    {
        test_id: '1',
        test_name: 'test 1',
        test_duration: '30 phút',
        test_total_score: 'Class Name 1',
        test_description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        createUser: 'Nguyen Văn A',
        updateUser: 'Nguyen Văn A',
        createDate: '1/1/2023',
        updateDate: '1/1/2023',
    },
    {
        test_id: '2',
        test_name: 'test 1',
        test_duration: '30 phút',
        test_total_score: 'Class Name 1',
        test_description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        createUser: 'Nguyen Văn A',
        updateUser: 'Nguyen Văn A',
        createDate: '1/1/2023',
        updateDate: '1/1/2023',
    },
    {
        test_id: '3',
        test_name: 'test 1',
        test_duration: '30 phút',
        test_total_score: 'Class Name 1',
        test_description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        createUser: 'Nguyen Văn A',
        updateUser: 'Nguyen Văn A',
        createDate: '1/1/2023',
        updateDate: '1/1/2023',
    },
];

const forRows = data.map(item => {
    const { test_id, ...otherFields } = item;
    return {
        ...otherFields,
        test_id: test_id,
        id: test_id
    };
});

const TestList = () => {
    const [rows, setRows] = useState(forRows);

    return (
        <div>
            <NavBar />
            <Box sx={{ display: 'flex' }}>
                <Box>
                    <Box sx={{ height: 50 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 3 }}>
                        <Box sx={{ flexGrow: 1, ml: 2 }}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                placeholder='Test Name'
                                fullWidth
                                sx={{ maxWidth: 400 }}
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
                                <ListTestDetail
                                    id={item.id}
                                    test_name={item.test_name}
                                    test_duration={item.test_duration}
                                    test_description={item.test_description}
                                    createDate={item.createDate}
                                    updateDate={item.updateDate}
                                    createUser={item.createUser}
                                    updateUser={item.updateUser} />
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </Box>
        </div >
    )
}
export default TestList
