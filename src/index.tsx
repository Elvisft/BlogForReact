import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import './index.css';
import './theme.css';
import stores from './reducers';
import Head from './head/head';
import Home from './home/home';
import About from './about/about';
import Error from './error/error';

const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
export const store = createStore(
    stores,
    applyMiddleware(middleware)
)
// const URLChange = (arr: any) => {
//     console.log(store);
// }
ReactDOM.render(

    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Head/>
                <Switch>
                    {/*render={() => {URLChange(0); return <Home/>; }}*/}
                    <Route exact={true} path="/" component={Home} />
                    <Route exact={true} path="/about" component={About} />
                    <Route component={Error} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);