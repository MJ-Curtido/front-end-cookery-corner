import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CSS from './RecipeCard.module.css';

const RecipeCard = ({title, image, description, author, valuation}) => {
    return (
        <div style={{ width: '50%' }}>
            <Card sx={{ margin: '0 10px 20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', backgroundColor: '#424242' }}>
                <CardHeader sx={{color: 'white'}} title={title} />
                <CardMedia component="img" height="200" image="/noPhoto.jpg" alt="Descripción de la imagen" />
                <CardContent>
                    <Typography sx={{color: 'white'}} className={CSS.description} variant="body2" color="text.secondary">
                        Aquí va la descripción del Card. Puedes agregar texto o cualquier otro contenido aquí.
                    </Typography>
                    <Typography sx={{color: 'white'}} className={CSS.author} variant="body2" color="black">
                        <RestaurantMenuIcon className={CSS.iconAuthor} />Manuel Jesús Curtido Rosado
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default RecipeCard;

//TODO: esto está por terminar