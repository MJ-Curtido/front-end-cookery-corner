//#region Imports
import AuthGuard from '@/components/additional/AuthGuard';
import Layout from '@/components/additional/Layout';
import FormCreate from '@/components/createPage/FormCreate/FormCreate';
import React from 'react';
//#endregion

const create = () => {
    return (
        <AuthGuard>
            <Layout>
                <FormCreate />
            </Layout>
        </AuthGuard>
    );
};

export default create;
