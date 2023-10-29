import React, { useState } from 'react';
import Header from '../layout/Header';
import { useForm } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Link,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function SignUp() {
    const { register, handleSubmit } = useForm();
    const [FirstnameError, setFirstNameError] = useState('');
    const [LastnameError, setLastNameError] = useState('');
    const [PhoneError, setPhoneError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [ConfirmPasswordError, setConfirmPasswordError] = useState('');

    const RegisterUser = (data) => {
        fetch('https://localhost:5000/api/Account/UserRegister', {
            method: 'POST',
            body: JSON.stringify({
                Email: data.Email,
                FirstName: data.Firstname,
                LastName: data.Lastname,
                Phone: data.Phone,
                Password: data.Password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    };

    const handleFormSubmit = (data) => {
        console.log(data);
        if (data.Firstname === '') {
            setFirstNameError('First name should be 3 to 20 characters');
        }
        if (data.Lastname === '') {
            setLastNameError('Last name should be 3 to 20 characters');
        }
        if (data.Phone === '') {
            setPhoneError('Phone should be 10 number and start with 0 ');
        }
        if (data.Email === '') {
            setEmailError('Email should be valid');
        }
        if (data.Password === '') {
            setPasswordError('Password should be 8 to 20 characters');
        }
        if (data.ConfirmPassword === '') {
            setConfirmPasswordError('Confirm Password should be same as password');
        } else {
            RegisterUser(data);
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
                    <Grid align="center" mt={3} mb={3}>
                        <h1>Register Account</h1>
                    </Grid>
                    <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
                        <TextField
                            {...register('Firstname')}
                            pattern="[A-Za-z]{3,20}"
                            error={FirstnameError}
                            style={marginTop}
                            fullWidth
                            required={false}
                            helperText={FirstnameError}
                            label="First Name"
                        ></TextField>
                        <TextField
                            {...register('Lastname')}
                            pattern="[A-Za-z]{3,20}"
                            error={LastnameError}
                            style={marginTop}
                            required={false}
                            fullWidth
                            helperText={LastnameError}
                            label="Last Name"
                        ></TextField>
                        <TextField
                            {...register('Phone')}
                            pattern="0[0-9]{9}"
                            error={PhoneError}
                            style={marginTop}
                            required={false}
                            fullWidth
                            helperText={PhoneError}
                            label="Phone"
                        ></TextField>
                        <TextField
                            {...register('Email')}
                            type="email"
                            error={EmailError}
                            style={marginTop}
                            fullWidth
                            helperText={EmailError}
                            label="Email"
                        ></TextField>
                        <FormControl style={marginTop} sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('Password')}
                                pattern=".{8,20}"
                                error={PasswordError}
                                required={false}
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
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
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
                                required={false}
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
                            color="primary"
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Typography
                        style={{ marginTop: '30px', marginBottom: '0px' }}
                        m="50px"
                        variant="subtitle1"
                        gutterBottom
                    >
                        Already have an account ?{' '}
                        <Link sx={{ fontWeight: 'bold' }} href="/commonUser/Login">
                            Sign In
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
}

export default SignUp;
