//#region Imports
import React from 'react';
import CSS from './UserDetail.module.css';
import { Typography } from '@mui/material';
//#endregion

//TODO: Añadir un Select para cambiar si mostrar ordenado por fecha o por valorción

const UserDetail = ({ user }) => {
    return (
        <div className={CSS.container}>
            <Typography className={CSS.title} variant="h1">
                {user.name}
            </Typography>

            <Typography className={CSS.subtitle} variant="h2">
                Recipes:
            </Typography>
        </div>
    );
};

export default UserDetail;
