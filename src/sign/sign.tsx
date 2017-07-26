import * as React from 'react';
import { Modal } from 'antd';

interface SignProps {
    // visible: boolean;
}
interface SignState {
    visible: boolean;
}

export class Sign extends React.Component<SignProps, SignState> {

    state: any = { visible: true }
    static setState1(state: any, str: any) {
        this.setState({
            state: str
        });
    }
    showModal = () => {
        console.log(this);
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
        );
    }
}

export default Sign;