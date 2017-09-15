import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { Anchor, Row, Col } from 'antd';
import PropTypes from 'prop-types';
const { Link } = Anchor;
import { matchPath } from 'react-router-dom';
import { URL } from './../components/config';

class Details extends React.Component {
    state = {
        article:[]
    }
    static defaultProps = {
        getArticleURL : 'article/getArticle/'
    }
    constructor ( props ) {
        super(props);

        let id = matchPath(location.pathname,'/career/details/:id',true).params.id;

        this.getArticle(id, (data) => {
            console.log(data);
            this.setState({article: data});
        });

    }
    getArticle = (id, callback) => {
        return fetch(  `${URL}${this.props.getArticleURL}${id}` ).then(response => response.json())
            .then(data => callback(data))
            .catch(e => console.log('Oops, error', e));
    }
    render() {
        const details = this.state.article.map((n, i) => {
            return (
                <Row key={i}>
                    <Col xs={{span: 24}} sm={{span: 14}} md={{span: 16}}>
                        <article className="main-post">
                            <div className="main-post__img">
                                <img src={`http://106.14.150.87/static/image/${n.id}.jpg`} alt=""/>
                            </div>
                            <div className="main-post__title-wrap">
                                <div>
                                    <h2><a href={'/career/details/'}>{n.title}</a></h2>
                                </div>
                                <div>
                                    <span>MR-Liu   |  {n.date}</span>
                                </div>
                            </div>
                            <div className="main-post__cont" dangerouslySetInnerHTML={{__html: n.content}}/>
                        </article>
                    </Col>
                    <Col xs={{span: 24}} sm={{span: 8, offset: 2}} md={{span: 6, offset: 2}}>
                        <aside>
                            <Anchor className="aside font-2">
                                <Link href="#test1" title="test1" />
                                <Link href="#test2" title="test2" />
                                <Link href="#test3" title="test3">
                                    <Link href="#test4" title="test4" />
                                    <Link href="#test5" title="test5" />
                                </Link>
                            </Anchor>
                        </aside>
                    </Col>
                </Row>
            )
        });
        return (
            <div>
                <section className="main-post-wrap">
                    <div className="career-content">
                        {
                            details
                        }
                        {/*<Row>*/}
                            {/*<Col xs={{span: 24}} sm={{span: 14}} md={{span: 16}}>*/}
                                {/*<article className="main-post">*/}
                                    {/*<div className="main-post__img">*/}
                                        {/*<img src={`http://106.14.150.87/static/image/1.jpg`} alt=""/>*/}
                                    {/*</div>*/}
                                    {/*<div className="main-post__title-wrap">*/}
                                        {/*<div>*/}
                                            {/*<h2><a href={'/career/details/'}>A HARD LESSON IN VULNERABILITY MANAGEMENT FOR EQUIFAX</a></h2>*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                            {/*<span>MR-Liu   |  09.11.2017</span>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="main-post__cont">*/}


                                    {/*</div>*/}
                                {/*</article>*/}
                            {/*</Col>*/}
                            {/*<Col xs={{span: 24}} sm={{span: 8, offset: 2}} md={{span: 6, offset: 2}}>*/}
                                {/*<aside>*/}
                                    {/*<Anchor className="aside font-2">*/}
                                        {/*<Link href="#test1" title="test1" />*/}
                                        {/*<Link href="#test2" title="test2" />*/}
                                        {/*<Link href="#test3" title="test3">*/}
                                            {/*<Link href="#test4" title="test4" />*/}
                                            {/*<Link href="#test5" title="test5" />*/}
                                        {/*</Link>*/}
                                    {/*</Anchor>*/}
                                {/*</aside>*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                    </div>
                </section>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
};
export default connect(
    undefined,
    mapDispatchToProps
)(Details);