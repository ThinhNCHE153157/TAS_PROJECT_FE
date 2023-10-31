import React from 'react';
import Header from '../layout/Header';
import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Paper,
    Link,
    Typography,
    FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();

    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userNameError, setUserNameError] = React.useState('');
    const handleUsername = (event) => {
        if (event.target.value === '') {
            setUserNameError('Username cant be empty');
        } else {
            setUserNameError('');
            setUserName(event.target.value);
        }
    };
    const handlePassword = (event) => {
        if (event.target.value === '') {
            setPasswordError('Password cant be empty');
        } else {
            setPasswordError('');
            setPassword(event.target.value);
        }
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        // event.preventDefault();
    };

    const paperStyle = { padding: '30px 50px', width: 350, margin: '20px auto' };
    const marginTop = { marginTop: 13 };

    const lineStyle = {
        marginTop: '20px',
        marginBottom: '20px',
        width: '40%',
        borderBottom: '1px solid #000',
    };
    const LoginAPI = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer {{bearerToken}}');

        var raw = JSON.stringify({
            userName: userName,
            password: password,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('https://localhost:5000/api/Account/UserLogin', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.accessToken);
                localStorage.setItem('token', data.accessToken);
                navigate('/Admin/Dashboard');
            })
            .catch((error) => console.log('error', error));
    };
    return (
        <div>
            <Header />
            <Grid mt={10}>
                <Paper elevation={4} style={paperStyle} sx={{ borderRadius: '20px' }}>
                    <Grid align="center">
                        <h1>Login</h1>
                    </Grid>
                    <Grid align="center">
                        <form action="">
                            <TextField
                                style={marginTop}
                                fullWidth
                                error={userNameError}
                                helperText={userNameError}
                                onChange={handleUsername}
                                label="Email"
                            ></TextField>
                            <FormControl style={marginTop} sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
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
                                    error={passwordError}
                                    required={true}
                                    onChange={handlePassword}
                                    label="Password"
                                />
                                {passwordError && (
                                    <FormHelperText sx={{ color: 'red' }}>{passwordError}</FormHelperText>
                                )}
                            </FormControl>
                            <Grid m={1} align="right">
                                <Link href="#">Forgot password?</Link>
                            </Grid>
                            <Button
                                style={marginTop}
                                sx={{ height: '45px', backgroundColor: '#4A3AFF', color: '#fff' }}
                                fullWidth
                                type="button"
                                variant="contained"
                                onClick={LoginAPI}
                            >
                                Login
                            </Button>
                        </form>
                        <Grid container>
                            <Grid item xs={5} style={lineStyle}></Grid>
                            <Grid item xs={2}>
                                <Typography sx={{ fontSize: '25px' }}>or</Typography>
                            </Grid>
                            <Grid item xs={5} style={lineStyle}></Grid>
                        </Grid>
                        <Button>
                            <GoogleIcon size={30} />
                        </Button>
                    </Grid>

                    <Grid align="center">
                        Don't have an account? <Link href="/CommonUser/Register">Register now</Link>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}

export default Login;