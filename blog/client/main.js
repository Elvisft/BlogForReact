import React from 'react';
import ReactDom from 'react-dom';
import App from './index.jsx';
import { CookiesProvider } from 'react-cookie';


ReactDom.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
    document.getElementById('root')
);
