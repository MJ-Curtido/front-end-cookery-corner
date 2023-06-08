//#region Imports
import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import { Container, Link, Typography } from '@mui/material';
import CSS from './Footer.module.css';
//#endregion

const Footer = () => {
    const textWhatsapp = 'Hola, me gustaría contactar contigo para hablar sobre Cookery Corner.';

    return (
        <footer className={CSS.footer}>
            <Container maxWidth="lg">
                <div className={CSS.textContainer}>
                    <Typography variant="body1" className={CSS.description}>
                        Cookery Corner is a culinary website where food enthusiasts can explore and discover a wide variety of recipes. Whether you're a seasoned chef or
                        a beginner in the kitchen, Cookery Corner offers a platform to learn and share your favorite recipes with the community. From appetizers to
                        desserts, our collection of diverse recipes will inspire you to unleash your culinary creativity. Join us at Cookery Corner and embark on a
                        flavorful journey of cooking and sharing!
                    </Typography>
                    <Typography variant="body1" className={CSS.authorText}>
                        &copy; {new Date().getFullYear()} Manuel Jesús Curtido Rosado
                    </Typography>

                    <Typography variant="body1" className={CSS.authorText}>
                        <Link className={CSS.support} href={`https://${isMobileOnly ? 'api' : 'web'}.whatsapp.com/send?phone=+34610925034&text=${textWhatsapp}`}>Customer Support</Link>
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
