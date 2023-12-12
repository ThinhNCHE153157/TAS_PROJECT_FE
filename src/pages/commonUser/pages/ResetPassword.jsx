import React, { useState } from 'react';
import Header from '../layout/Header';
import { useForm } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import {
    Grid,
    Paper,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Link,
    TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function ResetPassword() {
    const paperStyle = { padding: '30px 50px', width: 350, margin: '20px auto' };
    const marginTop = { marginTop: 13 };

    const { register, handleSubmit } = useForm();
    const [verificationCode, setVerificationCode] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmitResetPassword = async (data) => {
        data.preventDefault();

        try {
            console.log(data);
            if (data.Password === '') {
                setPassword('Password should be 8 to 20 characters');
            }
            if (data.ConfirmPassword === '') {
                setConfirmPassword('Confirm Password should be same as password');
            }
            if (verificationCode === 'yourVerificationCode' && Password) {
                setMessage('Password reset successful.');
            } else {
                setMessage('Invalid verification code or password.');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred.');
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        // event.preventDefault();
    };

    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event) => {
        // event.preventDefault();
    };

    const notificationStyle = {
        color: 'red',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
    };

    return (
        <div>
            <Header />
            <Grid mt={10}>
                <Paper elevation={4} style={paperStyle} sx={{ borderRadius: '20px' }}>
                    <Grid align="center">
                        <h1>Fotgot Password</h1>
                    </Grid>
                    <Grid align="center">
                        <form onSubmit={handleSubmitResetPassword}>
                            <Grid align="left">
                                <h4>Fotgot Password : </h4>
                            </Grid>
                            <TextField style={marginTop} fullWidth label="Code" type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}></TextField>
                            <FormControl style={marginTop} sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('Password')}
                                    pattern=".{8,20}"
                                    error={Password}
                                    required={true}
                                    autoComplete="off"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    helperText={Password}
                                    label="Password"
                                />
                                {Password && <FormHelperText sx={{ color: 'red' }}>{Password}</FormHelperText>}
                            </FormControl>
                            <FormControl style={marginTop} sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="Confirm-Password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="confirm-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    {...register('ConfirmPassword')}
                                    pattern={Password}
                                    error={ConfirmPassword}
                                    required={true}
                                    label="Confirm Password"
                                />
                                {ConfirmPassword && (
                                    <FormHelperText sx={{ color: 'red' }}>{ConfirmPassword}</FormHelperText>
                                )}
                            </FormControl>
                            <Grid m={1} align="right">
                                <Link href="/commonUser/FotgotPassword">Verify Code</Link>
                            </Grid>
                            <Button
                                style={marginTop}
                                sx={{ height: '45px', backgroundColor: '#4A3AFF', color: '#fff' }}
                                fullWidth
                                type="submit"
                                variant="contained"
                                href="/commonUser/Login"
                            >
                                Reset Password
                            </Button>
                        </form>
                        <div style={notificationStyle}>{message}</div>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
export default ResetPassword;