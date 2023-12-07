import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Box, Avatar, Typography, Table, TableBody, TableCell, TableRow, Button, TextField } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import { Link, useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserProfile = () => {
    const [data, setData] = useState([
        { label: 'User Name:', key: 'username' },
        { label: 'Password:', key: 'password' },
        { label: 'Email:', key: 'email' },
        { label: 'Phone:', key: 'phone' },
        { label: 'Address:', key: 'address' },
        { label: 'Job:', key: 'roles' },
        { label: 'Created Date:', key: 'createDate' },
        { label: 'Updated Date:', key: 'updateDate' },
        { label: 'Status:', key: 'isVerified' },
    ]);

    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        createdDate: '',
        updatedDate: '',
        status: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:5000/api/Account/GetAccountById?id=${id}`);
                const fetchedData = await response.json();

                // Update user data state with fetched data
                setUserData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);


    const formatCreateDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        setEditMode(false);
    };

    return (
        <Container>
            <Box sx={{ margin: 4, backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2 }}>
                <Grid container spacing={3}>
                    {/* Left Panel */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, textAlign: 'center' }}>
                            <Avatar sx={{ width: 100, height: 100, margin: 'auto' }} src={image} alt="Profile">
                                {!image && <AccountBoxIcon fontSize="large" />}
                            </Avatar>
                            <Typography variant="h6" sx={{ marginTop: 2 }}>
                                {userData.username}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', marginTop: 1 }}>
                                @Teacher
                            </Typography>
                            <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                                Upload Image
                                <input type="file" hidden onChange={handleImageChange} />
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Right Panel */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                                User Details
                            </Typography>
                            <Table>
                                <TableBody>
                                    {data.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.label}</TableCell>
                                            <TableCell>
                                                {editMode && row.key !== 'updateDate' && row.key !== 'createDate' && row.key !== 'isVerified' ? (
                                                    row.key === 'password' ? (
                                                        <div style={{ position: 'relative' }}>
                                                            <TextField
                                                                type={showPassword ? 'text' : 'password'}
                                                                value={userData[row.key]}
                                                                fullWidth
                                                                onChange={(e) => {
                                                                    const updatedUserData = { ...userData };
                                                                    updatedUserData[row.key] = e.target.value;
                                                                    setUserData(updatedUserData);
                                                                }}
                                                            />
                                                            <span onClick={handleToggleShowPassword} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <TextField
                                                            type="text"
                                                            value={userData[row.key]}
                                                            fullWidth
                                                            onChange={(e) => {
                                                                const updatedUserData = { ...userData };
                                                                updatedUserData[row.key] = e.target.value;
                                                                setUserData(updatedUserData);
                                                            }}
                                                        />
                                                    )
                                                ) : (
                                                    row.key === 'password' ? '*'.repeat(userData[row.key].length) :
                                                        (row.key === 'isVerified' ? (
                                                            <Typography
                                                                sx={{ color: userData[row.key] ? 'green' : 'red' }}>
                                                                {userData[row.key] ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                                                            </Typography>) :
                                                            (row.key === 'createDate' || row.key === 'updateDate' ? formatCreateDate(userData[row.key]) : userData[row.key]))
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Button variant="contained" sx={{ marginTop: 2 }} onClick={editMode ? handleSave : handleEdit}>
                                {editMode ? 'Save' : 'Edit'}
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container >
    );
};

export default UserProfile;
