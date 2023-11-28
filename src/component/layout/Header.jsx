import React, { useState } from 'react'
import { AppBar, Tabs, Tab, Toolbar, Button, useMediaQuery, useTheme, Grid } from '@mui/material'
import DrawerComponent from './DrawerComponent'
import logo from '../../image/tải xuống (1).png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Header() {
  const nav = useNavigate();
  const auth = useSelector((state) => state.auth?.user);
  const [tabValue, setTabValue] = useState(0)
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  return (

    <AppBar sx={{ background: 'white' }} >
      <Toolbar >
        {/* <Typography></Typography> */}

        {
          isMatch ? (
            <>
              <img src={logo} alt='' width="7%" style={{ minWidth: '80px' }} />
              {/* <Typography></Typography> */}
              <DrawerComponent />

            </>
          ) : (
            <>
              <img src={logo} alt='' width='5%' style={{ minWidth: '5%' }} />
              <Tabs onChange={(e, value) => setTabValue(value)} value={tabValue} indicatorColor='primary' sx={{ marginLeft: 'auto' }}>
                <Tab value={0} label='Khoá học online' onClick={(e) => nav('/')} />
                <Tab value={1} label='Đề thi online' onClick={() => nav('/Test')} />
                <Tab value={2} label='Flashcards' onClick={() => nav('/flashcards')} />
              </Tabs>
              {!auth ? <>
                <Button sx={{ marginLeft: 'auto' }} variant='outlined'><Link to="Login" color="inherit" underline="none">Login</Link></Button>
              </>
                : <>
                  <Button sx={{ marginLeft: 'auto' }} variant='outlined'><Link to="Login" color="inherit" underline="none">Logout</Link></Button>
                </>}
            </>
          )
        }

      </Toolbar>

    </AppBar>
  )
}
