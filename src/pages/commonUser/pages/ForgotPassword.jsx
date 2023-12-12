import Header from '../layout/Header';
import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Link,
    Paper,
} from '@mui/material';
import { red } from '@mui/material/colors';

function ForgotPassword() {
    const paperStyle = { padding: '30px 50px', width: 350, margin: '20px auto' };
    const marginTop = { marginTop: 13 };

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showCard, setShowCard] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                setShowCard(true);
                setMessage('Verification code sent successfully');
            } else {
                setShowCard(true);
                setMessage('Error sending verification code');
            }
        } catch (error) {
            setShowCard(true);
            setMessage('An error occurred');
        }
    };

    const cardStyle = { width: 300, margin: '20px auto', backgroundColor: '#ffcdd2', display: showCard ? 'block' : 'none' };

    return (
        <div>
            <Header />
            <Grid mt={10}>
                <Paper elevation={4} style={paperStyle} sx={{ borderRadius: '20px' }}>
                    <Grid align="center">
                        <h1>Forgot Password</h1>
                    </Grid>
                    <Grid align="center">
                        <form onSubmit={handleSubmit}>
                            <Grid align="left">
                                <h4>Email Address : </h4>
                            </Grid>
                            <TextField style={marginTop} fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                            <Grid m={1} align="right">
                                <Link href="/commonUser/ForgotPassword">Verify Email Address</Link>
                            </Grid>
                            <Button
                                style={marginTop}
                                sx={{ height: '45px', backgroundColor: '#4A3AFF', color: '#fff' }}
                                fullWidth
                                type="submit"
                                variant="contained"
                            >
                                Send Reset Code
                            </Button>
                        </form>
                        <Card elevation={4} style={cardStyle}>
                            <CardContent>
                                <Typography color="textSecondary">{message}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
export default ForgotPassword;
