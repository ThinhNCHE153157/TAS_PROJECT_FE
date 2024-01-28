import React, { useEffect, useState } from 'react'
import { AppBar, Tabs, Tab, Toolbar, Button, useMediaQuery, useTheme, Box, Tooltip, IconButton, Avatar, Menu, Typography, MenuItem } from '@mui/material'
import DrawerComponent from './DrawerComponent'
import logo from '../Assets/img/Logo1.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/Account/apiRequest'
import Popup from '../pages/HomePage/Component/Popup'
import { GetUserById } from '../Services/UserProfileService'
import { jwtDecode } from 'jwt-decode'

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
  const auth = useSelector((state) => state.auth?.user);
  // const token = localStorage.getItem('token');
  // const decoded = jwtDecode(token?.toString());
  // const userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const [userdata, setData] = useState()
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(dispatch);
  };
  useEffect(() => {
    GetUserById(auth?.id)
      .then(res => {
        setData(res)
      })
      .catch(err => {
      }
      )
  }, [auth?.id])
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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
                        <Avatar alt="Remy Sharp" src={userdata?.avatar} />
                        <Typography>&nbsp;&nbsp;   Chào, {userdata?.lastName}</Typography>
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
                      <MenuItem textAlign="center" onClick={() => {
                        setAnchorElUser(null);
                        nav('/UserProfile')
                      }
                      }> Trang cá nhân</MenuItem>
                      <MenuItem textAlign="center" onClick={() => {
                        setAnchorElUser(null);
                        nav('/RequestEnterprise')
                      }
                      }> Đăng kí doannh nghiệp</MenuItem>
                      <MenuItem textAlign="center" onClick={() => {
                        setAnchorElUser(null);
                        nav('/StudyProgress')
                      }
                      }> Tiến trình học</MenuItem>
                      {/* <MenuItem textAlign="center" onClick={() => {
                        setAnchorElUser(null);
                        nav('/StudyProgress')
                      }
                      }> Tiến trình học</MenuItem>
                      {
                        userRole?.find((role) => "Admin".includes(role)) ? <MenuItem textAlign="center" onClick={() => {
                          setAnchorElUser(null);
                          nav('/Admin')
                        }
                        }>Quản trị viên</MenuItem> : ''
                      }
                      {
                        userRole?.find((role) => "Enterprise".includes(role)) ? <MenuItem textAlign="center" onClick={() => {
                          setAnchorElUser(null);
                          nav('/Enterprise')
                        }
                        }>Quản lí doanh nghiệp</MenuItem> : ''
                      } */}
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={handleLogout}>Đăng Xuất</Typography>
                      </MenuItem>
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
