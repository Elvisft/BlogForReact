import * as React from 'react';

import { Route, Switch, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Menu, Icon, Button,Row,Col  } from 'antd';

import stores from './reducers.js';


import Error from './error/error.jsx';

import './index.less';
import './theme.less';

import './head.less';
import logo from './static/img/logo.png';
// bundle模型用来异步加载组件
import Bundle from './bundle.js';

// 异步引入
import EditorContainer from 'bundle-loader?lazy&name=app-[name]!./editor/editor.jsx';
const Editor = () => (
    <Bundle load={EditorContainer}>
        {(Editor) => <Editor />}
    </Bundle>
);

const history = createHistory();


const middleware = routerMiddleware(history);
export const store = createStore(
    stores,
    applyMiddleware(middleware)
);

const routes = [

    {
        path: '/manager/editor',
        exact: true,
        component: <Editor/>
    },

];

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <header id="header">
                            <Row>
                                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 5}} lg={{span: 4}} >
                                    <Link to="/" id="logo">
                                        <img src={logo} alt="logo"/>
                                    </Link>
                                </Col>
                                <Col xs={{span: 0}} sm={{span: 0}} md={{span: 19}} lg={{span: 20}} >

                                    <Menu mode="horizontal" className="right header-menu">
                                        <Menu.Item key="0"><Link to="/" target={'_blank'}>主站</Link></Menu.Item>
                                        <Menu.Item key="1"><Link to="/manager/editor">类别&文章</Link></Menu.Item>
                                        <Menu.Item key="2"><Link to="/manager/message">留言</Link></Menu.Item>
                                        <Menu.Item key="3"><Link to="/manager/monitor">监控</Link></Menu.Item>
                                    </Menu>
                                </Col>
                            </Row>

                        </header>

                        <Switch>
                            {
                                routes.map((route, index) => (
                                    <Route exact={route.exact} path={route.path} render={(history) => {
                                        console.log(history);
                                        // history.push('/wers',null);
                                        return route.component;
                                    }} key={index} />
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
