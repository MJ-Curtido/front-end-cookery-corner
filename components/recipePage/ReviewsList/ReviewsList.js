//#region Imports
import { Alert, Button, List, ListItem, ListItemText, Rating, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CSS from './ReviewsList.module.css';
import { pushReview } from '@/api/recipePetitions';
import store from '@/store/store';
import { userStore } from '@/store/userStore';
//#endregion

const ReviewsList = ({ idRecipe, reviews, bought, isMine, updateRecipe }) => {
    //#region Elements
    const router = useRouter();
    const cookies = new Cookies();
    const [comment, setComment] = useState('');
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [rating, setRating] = React.useState(0);
    const [severitySnackbar, setSeveritySnackbar] = useState('success');
    const user = store(userStore, (state) => state.user);
    //#endregion

    const handleSubmit = async (e) => {
        if (comment !== '') {
            e.preventDefault();

            const review = {
                reviews: {
                    text: comment,
                    valuation: rating,
                    user: user._id,
                },
            };

            try {
                await pushReview(idRecipe, review, cookies.get('token'));

                updateRecipe();

                setComment('');
                setRating(0);

                setMessageSnackbar('Review sent.');
                setSeveritySnackbar('success');
                setOpenSnackbar(true);
            } catch (error) {
                setMessageSnackbar('Error sending review.');
                setSeveritySnackbar('error');
                setOpenSnackbar(true);
            }
        }
    };

    return (
        <div className={CSS.container}>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity={severitySnackbar}>{messageSnackbar}</Alert>
            </Snackbar>

            <Typography className={CSS.title} variant="h3" align="center" gutterBottom>
                Reviews
            </Typography>

            {bought && !isMine && (
                <div className={CSS.containerForm}>
                    <form className={CSS.formReview} onSubmit={handleSubmit}>
                        <TextField
                            className={CSS.comment}
                            label="Write your comment here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            multiline
                            rows={4}
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            required
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

                            <Button type="submit" className={CSS.button} variant="contained" color="secondary" onClick={handleSubmit}>
                                Send review
                            </Button>
                        </div>
                    </form>
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
