import React from 'react'
import Header from '../layout/Header';
import { Box, Button, Card, Divider, TextField, Typography } from '@mui/material';

const ResetPassword = () => {
    return (
        <div>
            <Header />
            <Box
                width='100%'
                display='flex'
                height='900px'
                alignItems='center'
                justifyContent='center'
            >
                <Card
                    sx={{
                        width: '22%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid black'
                    }}
                    elevation={9}
                >
                    <Box
                        width='90%'
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        mt='5%'
                    >
                        <Typography fontSize='40px' fontWeight={'bold'}>Reset Password</Typography>
                        <Typography fontSize='15px' mt='2%' mb='5%'>Enter your mail for a password reset link</Typography>
                        <Divider sx={{ height: '3px', bgcolor: 'gray', width: '100% ' }} />
                        <TextField
                            label='Email, phone & username'
                            sx={{
                                width: '100%',
                                mt: '6%',
                                fontSize: '50px',
                                '& .MuiInputLabel-root': {
                                    fontSize: '20px', // Tăng kích thước của chữ trong InputLabel
                                },
                                '& .MuiInputBase-input': {
                                    fontSize: '20px', // Tăng kích thước của chữ trong TextField
                                },
                            }}
                        />
                        <Button variant='text' sx={{ textTransform: 'none', mr: '70%', mt: '6%', width: '100%', display: 'flex', alignContent: 'left' }}>
                            <Typography ml='6%' fontSize='20px' fontStyle='initial'>Quên tên đăng nhập </Typography>
                        </Button>
                        <Button variant='contained' sx={{ mt: '10%', bgcolor: '#4A3AFF', width: '100%', textTransform: 'none', padding: '20px 0px', borderRadius: '5px' }}>
                            <Typography fontSize='20px' fontStyle='initial'>Gửi Link </Typography>
                        </Button>
                        <Button variant='text' sx={{ textTransform: 'none', mt: '10%', mb: '12%' }}>
                            <Typography fontSize='20px' >Trở về đăng nhập </Typography>
                        </Button>
                    </Box>

                </Card>
            </Box>
        </div >
    )
}

export default ResetPassword