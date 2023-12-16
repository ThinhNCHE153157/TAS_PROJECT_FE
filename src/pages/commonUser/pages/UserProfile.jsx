import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Typography, Button, Paper, Box } from '@mui/material';
import Header from '../../../layout/Header';
import { API, API_FormFile } from '../../../component/callApi'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { alertSuccess, alertError, alertWarning, alertInfo } from "../../../component/AlertComponent";

const UserProfile = () => {
    const nav = useNavigate();
    const AuthId = useSelector(state => state.auth?.user?.id);
    const [refesh, setRefesh] = useState(false);
    const changeimg = (e) => {
        const file = e.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append('AccountId', AuthId);
        formData.append('Avatar', file);
        API_FormFile.put('/Account/UpdateAvatar', formData)
            .then(res => {
                setRefesh(!refesh);
                console.log(res);
                alertSuccess({ message: "Cập nhật ảnh đại diện thành công" });
            })
            .catch(err => {
                console.log(err);
                alertError({ message: "Cập nhật ảnh đại diện thất bại" });
            })
    }
    const deleteAvatar = () => {
        API.delete(`/Account/DeleteAvatar?accountId=${AuthId}`)
            .then(res => {
                setRefesh(!refesh);
                console.log(res);
                alertSuccess({ message: "Xoá ảnh đại diện thành công" });
            })
            .catch(err => {
                console.log(err);
                alertError({ message: "Xoá ảnh đại diện thất bại" });
            })
    }

    const [user, setUser] = useState({});
    useEffect(() => {
        API.get(`/Account/GetAccountById?id=${AuthId}`)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [refesh])
    return (
        <>
            <Header />
            <ToastContainer />
            <Paper elevation={3} sx={{ maxWidth: "70vw", maxHeight: "70vh", margin: '4% auto', paddingBottom: "4%" }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0' }}>
                    <Box sx={{ width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "30px" }}>
                        <Typography variant="h5" component="span">
                            Hồ sơ cá nhân
                        </Typography>
                        <Button onClick={() => nav("/userprofile/edit")} variant="contained" color="primary" style={{ marginLeft: '20px' }}>
                            Chỉnh sửa hồ sơ
                        </Button>
                    </Box>
                </Box>
                <Box sx={
                    {
                        display: 'flex',
                        borderRadius: '10px',
                        border: "3px solid rgb(224, 224, 224)",
                        width: '90%',
                        margin: '0 auto',
                        height: '30%px',
                        justifyContent: "space-between",
                    }
                }>
                    <Box sx={{
                        display: 'flex',
                        width: '90%',
                        justifyContent: 'space-between',
                        margin: '20px auto',
                    }}>

                        <Box sx={{
                            flexBasis: '30%',
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '16px'
                        }}>

                            <Avatar style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '1.25rem',
                                lineHeight: 1,
                                borderRadius: '4px',
                                overflow: 'hidden',
                                userSelect: 'none',
                                width: '200px',
                                height: '200px',
                                marginTop: '0px',
                            }}
                                src={user.avatar}
                            />
                            <Box>
                                <Button component="label" variant="outlined" color="primary" style={{ margin: "0 auto" }}>
                                    Tải ảnh lên
                                    <input type="file" onChange={changeimg} hidden />
                                </Button>
                                <Button onClick={deleteAvatar} variant="outlined" color="primary" style={{ marginLeft: "15px" }}>
                                    Xoá
                                </Button>
                            </Box>

                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexBasis: '70%',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '8px',

                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <Typography variant='body1' component="span">
                                    Họ và tên
                                </Typography>
                                <Typography variant='body1' component="span">{user.lastName} {user.firstName}</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <Typography variant='body1' component="span">
                                    Email
                                </Typography>
                                <Typography variant='body1' component="span">
                                    {user.email}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <Typography variant='body1' component="span">
                                    Số điện thoại
                                </Typography>
                                <Typography variant='body1' component="span">
                                    {user.phone}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <Typography variant='body1' component="span">
                                    Giới tính
                                </Typography>
                                <Typography variant='body1' component="span">
                                    {user.gender == null ? "Vui lòng điền thông tin" : user.gender}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <Typography variant='body1' component="span">
                                    Ngày sinh
                                </Typography>
                                <Typography variant='body1' component="span">
                                    {user.birthday == null ? "Vui lòng điền thông tin" : user.birthday}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <Typography variant='body1' component="span">
                                    Địa chỉ
                                </Typography>
                                <Typography variant='body1' component="span">
                                    {user.address == null ? "Vui lòng điền thông tin" : user.address}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper >
        </>
    );
};

export default UserProfile;