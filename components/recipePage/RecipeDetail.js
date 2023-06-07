import { Typography, Tooltip, Rating, Button } from '@mui/material';
import React from 'react';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CarouselCustom from './CarouselCustom';
import CSS from './RecipeDetail.module.css';

const RecipeDetail = ({ recipe }) => {
    return (
        <div className={CSS.container}>
            <Typography className={CSS.title} variant="h1">
                {recipe.title}
            </Typography>

            <CarouselCustom stuff={recipe.images} />

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
                <Rating
                    className={CSS.valuation}
                    name="read-only"
                    icon={<LunchDiningIcon fontSize="large" />}
                    emptyIcon={<LunchDiningIcon fontSize="large" />}
                    value={recipe.valuation}
                    precision={0.5}
                    readOnly
                />
            </Typography>

            <Typography className={CSS.description} variant="subtitle1">
                {recipe.description}
            </Typography>

            <Typography className={CSS.price} variant="h2">
                <ShoppingCartIcon fontSize="large" /> {recipe.price} €

                <Button className={CSS.button} variant="contained" color="secondary">
                    Buy now
                </Button>
            </Typography>
        </div>
    );
};

export default RecipeDetail;
