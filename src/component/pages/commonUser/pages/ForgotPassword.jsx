import Header from '../layout/Header';
import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Button,
    Paper,
    Link,
} from '@mui/material';


function ForgotPassword() {
    const paperStyle = { padding: '30px 50px', width: 350, margin: '20px auto' };
    const marginTop = { marginTop: 13 };

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const verificationCode = generateRandomCode();

            const response = await fetch('/send-verification-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, verificationCode }),
            });

            if (response.status === 200) {
                setMessage('Verification code sent successfully');
            } else {
                setMessage('Error sending verification code');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
        }
    }

    function generateRandomCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

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
                        <form onSubmit={handleSubmit}>
                            <Grid align="left">
                                <h4>Email Address : </h4>
                            </Grid>
                            <TextField style={marginTop} fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                            <Grid m={1} align="right">
                                <Link href="/commonUser/FotgotPassword">Verify Email Address</Link>
                            </Grid>
                            <Button
                                style={marginTop}
                                sx={{ height: '45px', backgroundColor: '#4A3AFF', color: '#fff' }}
                                fullWidth
                                type="submit"
                                variant="contained"
                                href=""
                            >
                                Send Reset Code
                            </Button>
                        </form>
                        <div style={notificationStyle}>{message}</div>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
export default ForgotPassword;