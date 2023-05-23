import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from 'react';
import * as yup from 'yup';
import CSS from './Register.module.css';
import { userStore } from '@/store/userStore';

const Register = () => {
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const router = useRouter();

    const signin = userStore((state) => state.signin);

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required.'),
        email: yup.string().email('Enter a valid email.').required('Email is required.'),
        password: yup.string().min(7, 'Password must include at least 8 characters.').required('Password is required.'),
        password2: yup.string().min(7, 'Password must include at least 8 characters.').required('Repete the password is required.'),
        phone: yup.string().min(7, 'Enter a valid phone.').required('Phone is required.'),
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const formData = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            password2: data.get('password2'),
            phone: data.get('phone'),
        };

        console.log(formData);

        if (formData.password !== formData.password2) {
            setErrors((prevErrors) => ({ ...prevErrors, password2: 'Passwords do not match.' }));
            return;
        } else {
            validationSchema
                .validate(formData, { abortEarly: false })
                .then(() => {
                    signin(formData.name, formData.email, formData.password, formData.phone)
                        .then(() => {
                            //TODO: hacer que se redirija a la pagina principal
                            router.push('/');

                            setErrors({});
                            setMessageSnackbar('Sign up successfully.');
                            setOpenSnackbar(true);
                        })
                        .catch((error) => {
                            setMessageSnackbar('There is something wrong.');
                            setOpenSnackbar(true);
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
                    setOpenSnackbar(true);
                });
        }
    };

    const validateForm = (event) => {
        const { name, value } = event.target;

        const formData = {
            name: name === 'name' ? value : '',
            email: name === 'email' ? value : '',
            password: name === 'password' ? value : '',
            password2: name === 'password2' ? value : '',
            phone: name === 'phone' ? value : '',
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

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} message={messageSnackbar} />

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
                    <Avatar alt="Icon" src="/icon.png" />
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onChange={validateForm} onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Repete password"
                            type="password"
                            id="password2"
                            autoComplete="current-password"
                            error={!!errors.password2}
                            helperText={errors.password2}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Phone"
                            type="phone"
                            id="phone"
                            autoComplete="current-phone"
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/" className={CSS.links}>
                                    Have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;
