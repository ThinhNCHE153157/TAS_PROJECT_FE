import React from 'react';
import Header from '../layout/Header';
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
                    <form action="">
                        <TextField style={marginTop} fullWidth label="First Name"></TextField>
                        <TextField style={marginTop} fullWidth label="Last Name"></TextField>
                        <TextField style={marginTop} fullWidth label="Phone"></TextField>
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
                                label="Confirm Password"
                            />
                        </FormControl>

                        <Button
                            style={marginTop}
                            sx={{ height: '45px' }}
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
                        <Link sx={{ fontWeight: 'bold' }} href="#">
                            Sign In
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
}

export default SignUp;
