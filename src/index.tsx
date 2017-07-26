import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import './index.css';
// import reducers from './reducers'
import Head from './head/head';
import Home from './home/home';
import Error from './error/error';

const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
const store = createStore(
    combineReducers({
        // ...reducers,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)

ReactDOM.render(

    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Head/>
                <Route exact path="/" component={Home} />
                <Route path="/404" component={Error} />
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);