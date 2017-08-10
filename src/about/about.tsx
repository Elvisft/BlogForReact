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
                    <div className="color-1 about-title text-left vertical">
                        <div className="font-5">GEEK EDGE</div>
                        <div className="font-2">极客的极限在哪里？边缘在哪里？无人知晓，我们必将永远追寻极限，到达那个边缘</div>
                    </div>
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