//#region Imports
import { AppBar, Avatar, Toolbar, Typography, Tooltip, Box, Menu, MenuItem, Divider, ListItemIcon, IconButton } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import store from '@/store/store';
import { userStore } from '@/store/userStore';
import CSS from './Header.module.css';
import { Logout, Settings } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
//#endregion

const Header = () => {
    //#region Elements
    const cookies = new Cookies();
    const router = useRouter();
    const user = store(userStore, (state) => state.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    //#endregion

    //#region Functions
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccount = () => {
        router.push(`/cookerycorner/user/${user ? user._id : ''}`);

        setAnchorEl(null);
    };

    const handleLogout = () => {
        cookies.remove('token');

        router.push('/');

        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    //#endregion

    return (
        <AppBar className={CSS.header}>
            <Toolbar>
                <Link href="/cookerycorner/main">
                    <Tooltip title="Home" placement="bottom">
                        <Avatar className={CSS.iconApp} alt="Icon" src="/iconCC.png" />
                    </Tooltip>
                </Link>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Cookery Corner
                </Typography>

                <Link href="/cookerycorner/create">
                    <Tooltip title="Create recipe" placement="bottom">
                        <PlaylistAddIcon className={CSS.icons} />
                    </Tooltip>
                </Link>

                <Link href="/cookerycorner/purchased">
                    <Tooltip title="Purchased recipes" placement="bottom">
                        <LocalAtmIcon className={CSS.icons} />
                    </Tooltip>
                </Link>

                <Box>
                    <Tooltip title="Account" placement="bottom">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ position: 'relative' }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar className={CSS.iconProfile} alt="Icon" src="/iconUser.png" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleAccount}>
                        <Avatar className={CSS.iconProfile} alt="Icon" src="/iconUser.png" /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
