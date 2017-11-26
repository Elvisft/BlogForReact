import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { Modal, AutoComplete, Form, Icon, Input, Button } from 'antd';

import './sign.less';
// 登陆控制器
// class Sign extends React.Component {
//     state = {
//         dataSource: []
//     }
//     constructor ( props ) {
//         super(props);
//         // this.setState({       visible: false });
//     }
//
//     handleOk = (e) => {
//         console.log(e);
//         this.props.actions('signHide');
//     }
//     handleCancel = (e) => {
//         console.log(e);
//         this.props.actions('signHide');
//     }
//     handleChange = (value) => {
//         this.setState({
//             dataSource: !value || value.indexOf('@') >= 0 ? [] : [
//                 `${value}@gmail.com`,
//                 `${value}@163.com`,
//                 `${value}@qq.com`,
//             ],
//         });
//     }
//     signIn = () => {
//         return (
//             <Modal
//                 title="Sign"
//                 width="188"
//                 closable={false}
//                 visible={this.props.sign.isSign}
//                 footer={null}
//             >
//                 <div>
//                     <AutoComplete
//                         dataSource={this.state.dataSource}
//
//                         style={{ width: 156 }}
//                         onChange={this.handleChange}
//                         placeholder="你的手机号/邮箱"
//                     />
//                 </div>
//                 <div>
//                     <Input type="password" placeholder="密码" style={{ width: 156 }} />
//                 </div>
//
//                 <div className="sign_action">
//                     <Button type="primary" onClick={this.handleOk}>Sign in</Button>
//
//                 </div>
//
//             </Modal>
//         );
//     }
//     signUp = () => {
//         return (
//             <div>
//
//             </div>
//         );
//     }
//
//     render() {
//
//
//         let type = this.props.sign.isSign;
//         // this.state.visible = type;
//         if (type) {
//             return this.signIn();
//         }else {
//             return this.signUp();
//         }
//     }
// }
import logo from './../static/img/logo.png';
const FormItem = Form.Item;


class SignForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="sign-container">
                <div className="vertical">
                    <div className="sign-content">
                        <div className="sign-header">
                            <img className="sign-logo" src={logo} alt="logo"/>
                            <span className="sign-title">Master</span>
                        </div>
                        <div className="sign-body">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: '请输入用户名!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                    )}
                                </FormItem>
                                <FormItem>
                                <Button type="primary" htmlType="submit" className="sign-submit">
                                    Sign in
                                </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Sign = Form.create()(SignForm);

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