//#region Imports
import { AppBar, Avatar, Toolbar, Typography, Tooltip } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import CSS from './Header.module.css';
//#endregion

const Header = () => {
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

                <Link href="/about">
                    <Tooltip title="Create recipe" placement="bottom">
                        <Avatar className={CSS.iconAdd} alt="Icon" src="/iconAdd.png" />
                    </Tooltip>
                </Link>

                <Link href="/about">
                    <Tooltip title="View profile" placement="bottom">
                        <Avatar alt="Icon" src="/iconUser.png" />
                    </Tooltip>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
