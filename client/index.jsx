import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import './index.css';
import './theme.css';
import stores from './reducers.js';
import Head from './head/head.jsx';
import Home from './home/home.jsx';
import About from './about/about.jsx';
import Career from './career/career.jsx';
import Error from './error/error.jsx';
import Details from './details/details.jsx';
import Editor from './components/editor.jsx';

const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
export const store = createStore(
    stores,
    applyMiddleware(middleware)
);

const routes = [
    {
        path: '/',
        exact: true,
        navigation: () => <Head selected="0"/>,
        main: () => <Home/>
    },
    {
        path: '/about',
        exact: true,
        navigation: () => <Head selected= "1"/>,
        main: () => <About/>
    },
    {
        path: '/career',
        exact: true,
        navigation: () => <Head selected= "2"/>,
        main: () => <Career/>
    },
    {
        path: '/career/details/:id',
        exact: true,
        navigation: () => <Head selected= "2"/>,
        main: () => <Details/>
    },
    {
        path: '/editor',
        exact: true,
        navigation: () => <Head selected= "2"/>,
        main: () => <Editor/>
    }
];
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        {
                            routes.map((route, index) => (
                                <Route exact={route.exact} path={route.path} component={route.navigation} key={index}/>
                            ))
                        }

                        <Switch>
                            {/*render={() => {URLChange(0); return <Home/>; }}*/}
                            {
                                routes.map((route, index) => (
                                    <Route exact={route.exact} path={route.path} component={route.main} key={index} />
                                ))
                            }

                            <Route component={Error} />
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}

//导出组件
export default App;
