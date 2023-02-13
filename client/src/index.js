import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from "./Routes/routes"
import { store } from "./redux/store"
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        {/* <React.Suspense fallback="loading"> */}
            <RouterProvider router={router} />
        {/* </React.Suspense> */}
    </Provider>
);
