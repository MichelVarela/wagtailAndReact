import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LayoutPublic from '../layout/LayoutPublic';
import Root from '../pages/Root';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic/>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Root/>,
            },
            {
                path: "children",
                element: <div>children</div>,
            },
            {
                path: "/about",
                element: "about",
            },
            {
                path: "/blog",
                element: "blog",
            },
        ],
    },
]);

export default router;