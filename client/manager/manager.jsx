import * as React from 'react';
import { Menu, Icon, Button,Row,Col  } from 'antd';
import { Link, Route, Router,matchPath } from 'react-router-dom';
import Bundle from './../bundle.js';


import logo from './../static/img/logo.png';

// import Editor from './editor.jsx';
import EditorContainer from 'bundle-loader?lazy&name=app-[name]!./editor.jsx';
const Editor = () => (
    <Bundle load={EditorContainer}>
        {(Editor) => <Editor />}
    </Bundle>
);
const SubMenu = Menu.SubMenu;

class Manager extends React.Component{

    render() {
        return (
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

                <Route exact={true} path='/manager/editor'  component={Editor} key={'1123'} />

            </div>
        );
    }
}
export default Manager;