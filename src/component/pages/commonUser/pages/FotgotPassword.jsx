import React from 'react';
import Header from '../layout/Header';
import {
    Grid,
    TextField,
    Button,
    Paper,
    Link,
} from '@mui/material';


function FotgotPassword() {
    const paperStyle = { padding: '30px 50px', width: 350, margin: '20px auto' };
    const marginTop = { marginTop: 13 };

    return (
        <div>
            <Header />
            <Grid mt={10}>
                <Paper elevation={4} style={paperStyle} sx={{ borderRadius: '20px' }}>
                    <Grid align="center">
                        <h1>Fotgot Password</h1>
                    </Grid>
                    <Grid align="center">
                        <Grid align="left">
                            <h4>Email Address : </h4>
                        </Grid>
                        <TextField style={marginTop} fullWidth label="Email"></TextField>
                        <Grid m={1} align="right">
                            <Link href="/commonUser/FotgotPassword">Verify Email Address</Link>
                        </Grid>
                        <Button
                            style={marginTop}
                            sx={{ height: '45px', backgroundColor: '#4A3AFF', color: '#fff' }}
                            fullWidth
                            type="submit"
                            variant="contained"
                            href="/commonUser/ResetPassword"
                        >
                            Send Reset Code
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
export default FotgotPassword;