import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { Row, Col, Button, Menu, Pagination, Icon } from 'antd';
import './career.css';

// import get from './../components/ajax';

// 生涯
class Career extends React.Component<any, any> {
    state = {
        sel: 'java',
        type: []
    };
    constructor ( props: any ) {
        super(props);
        // this.setState({       visible: false });
    }

    types : string[] = [
        'java', 'javascript', 'linux', 'sql', 'node'
    ];

    blogData = [
        {
            id: '12345',
            title: 'IT’S BACK-TO-SCHOOL: HOW SAFE ARE YOUR ENDPOINTS?',
            author: 'HAROLD REAVES',
            type: 'java',
            date: ' 08.15.2017',
            img: 'https://blogs.absolute.com/wp-content/uploads/2016/09/shutterstock_147086546.jpg',
            briefing: 'It’s back-to-school season which means plenty of preparation is underway – by families and schools. While students scramble to fill backpacks, get haircuts and buy new shoes, schools are also in a last minute push to ready their classrooms and the learning tools they rely on. An increasingly common...'
        },
        {
            id: '12345',
            title: 'IT’S BACK-TO-SCHOOL: HOW SAFE ARE YOUR ENDPOINTS?',
            author: 'HAROLD REAVES',
            type: 'java',
            date: ' 08.15.2017',
            img: 'https://blogs.absolute.com/wp-content/uploads/2016/09/shutterstock_147086546.jpg',
            briefing: 'It’s back-to-school season which means plenty of preparation is underway – by families and schools. While students scramble to fill backpacks, get haircuts and buy new shoes, schools are also in a last minute push to ready their classrooms and the learning tools they rely on. An increasingly common...'
        },
        {
            id: '12345',
            title: 'IT’S BACK-TO-SCHOOL: HOW SAFE ARE YOUR ENDPOINTS?',
            author: 'HAROLD REAVES',
            type: 'java',
            date: ' 08.15.2017',
            img: 'https://blogs.absolute.com/wp-content/uploads/2016/09/shutterstock_147086546.jpg',
            briefing: 'It’s back-to-school season which means plenty of preparation is underway – by families and schools. While students scramble to fill backpacks, get haircuts and buy new shoes, schools are also in a last minute push to ready their classrooms and the learning tools they rely on. An increasingly common...'
        },
        {
            id: '12345',
            title: 'IT’S BACK-TO-SCHOOL: HOW SAFE ARE YOUR ENDPOINTS?',
            author: 'HAROLD REAVES',
            type: 'java',
            date: ' 08.15.2017',
            img: 'https://blogs.absolute.com/wp-content/uploads/2016/09/shutterstock_147086546.jpg',
            briefing: 'It’s back-to-school season which means plenty of preparation is underway – by families and schools. While students scramble to fill backpacks, get haircuts and buy new shoes, schools are also in a last minute push to ready their classrooms and the learning tools they rely on. An increasingly common...'
        },
        {
            id: '12345',
            title: 'IT’S BACK-TO-SCHOOL: HOW SAFE ARE YOUR ENDPOINTS?',
            author: 'HAROLD REAVES',
            type: 'java',
            date: ' 08.15.2017',
            img: 'https://blogs.absolute.com/wp-content/uploads/2016/09/shutterstock_147086546.jpg',
            briefing: 'It’s back-to-school season which means plenty of preparation is underway – by families and schools. While students scramble to fill backpacks, get haircuts and buy new shoes, schools are also in a last minute push to ready their classrooms and the learning tools they rely on. An increasingly common...'
        },
        {
            id: '12345',
            title: 'IT’S BACK-TO-SCHOOL: HOW SAFE ARE YOUR ENDPOINTS?',
            author: 'HAROLD REAVES',
            type: 'java',
            date: ' 08.15.2017',
            img: 'https://blogs.absolute.com/wp-content/uploads/2016/09/shutterstock_147086546.jpg',
            briefing: 'It’s back-to-school season which means plenty of preparation is underway – by families and schools. While students scramble to fill backpacks, get haircuts and buy new shoes, schools are also in a last minute push to ready their classrooms and the learning tools they rely on. An increasingly common...'
        }
    ]

    selType = (value: any) => {
        this.setState({ sel: value });
    }

    handleClick = (e: any) => {
        // console.log('click ', e);
        const url: string = 'http://localhost:8080/';
        fetch(url + 'career/demo').then(response => response.json())
            .then(data => console.log(data))
            .catch(e => console.log('Oops, error', e));
        // const ajax = get(url + 'career/demo');
        // ajax.then((data: any) => {
        //     console.log(data.response);
        // });
        // console.log(ajax);
    }

