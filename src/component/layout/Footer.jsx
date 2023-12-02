import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const footerStyle = {
  backgroundColor: '#f5f5f5',
  padding: '20px',
  marginTop: '30px',
};

const Footer = () => {
  return (
    <footer style={footerStyle} >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography>
            Email: <Link href="mailto:info@example.com">info@example.com</Link>
          </Typography>
          <Typography>Phone: (123) 456-7890</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Quick Links</Typography>
          <Typography>
            <Link href="/">Home</Link>
          </Typography>
          <Typography>
            <Link href="/about">About Us</Link>
          </Typography>
          <Typography>
            <Link href="/services">Services</Link>
          </Typography>
          <Typography>
            <Link href="/contact">Contact</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Connect With Us</Typography>
          {/* Add your social media icons and links here */}
        </Grid>
      </Grid>
      <Typography variant="body2" color="textSecondary" align="center">
        &copy; 2023 Your Website Name. All rights reserved. | Designed by Your Company
      </Typography>
    </footer>
  );
};

export default Footer;
