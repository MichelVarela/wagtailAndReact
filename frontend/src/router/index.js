import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LayoutPublic from '../layout/LayoutPublic';
import Home from '../pages/Home';
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