    render() {
        const SubMenu = Menu.SubMenu;

        return (
            <div className="career">
                <section className="top-post-wrap">
                    <div className="career-content">
                        <Row>
                            <Col xs={{span: 24}} sm={{span: 12}} md={{span: 12}} lg={{span: 12}} className="career-first">
                                <article>
                                    <div>
                                        <h1><a href={'/career/details/' + this.blogData[0].id}>{this.blogData[0].title}</a></h1>
                                    </div>
                                    <div className="font-6">
                                        <span>{this.blogData[0].author}   |  {this.blogData[0].date}</span>
                                    </div>
                                    <div className="font-7">
                                        {this.blogData[0].briefing}
                                    </div>
                                    <Button type="primary" size={'large'} className="left" ghost={true}><a href={'/career/details/' + this.blogData[0].id}>阅读全文</a></Button>
                                </article>
                            </Col>
                            <Col xs={{span: 24, offset: 0}} sm={{span: 10, offset: 2}} md={{span: 10, offset: 2}} lg={{span: 10, offset: 2}} className="career-top">
                                {
                                    this.blogData.map(
                                        (i: any) =>
                                            <article>
                                                <div>
                                                    <h1><a href={'/career/details/' + i.id}>{i.title}</a></h1>
                                                </div>
                                                <div className="font-6">
                                                    <span>{i.author}   |  {i.date}</span>
                                                </div>
                                            </article>)
                                }
                            </Col>
                        </Row>
                    </div>
                </section>

                <section className="main-post-wrap">
                    <div className="career-content">
                        <Row>
                            <Col xs={{span: 24}} sm={{span: 14}} md={{span: 16}}>
                                {
                                    this.blogData.map(
                                        (i: any) =>
                                            <article className="main-post">
                                                <div className="main-post__img">
                                                    <img src={i.img} alt=""/>
                                                </div>
                                                <div className="main-post__title-wrap">
                                                    <div>
                                                        <h2><a href={'/career/details/' + i.id}>{i.title}</a></h2>
                                                    </div>
                                                    <div>
                                                        <span>{i.author}   |  {i.date}</span>
                                                    </div>
                                                </div>
                                                <div className="main-post__cont">
                                                    <p className="font-7">
                                                        {i.briefing}
                                                    </p>
                                                    <Button type="primary" size={'large'} ghost={true}><a href={'/career/details/' + i.id}>阅读全文</a></Button>
                                                </div>
                                            </article>
                                    )
                                }
                                <Pagination className="text-center" defaultCurrent={1} total={50} />
                            </Col>

                            <Col xs={{span: 24}} sm={{span: 8, offset: 2}} md={{span: 6, offset: 2}}>
                                <aside className="aside font-2">
                                    <Menu
                                        onClick={this.handleClick}
                                        className="sel-left"
                                        defaultSelectedKeys={['java']}
                                        defaultOpenKeys={['sub4']}
                                        mode="inline"
                                    >

                                        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>分类</span></span>}>
                                            {this.types.map((d: string) => <Menu.Item key={d}>{d}</Menu.Item>)}
                                        </SubMenu>
                                    </Menu>
                                    {/*<ul className="sidebar-menu">*/}
                                        {/*<li className="menu-item-object-category">*/}
                                            {/*<a className="sidebar-menu__title-link">分类</a>*/}
                                            {/*<ul className="sidebar-submenu">*/}
                                                {/*{this.types.map((d: string) => <li ><a onClick={this.selType.bind(d, d)} className={this.state.sel === d ? 'active' : ''}>{d}</a></li>)}*/}
                                            {/*</ul>*/}
                                        {/*</li>*/}
                                        {/*<li className="menu-item-object-category">*/}
                                            {/*<a className="sidebar-menu__title-link">JavaScript</a>*/}
                                           {/**/}
                                        {/*</li>*/}
                                        {/*<li className="menu-item-object-category">*/}
                                            {/*<a className="sidebar-menu__title-link">SQL</a>*/}
                                       {/**/}
                                        {/*</li>*/}
                                        {/*<li className="menu-item-object-category">*/}
                                            {/*<a className="sidebar-menu__title-link">Linux</a>*/}
                                        {/**/}
                                        {/*</li>*/}
                                    {/*</ul>*/}
                                </aside>
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        );
    }
}

const mapDispatchToProps: any = (dispatch: any) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
}
export default connect(
    undefined,
    mapDispatchToProps
)(Career);