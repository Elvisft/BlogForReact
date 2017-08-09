import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';

import './about.css';
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
                    <div className="color-1 about-title text-center">GEEK EDGE</div>
                </div>
                <div className="about-page"></div>
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