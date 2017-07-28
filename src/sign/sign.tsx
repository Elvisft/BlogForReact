import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { Modal } from 'antd';

class Sign extends React.Component<any, any> {
    // state = {
    //     visible: false
    // }
    constructor ( props: any ) {
        super(props);
        // this.setState({       visible: false });
    }

    handleOk = (e: any) => {
        console.log(e);
        this.props.actions('signHide');
    }
    handleCancel = (e: any) => {
        console.log(e);
        this.props.actions('signHide');
    }

    signIn = () => {
        return (
            <Modal
                title="Sign"
                closable={false}
                visible={this.props.sign.isSign}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        );
    }
    signUp = () => {
        return (
            <div>

            </div>
        );
    }

    render() {


        let type = this.props.sign.isSign;
        // this.state.visible = type;
        if (type) {
            return this.signIn();
        }else {
            return this.signUp();
        }
    }
}
const mapStateToProps = ( state: any) => {

    return {sign: state.signCtrl};
}
const mapDispatchToProps: any = (dispatch: any) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sign);