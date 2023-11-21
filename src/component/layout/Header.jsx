import React, { useState } from 'react'
import { AppBar, Tabs, Tab, Toolbar, Button, useMediaQuery, useTheme } from '@mui/material'
import DrawerComponent from './DrawerComponent'
import logo from '../../image/tải xuống (1).png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Header() {
  const auth = useSelector((state) => state.auth?.user);
  const [tabValue, setTabValue] = useState(0)
  const theme = useTheme();
  const Pages = ['Home', 'About', 'Resourses', 'Contact']
  // console.log(theme)
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  // console.log(isMatch)
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
                {
                  Pages.map((page, index) => (
                    <Tab value={index} label={page} key={index} />
                  ))
                }
              </Tabs>
              {!auth ? <>
                <Button sx={{ marginLeft: 'auto' }} variant='outlined'><Link to="Login" color="inherit" underline="none">Login</Link></Button>
                <Button sx={{ marginLeft: '10px' }} variant='contained'>Get started</Button>
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
