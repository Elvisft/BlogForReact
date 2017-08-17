import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { Row, Col, Button } from 'antd';
import './career.css';

// 生涯
class Career extends React.Component<any, any> {

    constructor ( props: any ) {
        super(props);
        // this.setState({       visible: false });
    }

    render() {
        return (
            <div className="career">
                <section className="top-post-wrap">
                    <div className="career-content">
                        <Row>
                            <Col xs={{span: 24}} sm={{span: 12}} md={{span: 12}} lg={{span: 12}} className="career-first">
                                <article>
                                    <div>
                                        <h1>IT’S BACK-TO-SCHOOL: HOW SAFE ARE YOUR ENDPOINTS?</h1>
                                    </div>
                                    <div className="font-6">
                                        <span>HAROLD REAVES   |  08.15.2017</span>
                                    </div>
                                    <div className="font-7">
                                        Its back-to-school season which means plenty of preparation is underway – by families and schools. While students scramble to fill backpacks, get haircuts and buy new shoes, schools are also in a last minute push to ready their classrooms and the learning tools they rely on. An increasingly common...
                                    </div>
                                    <Button type="primary" size={'large'} className="left" ghost={true}>阅读全文</Button>
                                </article>
                            </Col>
                            <Col xs={{span: 24, offset: 0}} sm={{span: 10, offset: 2}} md={{span: 10, offset: 2}} lg={{span: 10, offset: 2}} className="career-top">
                                <article>
                                        <div>
                                            <h1>NEW ABSOLUTE 7 PLATFORM EXTENDS ENDPOINT VISIBILITY AND CONTROL</h1>
                                        </div>
                                        <div className="font-6">
                                            <span>WEB TEAM   |  08.09.2017</span>
                                        </div>
                                </article>
                                <article>
                                    <div>
                                        <h1>THE HIGH COST OF DARK ENDPOINTS</h1>
                                    </div>
                                    <div>
                                        <span>PAM O'NEAL   |  08.08.2017</span>
                                    </div>
                                </article>
                                <article>
                                    <div>
                                        <h1>BECAUSE DARK ENDPOINTS = SECURITY BLIND SPOTS</h1>
                                    </div>
                                    <div>
                                        <span>WEB TEAM   |  08.09.2017</span>
                                    </div>
                                </article>
                                <article>
                                    <div>
                                        <h1>ANTHEM DATA BREACH IMPLICATIONS</h1>
                                    </div>
                                    <div>
                                        <span>WEB TEAM   |  08.02.2017</span>
                                    </div>
                                </article>
                                <article>
                                    <div>
                                        <h1>EU GDPR: THE WHY AND HOW FOR FINANCIAL SERVICES</h1>
                                    </div>
                                    <div>
                                        <span>RICHARD HENDERSON   |  07.27.2017</span>
                                    </div>
                                </article>
                            </Col>
                        </Row>
                    </div>
                </section>

                <section className="main-post-wrap">
                    <div className="career-content">
                        <Row>
                            <Col xs={{span: 24}} sm={{span: 14}} md={{span: 16}}>
                                <article className="main-post">
                                    <div className="main-post__img">
                                        <img src="https://blogs.absolute.com/wp-content/uploads/2016/09/shutterstock_147086546.jpg" alt=""/>
                                    </div>
                                    <div className="main-post__title-wrap">
                                        <div>
                                            <h2>IT’S BACK-TO-SCHOOL: HOW SAFE ARE YOUR ENDPOINTS?</h2>
                                        </div>
                                        <div>
                                            <span>HAROLD REAVES   |  08.15.2017</span>
                                        </div>
                                    </div>
                                    <div className="main-post__cont">
                                        <p className="font-7">
                                            Its back-to-school season which means plenty of preparation is underway – by families and schools. While students scramble to fill backpacks, get haircuts and buy new shoes, schools are also in a last minute push to ready their classrooms and the learning tools they rely on. An increasingly common...
                                        </p>
                                        <Button type="primary" size={'large'} ghost={true}>阅读全文</Button>
                                    </div>
                                </article>
                            </Col>

                            <Col xs={{span: 24}} sm={{span: 8, offset: 2}} md={{span: 6, offset: 2}}>
                                <aside className="aside font-2">
                                    <ul className="sidebar-menu">
                                        <li className="menu-item-object-category">
                                            <a className="sidebar-menu__title-link">Java</a>
                                            <div>

                                            </div>
                                        </li>
                                        <li className="menu-item-object-category">
                                            <a className="sidebar-menu__title-link">JavaScript</a>
                                            <div></div>
                                        </li>
                                        <li className="menu-item-object-category">
                                            <a className="sidebar-menu__title-link">SQL</a>
                                            <div></div>
                                        </li>
                                        <li className="menu-item-object-category">
                                            <a className="sidebar-menu__title-link">Linux</a>
                                            <div></div>
                                        </li>
                                    </ul>
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