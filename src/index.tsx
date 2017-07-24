import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './index.css';

import Head from './head/head';
import Home from './home/home';
import Error from './error/error';

ReactDOM.render(

    <Router>
        <div>
            <Head/>
            <Route exact path="/" component={Home} />
            <Route exact path="/404" component={Error} />

        </div>
    </Router>
    , document.getElementById('root')
);