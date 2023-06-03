//#region Imports
import { AppBar, Avatar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import CSS from './Header.module.css';
//#endregion

const Header = () => {
    return (
        <AppBar className={CSS.header}>
            <Toolbar>
                <Link href="/cookerycorner/main">
                    <Avatar className={CSS.iconApp} alt="Icon" src="/iconCC.png" />
                </Link>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Cookery Corner
                </Typography>

                <Link href="/about">
                    <Avatar className={CSS.iconAdd} alt="Icon" src="/iconAdd.png" />
                </Link>

                <Link href="/about">
                    <Avatar alt="Icon" src="/iconUser.png" />
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
