import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
class Sign extends React.Component<any, any> {
    constructor ( props: any ) {
        super(props);
    }

    signIn = () => {
        return (
            <div>
                {/*登录*/}
            </div>
        );
    }
    signUp = () => {
        return (
            <div>
                {/*注册*/}
            </div>
        );
    }

    render() {
        let type = this.props.sign.isSign;
        if (type) {
            return this.signIn();
        }else {
            return this.signUp();
        }
    }
}
const mapStateToProps = ( state: any) => {

    return {sign: state.showSign};
}
const mapDispatchToProps: any = (dispatch: any) => {

    return {
        actions: bindActionCreators(actions.SignA, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sign);