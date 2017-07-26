import * as React from 'react';
import { Modal, Button } from 'antd';

// interface SignProps {
//     visible: boolean;
// }
// interface SignState {
//     visible: boolean;
// }

export class Sign extends React.Component<{}, {}> {

    state: any = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        return (
            <div>
                <Button type="primary" size={'large'} className="right head-login" onClick={this.showModal } ghost>登陆</Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>

        );
    }
}

export default Sign;