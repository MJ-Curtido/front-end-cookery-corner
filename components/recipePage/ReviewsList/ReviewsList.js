//#region Imports
import { Button, List, ListItem, ListItemText, Rating, TextField, Tooltip, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CSS from './ReviewsList.module.css';
//#endregion

const ReviewsList = ({ reviews, bought, isMine }) => {
    //#region Elements
    const router = useRouter();
    const [comment, setComment] = useState('');
    const [rating, setRating] = React.useState(0);
    //#endregion

    //#region Functions
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        // Lógica para enviar el comentario y la calificación
        console.log('Comentario:', comment);
        console.log('Calificación:', rating);
    };
    //#endregion

    return (
        <div className={CSS.container}>
            <Typography className={CSS.title} variant="h3" align="center" gutterBottom>
                Reviews
            </Typography>

            {bought && !isMine && (
                <div className={CSS.containerForm}>
                    <div className={CSS.formReview}>
                        <TextField
                            className={CSS.comment}
                            label="Escribe tu comentario aquí"
                            value={comment}
                            onChange={handleCommentChange}
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                        />

                        <div className={CSS.valuationBotton}>
                            <Rating
                                className={CSS.valuation}
                                name="simple-controlled"
                                value={rating}
                                icon={<LunchDiningIcon fontSize="inherit" />}
                                emptyIcon={<LunchDiningIcon fontSize="inherit" />}
                                precision={0.1}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />

                            <Button className={CSS.button} variant="contained" color="primary" onClick={handleSubmit}>
                                Enviar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {reviews.length !== 0 ? (
                <List className={CSS.list}>
                    {reviews.map((review, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                className={CSS.review}
                                primary={
                                    <Typography className={CSS.userReview} variant="overline" component="h3">
                                        <Tooltip title="View profile" placement="bottom">
                                            <RestaurantMenuIcon
                                                onClick={() => {
                                                    router.push(`/cookerycorner/user/${review.user._id}`);
                                                }}
                                                className={CSS.iconAuthor}
                                                fontSize="large"
                                            />
                                        </Tooltip>
                                        {review.user.name}
                                    </Typography>
                                }
                                secondary={
                                    <Fragment>
                                        <Typography className={CSS.commentReview} variant="body1" component="span">
                                            {review.text}
                                        </Typography>
                                        <br />
                                        <Rating
                                            className={CSS.valuationReview}
                                            name="read-only"
                                            icon={<LunchDiningIcon fontSize="inherit" />}
                                            emptyIcon={<LunchDiningIcon fontSize="inherit" />}
                                            value={review.valuation}
                                            precision={0.1}
                                            readOnly
                                        />
                                    </Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography className={CSS.title} align="center" variant="h5" component="h2">
                    There are no reviews yet.
                </Typography>
            )}
        </div>
    );
};

export default ReviewsList;
