//#region Imports
import { useRouter } from 'next/router';
import { Card, CardHeader, CardMedia, CardContent, Rating, Typography, Tooltip } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import CSS from './RecipeCard.module.css';
//#endregion

const RecipeCard = ({ id, title, image, description, author, valuation }) => {
    const router = useRouter();

    return (
        <div className={CSS.container}>
            <Card className={CSS.card}>
                <CardHeader
                    onClick={() => {
                        router.push(`/cookerycorner/recipe/${id}`);
                    }}
                    className={CSS.titleCard}
                    title={title}
                />
                <CardMedia
                    onClick={() => {
                        router.push(`/cookerycorner/recipe/${id}`);
                    }}
                    className={CSS.imgCard}
                    component="img"
                    height="200"
                    image={image ? image : '/noPhoto.jpg'}
                    alt="Descripción de la imagen"
                />
                <CardContent>
                    <Typography className={CSS.description} variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography className={CSS.author} variant="body2" color="black">
                        <Tooltip title="View profile" placement="bottom">
                            <RestaurantMenuIcon
                                onClick={() => {
                                    router.push(`/cookerycorner/user/${author._id}`);
                                }}
                                className={CSS.iconAuthor}
                            />
                        </Tooltip>
                        {author.name}
                        <Rating
                            className={CSS.valuation}
                            name="read-only"
                            icon={<LunchDiningIcon fontSize="inherit" />}
                            emptyIcon={<LunchDiningIcon fontSize="inherit" />}
                            value={valuation}
                            precision={0.1}
                            readOnly
                        />
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default RecipeCard;
