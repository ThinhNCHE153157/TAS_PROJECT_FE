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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserProfile = () => {
    const [data, setData] = useState([
        { label: 'User Name:', value: 'Data 1' },
        { label: 'Password:', value: 'Data 2' },
        { label: 'Email:', value: 'Data 3' },
        { label: 'Phone:', value: 'Data 4' },
        { label: 'Address:', value: 'Data 5' },
        { label: 'Job:', value: 'Data 6' },
        { label: 'Created Date:', value: 'Data 7' },
        { label: 'Updated Date:', value: 'Data 8' },
        { label: 'Status:', value: 'Data 9' },
    ]);

    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        setEditMode(false);
    };

    return (
        <>
            {/* <Header /> */}
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
                                                    <span style={{ fontWeight: 'bold' }}>Choose other image....</span>
                                                    <input
                                                        type="file"
                                                        style={{ marginLeft: '50px', textAlign: 'center' }}
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        fontFamily: 'initial',
                                                        fontWeight: 'bolder',
                                                        fontSize: '20px',
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    <span>Nguyen Van A</span>
                                                </div>
                                                <div>
                                                    <i>@Teacher</i>
                                                </div>
                                            </div>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Item>
                                            <h2 style={{ fontFamily: 'cursive' }}>More Information</h2>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead></TableHead>
                                                    <TableBody>
                                                        {data.map((row, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell style={{ fontWeight: 'bold' }}>
                                                                    {row.label}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {editMode ? (
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
                                                            </TableRow>
                                                        ))}
                                                        <TableRow>
                                                            <TableCell>
                                                                {editMode ? (
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick={handleSave}
                                                                    >
                                                                        Save
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="primary"
                                                                        onClick={handleEdit}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
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
