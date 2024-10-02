import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LayoutPublic from '../layout/LayoutPublic';
import Home from '../pages/Home';
import Slug, { loaderSlug } from '../pages/Slug';
import ErrorPage from '../pages/Error';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic/>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "/:slug/",
                element: <Slug/>,
                loader: loaderSlug,
            },
        ],
    },
]);

export default router;