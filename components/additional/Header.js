//#region Imports
import { AppBar, Avatar, Toolbar, Typography, Tooltip } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import store from '@/store/store';
import { userStore } from '@/store/userStore';
import CSS from './Header.module.css';
//#endregion

//TODO: Añadir que cuando le de a lo de añadir receta, se le redirija a la página de crear receta

const Header = () => {
    const user = store(userStore, (state) => state.user);

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

                <Link href="/cookerycorner/">
                    <Tooltip title="Create recipe" placement="bottom">
                        <Avatar className={CSS.iconAdd} alt="Icon" src="/iconAdd.png" />
                    </Tooltip>
                </Link>

                <Link href="/cookerycorner/purchased">
                    <Tooltip title="Purchased recipes" placement="bottom">
                        <LocalAtmIcon className={CSS.iconPurchased} />
                    </Tooltip>
                </Link>

                <Link href={`/cookerycorner/user/${user ? user._id : ''}`}>
                    <Tooltip title="View profile" placement="bottom">
                        <Avatar className={CSS.iconProfile} alt="Icon" src="/iconUser.png" />
                    </Tooltip>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
