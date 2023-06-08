//#region Imports
import { Typography, Tooltip, Rating, Button, Divider } from '@mui/material';
import React from 'react';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CarouselCustom from '../CarouselCustom/CarouselCustom';
import CSS from './RecipeDetail.module.css';
//#endregion

//TODO: Hacer que cuando le de a comprar, salga un modal y te ponga los datos necesarios para comprarlo

const RecipeDetail = ({ recipe, isMine, bought, scrollToBottom }) => {
    return (
        <div className={CSS.container}>
            <Typography className={CSS.title} variant="h1">
                {recipe.title}
            </Typography>

            <CarouselCustom stuff={recipe.images.length !== 0 ? recipe.images : ['/noPhoto.jpg']} />

            <Typography className={CSS.author} variant="overline" color="black">
                <Tooltip title="View profile" placement="bottom">
                    <RestaurantMenuIcon
                        onClick={() => {
                            router.push(`/cookerycorner/user/${author._id}`);
                        }}
                        className={CSS.iconAuthor}
                        fontSize="large"
                    />
                </Tooltip>
                {recipe.author.name}

                <Tooltip title="View reviews" placement="bottom">
                    <div
                        className={CSS.valuation}
                        onClick={() => {
                            scrollToBottom();
                        }}
                    >
                        <Rating
                            name="read-only"
                            icon={<LunchDiningIcon fontSize="large" />}
                            emptyIcon={<LunchDiningIcon fontSize="large" />}
                            value={recipe.valuation}
                            precision={0.1}
                            readOnly
                        />
                    </div>
                </Tooltip>
            </Typography>

            <Typography className={CSS.description} variant="subtitle1">
                {recipe.description}
            </Typography>

            <Typography className={CSS.buy} variant="h2">
                {recipe.price} €
                {!isMine && !bought && (
                    <Button className={CSS.button} variant="contained" color="secondary">
                        <ShoppingCartIcon fontSize="large" />
                    </Button>
                )}
            </Typography>
        </div>
    );
};

export default RecipeDetail;
