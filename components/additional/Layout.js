//#region Imports
import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
//#region Imports

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
