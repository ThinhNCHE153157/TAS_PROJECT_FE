
import React, { useEffect, useState } from 'react';
import Header from '../../../layout/Header';
import { ToastContainer } from 'react-toastify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GetUserById, updateUser } from '../../../Services/UserProfileService';
import { alertError, alertSuccess } from '../../../component/AlertComponent';

const EditUserProfile = () => {
    const nav = useNavigate();
    //const AuthId = useSelector(state => state.auth?.user?.id);
    const { id } = useParams();
    const [refesh, setRefesh] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        GetUserById(id).then(res => {
            setUser(res);
            setFirstName(res.firstName);
            setLastName(res.lastName);
            setPhone(res.phone);
            setAddress(res.address);
            setGender(res.gender);
            setRefesh(!refesh);
            console.log(user);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [gender, setGender] = useState();

    const account = {
        accountId: id,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,
        gender: gender
    }

    const handlesubmit = () => {

        updateUser(account).then(res => {
            console.log(res);
            alertSuccess({ message: "Cập nhật thông tin thành công" });
        }
        ).catch(err => {
            console.log(err);
            alertError({ message: "Cập nhật thông tin thất bại" });
        })
    }


    console.log(account)


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };
    return (
        <>
            <Header />
            <ToastContainer />
            {refesh ? (
                <Paper elevation={3} sx={{ maxWidth: "50vw", maxHeight: "70vh", margin: '4% auto', paddingBottom: "4%" }}>
                    <Box>
                        <Button onClick={() => window.history.back()}>Back</Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0', flexDirection: "column" }}>
                        <Typography variant="h5" component="div" gutterBottom >
                            Chỉnh sửa thông tin cá nhân
                        </Typography>
                        <TextField label="Họ" sx={{ width: "50%", marginTop: "20px" }} defaultValue={user?.lastName} onChange={(e) => setLastName(e.target.value)} />
                        <TextField label="Tên" sx={{ width: "50%", marginTop: "20px" }} defaultValue={user?.firstName} onChange={(e) => setFirstName(e.target.value)} />
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']} sx={{ width: "50%", marginTop: "20px" }}>
                                <DatePicker label="Ngày sinh" sx={{ width: "50%", marginTop: "20px" }} defaultValue={new Date(formatDate(user?.dob))} />
                            </DemoContainer>
                        </LocalizationProvider> */}
                        <TextField label="Số điện thoại" sx={{ width: "50%", marginTop: "20px" }} defaultValue={user?.phone} onChange={(e) => setPhone(e.target.value)} />
                        <FormControl sx={{ width: "50%", marginTop: "20px" }}>
                            <FormLabel id="demo-radio-buttons-group-label">Giới tính</FormLabel>
                            <RadioGroup
                                sx={{ display: "flex", flexDirection: "row" }}
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={(user?.gender) ? "nam" : "nữ"}
                                name="radio-buttons-group"
                                onChange={(e) => { if (e.target.value == "nam") setGender(true); else setGender(false) }}
                            >
                                <FormControlLabel value="nam" control={<Radio />} label="Nam" />
                                <FormControlLabel value="nữ" control={<Radio />} label="Nữ" />
                            </RadioGroup>
                        </FormControl>
                        <TextField label="Địa chỉ" sx={{ width: "50%", marginTop: "20px" }} defaultValue={user?.address} onChange={(e) => setAddress(e.target.value)} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0' }}>
                        <Button variant="contained" color="primary" style={{ marginLeft: '20px' }} onClick={handlesubmit}>
                            Lưu thay đổi
                        </Button>
                    </Box>
                </Paper >
            ) : ("")}
        </>
    )
};

export default EditUserProfile;
