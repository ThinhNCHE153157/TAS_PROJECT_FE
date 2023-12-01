import React, { useState } from 'react'
import { AppBar, Tabs, Tab, Toolbar, Button, useMediaQuery, useTheme, Box, Tooltip, IconButton, Avatar, Menu, Typography, MenuItem } from '@mui/material'
import DrawerComponent from './DrawerComponent'
import logo from '../../Assets/img/Logo1.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Padding } from '@mui/icons-material'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export default function Header() {
  const nav = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = useSelector((state) => state.auth?.user);
  const [tabValue, setTabValue] = useState(0)
  const theme = useTheme();
  const Pages = ['Home', 'About', 'Resourses', 'Contact', 'Testing online', 'My course']


  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // console.log(theme)
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
              <img src={logo} alt='' width='6%' style={{ minWidth: '5%', marginLeft: "7%" }} />
              <Tabs onChange={handleChange} value={tabValue} indicatorColor='primary' sx={{ marginLeft: 'auto' }}>
                <Tab key={0} value={0} label='Khoá học online' onClick={() => { nav('/') }} />
                <Tab key={1} value={1} label='Đề thi online' onClick={() => nav('/Test')} />
                <Tab key={2} label='Flashcards' onClick={() => nav('/flashcards')} />
              </Tabs>
              {!auth ? <>
                <Button sx={{ marginLeft: 'auto' }} variant='outlined'><Link to="Login" color="inherit" underline="none">Login</Link></Button>
              </>
                : <>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          {(setting === 'Logout') ? <Link to="/Login" color="inherit" underline="none">{setting}</Link>
                            :
                            <Typography textAlign="center">{setting}</Typography>}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </>}
            </>
          )
        }

      </Toolbar>

    </AppBar>
  )
}
