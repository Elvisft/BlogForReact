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
            this.setState({article: data});
        });

    }
    getArticle = (id, callback) => {
        return fetch(  `${URL}${this.props.getArticleURL}${id}` ).then(response => response.json())
            .then(data => callback(data))
            // .catch(e => console.log('Oops, error', e));
    }
    render() {
        const details = this.state.article.map((n, i) => {

            function getPath(map, id, path){
                let arr=[];
                if(!path) path=[];
                if(!id) return map;
                let keys = [...map.keys()];

                for(let i of keys){

                    if(i===id) {
                        path.push(i);
                        arr=[map,path];

                    }
                    else{
                        path.push(i);
                        arr=getPath(map.get(i),id, path);
                    }
                }

                return arr;
            }
            function formatId(str) {
                return str.substring(1,str.length-2)
            }

            let list = n.content.match(/<h[1-6]{1}\sid=[^>]*>/ig);
            let [arr, next] = [new Map(), new Map()];
            arr.set(formatId(list[0].match(/([^\s=]+)=(.*?)(?=id|>)/)[2]),next);
            console.log(list)
            for(let i=1;i<list.length;i++){
                let [str,str1] =[formatId(list[i].match(/([^\s=]+)=(.*?)(?=id|>)/)[2]), formatId(list[i-1].match(/([^\s=]+)=(.*?)(?=id|>)/)[2])];
                let q= getPath(arr, str1)
                let path=q[0];
                if(str.substring(0,2)<str1.substring(0,2)){
                    console.log(path)
                    console.log(q[1]+'******'+str)
                    path=getPath(arr, q[1][q[1].length-1])[0];

                    path.set(str, new Map());
                }else if(str.substring(0,2)===str1.substring(0,2)){

                    path.set(str, new Map());
                }else if(str.substring(0,2)>str1.substring(0,2)){

                    path.get(str1).set(str, new Map());


                }
                console.log(arr)
            }

            // for(let x=1;x<list.length;x++){
            //     let [str,str1] =[list[x].match(/([^\s=]+)=(.*?)(?=id|>)/)[2], list[x-1].match(/([^\s=]+)=(.*?)(?=id|>)/)[2]];
            //     if(str>str1){
            //
            //     }else if(str===str1){
            //
            //     }else{
            //
            //     }
            //
            //
            //
            //         arr.set(str, new Map());
            //
            //     arr[arr.length-1].push(str.substring(1,str.length-2));
            // }
            console.log(arr);

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
                            <div className="main-post__cont" dangerouslySetInnerHTML={{__html: n.content.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')}}/>
                        </article>
                    </Col>
                    <Col xs={{span: 24}} sm={{span: 8, offset: 2}} md={{span: 6, offset: 2}}>
                        <aside>
                            <Anchor offsetTop={80} className="aside font-2">
                                <Link href="#test1" title="test1" />
                                <Link href="#test2" title="test2" />
                                <Link>
                                    <Link>
                                        <Link>
                                            <Link href="#test4" title="test7" />
                                        </Link>
                                    </Link>
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
                        {details}
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