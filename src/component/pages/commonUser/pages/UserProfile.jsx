import React, { useState } from 'react';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from '../layout/Header';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserProfile = () => {
    const [data, setData] = useState([
        { label: 'User Name:', value: 'Data 1', editMode: false },
        { label: 'Password:', value: 'Data 2', editMode: false },
        { label: 'Email:', value: 'Data 3', editMode: false },
        { label: 'Phone:', value: 'Data 4', editMode: false },
        { label: 'Address:', value: 'Data 5', editMode: false },
        { label: 'Job:', value: 'Data 6', editMode: false },
        { label: 'Created Date:', value: 'Data 7', editMode: false },
        { label: 'Updated Date:', value: 'Data 8', editMode: false },
        { label: 'Status:', value: 'Data 9', editMode: false },
    ]);

    const handleEdit = (index) => {
        const updatedData = [...data];
        updatedData[index].editMode = true;
        setData(updatedData);
    };

    const handleSave = (index) => {
        const updatedData = [...data];
        updatedData[index].editMode = false;
        setData(updatedData);
    };

    return (
        <>
            <Header />
            <div>
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed>
                        <Box
                            sx={{
                                bgcolor: '#cfe8fc',
                                height: 'auto',
                                margin: '30px 0 0 0',
                                borderRadius: '5px',
                            }}
                        >
                            <Box sx={{ flexGrow: 1, height: 'auto', margin: '0 20px 0 20px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Item>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <AccountBoxIcon sx={{ height: 100, width: 100, textAlign: 'center' }} />
                                                <div>
                                                    <span style={{ fontWeight: 'bold' }}>Choose your image....</span>
                                                    <Button style={{ marginLeft: '10px' }}>Browser</Button>
                                                </div>
                                                <div
                                                    style={{
                                                        fontFamily: 'initial',
                                                        fontWeight: 'bolder',
                                                        fontSize: '20px',
                                                    }}
                                                >
                                                    <span>Nguyen Van A</span>
                                                </div>
                                                <div>
                                                    <span>Teacher</span>
                                                </div>
                                            </div>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Item>
                                            <h2 style={{ fontFamily: 'cursive' }}>More Information</h2>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        {/* <TableRow>
                                                            <TableCell></TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow> */}
                                                    </TableHead>
                                                    <TableBody>
                                                        {data.map((row, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell style={{ fontWeight: 'bold' }}>
                                                                    {row.label}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {row.editMode ? (
                                                                        <input
                                                                            type="text"
                                                                            value={row.value}
                                                                            onChange={(e) => {
                                                                                const updatedData = [...data];
                                                                                updatedData[index].value =
                                                                                    e.target.value;
                                                                                setData(updatedData);
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        row.value
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {row.editMode ? (
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            onClick={() => handleSave(index)}
                                                                        >
                                                                            Save
                                                                        </Button>
                                                                    ) : (
                                                                        <EditNoteIcon
                                                                            onClick={() => handleEdit(index)}
                                                                        />
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </React.Fragment>
            </div>
        </>
    );
};

export default UserProfile;
