import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { Modal, AutoComplete, Input, Button } from 'antd';

import './sign.less';
// 登陆控制器
class Sign extends React.Component {
    state = {
        dataSource: []
    }
    constructor ( props ) {
        super(props);
        // this.setState({       visible: false });
    }

    handleOk = (e) => {
        console.log(e);
        this.props.actions('signHide');
    }
    handleCancel = (e) => {
        console.log(e);
        this.props.actions('signHide');
    }
    handleChange = (value) => {
        this.setState({
            dataSource: !value || value.indexOf('@') >= 0 ? [] : [
                `${value}@gmail.com`,
                `${value}@163.com`,
                `${value}@qq.com`,
            ],
        });
    }
    signIn = () => {
        return (
            <Modal
                title="Sign"
                width="188"
                closable={false}
                visible={this.props.sign.isSign}
                footer={null}
            >
                <div>
                    <AutoComplete
                        dataSource={this.state.dataSource}

                        style={{ width: 156 }}
                        onChange={this.handleChange}
                        placeholder="你的手机号/邮箱"
                    />
                </div>
                <div>
                    <Input type="password" placeholder="密码" style={{ width: 156 }} />
                </div>

                <div className="sign_action">
                    <Button type="primary" onClick={this.handleOk}>Sign in</Button>

                </div>

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
const mapStateToProps = ( state) => {

    return {sign: state.signCtrl};
}
const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sign);