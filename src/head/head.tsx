import * as React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Menu } from 'antd';

import SearchInput from './../components/searchInput';
import './head.css';

const logo = require('./../static/img/logo.png');

class Head extends React.Component<any, any> {
    render() {
        return (
            <header id="header">
                <Row>
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 5}} lg={{span: 4}} >
                        <Link to="/" id="logo">
                            <img src={logo} alt="logo"/>
                        </Link>
                    </Col>
                    <Col xs={{span: 0}} sm={{span: 0}} md={{span: 19}} lg={{span: 20}} >
                        <div id="search-box">
                            <SearchInput placeholder="input search text" style={{ width: 200 }} />
                        </div>

                        <Button type="primary" size={'large'} className="right head-login">登陆</Button>
                        <Menu mode="horizontal" className="right header-menu">
                            <Menu.Item key="1">博客</Menu.Item>
                            <Menu.Item key="2">工具</Menu.Item>
                            <Menu.Item key="3">问答</Menu.Item>
                            <Menu.Item key="4">专栏</Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </header>
        );
    }
}
export default Head;