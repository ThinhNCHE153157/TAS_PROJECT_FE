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
          <Typography variant="h6">Liên hệ chúng tôi</Typography>
          <Typography>
            Email: <Link href="emailto:toeicsystem@gmail.com">toeicsystem@gmail.com</Link>
          </Typography>
          <Typography>Điện thoại: (032) 829-9716</Typography>
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
        &copy; 2023 Toeic Master. All rights reserved. | Designed by SEP490-G62
      </Typography>
    </footer>
  );
};

export default Footer;
