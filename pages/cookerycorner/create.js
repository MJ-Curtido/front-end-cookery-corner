//#region Imports
import AuthGuard from '@/components/additional/AuthGuard';
import Layout from '@/components/additional/Layout';
import FormCreate from '@/components/createPage/FormCreate/FormCreate';
import React from 'react';
//#endregion

//TODO: hacer la página de crear receta pasandole todo a los componentes hijos para así poder reutilizarlos en la página de editar receta

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
