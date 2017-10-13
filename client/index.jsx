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
import Manager from './manager/manager.jsx';
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
        component: () => <Home/>
    },
    {
        path: '/about',
        exact: true,
        navigation: () => <Head selected= "1"/>,
        component: () => <About/>
    },
    {
        path: '/manager',
        exact: true,
        navigation: () => <div/>,
        component: () => <Manager/>
    },
    {
        path: '/career',
        exact: true,
        navigation: () => <Head selected= "2"/>,
        component: () => <Career/>
    },
    {
        path: '/career/details/:id',
        exact: true,
        navigation: () => <Head selected= "2"/>,
        component: () => <Details/>
    },
    {
        path: '/editor',
        exact: true,
        navigation: () => <Head selected= "2"/>,
        component: <Editor/>

    }
];
// async function main() {
//     // 解构赋值用法示例
//     const { default: Component } = await import('./components/editor.jsx');
//     // 行内用法示例
//     // render((await import('./components/editor.jsx')).default);
// }
// {
//     path: '/editor',
//         exact: true,
//     navigation: () => <Head selected= "2"/>,
//     main: <Editor/>
//     //     (nextState,callback)=>{
//     //     require.ensure([],(require)=>{
//     //         callback(null,require("./components/editor.jsx").default)
//     //     },"editor")
//     // }
// }
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
                                    <Route exact={route.exact} path={route.path} component={route.component} key={index} />
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
