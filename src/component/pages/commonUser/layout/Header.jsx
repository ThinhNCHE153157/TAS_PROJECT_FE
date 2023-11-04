import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineGlobal } from 'react-icons/ai';
import logo from '../../../../image/tải xuống (1).png';

const language = ['English', 'Vietnamese'];

const Header = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: 'white' }}>
            <Toolbar>
                <img src={logo} alt="" width="3%" style={{ minWidth: '80px' }} />
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Language">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <AiOutlineGlobal size="35" color="black" />
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
                        {language.map((language) => (
                            <MenuItem key={language} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{language}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
