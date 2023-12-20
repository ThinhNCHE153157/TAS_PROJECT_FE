import React, { useEffect, useState } from 'react'
import { AppBar, Tabs, Tab, Toolbar, Button, useMediaQuery, useTheme, Box, Tooltip, IconButton, Avatar, Menu, Typography, MenuItem } from '@mui/material'
import DrawerComponent from './DrawerComponent'
import logo from '../Assets/img/Logo1.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/Account/apiRequest'
import Popup from '../pages/HomePage/Component/Popup'
import { GetUserById } from '../Services/UserProfileService'

const settings = ['Account', 'Progress', 'Dashboard', 'Logout'];
export default function Header() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  // const [userimg, setUserimg] = useState({})
  // useEffect(() => {
  //   const userImage = GetUserById(auth?.id)
  //     .then(res => {
  //       setUserimg(res)
  //     })
  // }, [])
  const user = useSelector((state) => state.user?.User?.username);
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(dispatch);
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = useSelector((state) => state.auth?.user);
  const [tabValue, setTabValue] = useState()
  const theme = useTheme();
  const Pages = ['/', '/Test', '/flashcards']

  const handleChange = (event, newValue) => {
    event.preventDefault();
    //setTabValue(newValue);
    nav(Pages[newValue]);
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
    <AppBar position="sticky" sx={{ background: 'white' }} >

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
              <img src={logo} alt='' width='6%' style={{ minWidth: '5%', marginLeft: "7%" }} onClick={() => nav("/")} />
              <Tabs
                onChange={handleChange}
                value={tabValue}
                indicatorColor='primary'
                sx={{ marginLeft: 'auto' }}
              >
                <Tab key={0} value={0} label='Khoá học online' />
                <Tab key={1} value={1} label='Đề thi online' />
                <Tab key={2} value={2} label='Flashcards' />
              </Tabs>
              {!auth ? <>
                <Button sx={{ marginLeft: 'auto' }} variant='outlined'><Link to="/Login" color="inherit" underline="none">Login</Link></Button>
              </>
                : <>

                  <Box sx={{ marginLeft: 'auto', flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="" />
                        <Typography>&nbsp;&nbsp;   Hi, {user}</Typography>
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
                      <MenuItem onClick={() => {
                        setAnchorElUser(null);
                        nav('/UserProfile')
                      }
                      }> Profile</MenuItem>
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          {(setting === 'Logout') ? <>
                            <Typography textAlign="center" onClick={handleLogout}>{setting}</Typography>
                          </>
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
        <Popup />

      </Toolbar>

    </AppBar>
  )
}
