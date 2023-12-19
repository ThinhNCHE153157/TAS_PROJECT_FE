
import React from 'react';
import Header from '../../../layout/Header';
import { ToastContainer } from 'react-toastify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditUserProfile = () => {
    const nav = useNavigate();
    const user = useSelector(state => state.user?.User);
    return (
        <>
            <Header />
            <ToastContainer />
            <Paper elevation={3} sx={{ maxWidth: "50vw", maxHeight: "70vh", margin: '4% auto', paddingBottom: "4%" }}>
                <Box>
                    <Button onClick={() => window.history.back()}>Back</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0', flexDirection: "column" }}>
                    <Typography variant="h5" component="div" gutterBottom >
                        Chỉnh sửa thông tin cá nhân
                    </Typography>
                    <TextField label="Họ" sx={{ width: "50%", marginTop: "20px" }} value={user.lastName} />
                    <TextField label="Tên" sx={{ width: "50%", marginTop: "20px" }} value={user.firstName} />
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']} sx={{ width: "50%", marginTop: "20px" }}>
                            <DatePicker label="Ngày sinh" sx={{ width: "50%", marginTop: "20px" }} />
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormControl sx={{ width: "50%", marginTop: "20px" }}>
                        <FormLabel id="demo-radio-buttons-group-label">Giới tính</FormLabel>
                        <RadioGroup
                            sx={{ display: "flex", flexDirection: "row" }}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="nam"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="nam" control={<Radio />} label="Nam" />
                            <FormControlLabel value="nữ" control={<Radio />} label="Nữ" />
                        </RadioGroup>
                    </FormControl>
                    <TextField label="Địa chỉ" sx={{ width: "50%", marginTop: "20px" }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0' }}>
                    <Button variant="contained" color="primary" style={{ marginLeft: '20px' }}>
                        Lưu thay đổi
                    </Button>
                </Box>
            </Paper >
        </>
    )
};

export default EditUserProfile;
