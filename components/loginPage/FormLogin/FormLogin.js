//#region Imports
import { Alert, Avatar, Box, Button, CssBaseline, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from 'react';
import * as yup from 'yup';
import CSS from './FormLogin.module.css';
import { userStore } from '@/store/userStore';
//#endregion

const FormLogin = () => {
    //#region Elements
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [severitySnackbar, setSeveritySnackbar] = useState('success');
    const router = useRouter();

    const login = userStore((state) => state.login);
    //#endregion

    //#region Functions
    const validationSchema = yup.object().shape({
        email: yup.string().email('Enter a valid email.').required('Email is required.'),
        password: yup.string().min(7, 'Password must include at least 8 characters.').required('Password is required.'),
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const formData = {
            email: data.get('email'),
            password: data.get('password'),
        };

        validationSchema
            .validate(formData, { abortEarly: false })
            .then(() => {
                login(formData.email, formData.password)
                    .then(() => {
                        setErrors({});
                        setMessageSnackbar('Successful login.');
                        setSeveritySnackbar('success');
                        setOpenSnackbar(true);

                        router.push('/cookerycorner/main');
                    })
                    .catch((error) => {
                        if (error.status === 400) {
                            setMessageSnackbar('Email or password is incorrect.');
                            setSeveritySnackbar('error');
                            setOpenSnackbar(true);
                        } else {
                            setMessageSnackbar('There is something wrong.');
                            setSeveritySnackbar('error');
                            setOpenSnackbar(true);
                        }
                    });
            })
            .catch((error) => {
                if (error && error.inner) {
                    const validationErrors = {};
                    error.inner.forEach((e) => {
                        validationErrors[e.path] = e.message;
                    });
                    setErrors(validationErrors);
                }
                setMessageSnackbar('There is something wrong.');
                setSeveritySnackbar('error');
                setOpenSnackbar(true);
            });

        event.currentTarget.reset();
    };

    const validateForm = (event) => {
        const { name, value } = event.target;

        const formData = {
            email: name === 'email' ? value : '',
            password: name === 'password' ? value : '',
        };

        validationSchema
            .validateAt(name, formData)
            .then(() => {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
            })
            .catch((error) => {
                if (error && error.message) {
                    setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
                }
            });
    };
    //#endregion

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity={severitySnackbar}>{messageSnackbar}</Alert>
            </Snackbar>

            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/backLoginSignin.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar alt="Icon" src="/iconCC.png" />
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" noValidate onChange={validateForm} onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            color='secondary'
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            color='secondary'
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <Button color='secondary' className={CSS.btn} type="submit" fullWidth variant="contained">
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="register" className={CSS.links}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default FormLogin;
