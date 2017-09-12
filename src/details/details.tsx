import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
// import { URL } from './../components/config';

class Details extends React.Component<any, any> {
    render() {
        return (
            <div>
                DETAILS
            </div>
        );
    }
}

const mapDispatchToProps: any = (dispatch: any) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
};
export default connect(
    undefined,
    mapDispatchToProps
)(Details);