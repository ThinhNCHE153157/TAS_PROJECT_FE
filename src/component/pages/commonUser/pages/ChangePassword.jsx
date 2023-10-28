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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function ChangePassword() {

    const { register, handleSubmit } = useForm();
    const [PasswordError, setPasswordError] = useState('');
    const [ConfirmPasswordError, setConfirmPasswordError] = useState('');

    const handleFormSubmit = (data) => {
        console.log(data);
        if (data.Password === '') {
            setPasswordError('Password should be 8 to 20 characters');
        }
        if (data.ConfirmPassword === '') {
            setConfirmPasswordError('Confirm Password should be same as password');
        }
    };

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

    const paperStyle = { padding: '30px 50px', width: 350, margin: '20px auto' };
    const marginTop = { marginTop: 13 };

    return (
        <div>
            <Header />
            <Grid mt={10}>
                <Paper elevation={4} style={paperStyle} sx={{ borderRadius: '20px' }}>
                    <Grid align="center">
                        <h1>Change Password</h1>
                    </Grid>
                    <Grid align="center">
                        <FormControl style={marginTop} sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('Password')}
                                pattern=".{8,20}"
                                error={PasswordError}
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
                                helperText={PasswordError}
                                label="Password"
                            />
                            {PasswordError && <FormHelperText sx={{ color: 'red' }}>{PasswordError}</FormHelperText>}
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
                                pattern={PasswordError}
                                error={ConfirmPasswordError}
                                required={true}
                                label="Confirm Password"
                            />
                            {ConfirmPasswordError && (
                                <FormHelperText sx={{ color: 'red' }}>{ConfirmPasswordError}</FormHelperText>
                            )}
                        </FormControl>
                        <Button
                            style={marginTop}
                            sx={{ height: '45px', backgroundColor: '#4A3AFF', color: '#fff' }}
                            fullWidth
                            type="submit"
                            variant="contained"
                            href="/commonUser/Login"
                        >
                            Change Password
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
export default ChangePassword;