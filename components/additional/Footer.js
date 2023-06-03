//#region Imports
import React from 'react';
import { Container, Link, Typography } from '@mui/material';
import CSS from './Footer.module.css';
//#endregion

//TODO: Añadir lo que está abajo comentado pero añadiendo mi número de teléfono y mi correo y que el número te lleve a mi whatsapp

const Footer = () => {
    return (
        <footer className={CSS.footer}>
            <Container maxWidth="lg">
                <div className={CSS.textContainer}>
                    <Typography variant="body1">
                        Cookery Corner is a culinary website where food enthusiasts can explore and discover a wide variety of recipes. Whether you're a seasoned chef or
                        a beginner in the kitchen, Cookery Corner offers a platform to learn and share your favorite recipes with the community. From appetizers to
                        desserts, our collection of diverse recipes will inspire you to unleash your culinary creativity. Join us at Cookery Corner and embark on a
                        flavorful journey of cooking and sharing!
                    </Typography>
                    <Typography variant="body1" className={CSS.authorText}>
                        &copy; {new Date().getFullYear()} Manuel Jesús Curtido Rosado
                    </Typography>
                </div>
            </Container>
        </footer>
    );
};

/* <Typography variant="body2">
    This is additional content for the footer.
    <Link href="https://example.com" color="inherit" target="_blank" rel="noopener">
        Learn more
    </Link>
</Typography>; */

export default Footer;
