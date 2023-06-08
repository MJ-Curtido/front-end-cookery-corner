//#region Imports
import React from 'react';
import CSS from './UserDetail.module.css';
import { Typography } from '@mui/material';
import UserTab from '../UserTab/UserTab';
//#endregion

const UserDetail = ({ user, onOrderByValuation, onOrderByDate }) => {
    return (
        <div className={CSS.container}>
            <Typography className={CSS.title} variant="h1">
                {user.name}
            </Typography>

            <Typography className={CSS.subtitle} variant="h2">
                Recipes order by:
            </Typography>

            <UserTab onOrderByValuation={onOrderByValuation} onOrderByDate={onOrderByDate} />
        </div>
    );
};

export default UserDetail;
