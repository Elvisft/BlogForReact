import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';

// 关于
class About extends React.Component<any, any> {

    constructor ( props: any ) {
        super(props);
        // this.setState({       visible: false });
    }

    render() {
        return (
            <div>
                about
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