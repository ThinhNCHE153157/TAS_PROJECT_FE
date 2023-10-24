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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';

function Login() {
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
                            <TextField style={marginTop} fullWidth label="Email"></TextField>
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
                                    label="Password"
                                />
                            </FormControl>
                            <Grid m={1} align="right">
                                <Link href="#">Forgot password?</Link>
                            </Grid>
                            <Button
                                style={marginTop}
                                sx={{ height: '45px', backgroundColor: '#4A3AFF', color: '#fff' }}
                                fullWidth
                                type="submit"
                                variant="contained"
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
                        Don't have an account? <Link href="#">Register now</Link>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}

export default Login;
