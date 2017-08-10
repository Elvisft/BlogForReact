import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import * as actions from './../actions';

import './about.css';

let aboutbg = require('./../static/img/about_0.png');
// 关于
class About extends React.Component<any, any> {

    constructor ( props: any ) {
        super(props);
        // this.setState({       visible: false });
    }

    render() {
        return (
            <div className="about">
                <div className="about-page" >
                    <div className="color-1 about-title text-left vertical">
                        <img src={aboutbg} alt=""/>
                        <div className="font-2">极客的极限在哪里？</div>
                        <div className="font-2">边缘在哪里？</div>
                        <div className="font-2">无人知晓</div>
                        <div className="font-2">我们必将永远追寻极限</div>
                        <div className="font-2">到达那个边缘</div>
                        <div className="font-2">///</div>
                    </div>
                    <a href="#content" className="about-down">
                        <Icon type="down" />
                    </a>
                </div>
                <div id="content" className="about-page">
                    123
                </div>
                <div className="about-page"></div>
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
)(About);