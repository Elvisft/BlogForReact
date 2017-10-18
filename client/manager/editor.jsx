import React from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor.less';
import { Row, Col, Button, Menu, Pagination, Icon, Input } from 'antd';
import { URL } from './../components/config';
class ColorPic extends Component {
    static propTypes = {
        expanded: PropTypes.bool,
        onExpandEvent: PropTypes.func,
        onChange: PropTypes.func,
        currentState: PropTypes.object,
    };

    stopPropagation = (event) => {
        event.stopPropagation();
    };

    onChange = (color) => {
        const { onChange } = this.props;
        onChange('color', color.hex);
    }

    renderModal = () => {
        const { color } = this.props.currentState;
        return (
            <div
                onClick={this.stopPropagation}
            >
                <BlockPicker color={color} onChangeComplete={this.onChange} />
            </div>
        );
    };


    render() {
        const { expanded, onExpandEvent } = this.props;
        return (
            <div
                aria-haspopup="true"
                aria-expanded={expanded}
                aria-label="rdw-color-picker"
            >
                <div
                    onClick={onExpandEvent}
                >
                    123
                </div>
                {expanded ? this.renderModal() : undefined}
            </div>
        );
    }
}

import  { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

class EditorCustomizedToolbarOption extends React.Component {
    state = {
        editorState: EditorState.createEmpty(),
        text:''
    }

    onEditorStateChange = (editorState) => {

        this.setState({
            editorState:editorState,
            text:this.htmlFormat(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        });

    };

    htmlFormat = ( text) => {
        for(let i=1;i<7;i++){
            let tex = text.split(new RegExp(`<h${i}`,'ig'));
            text=tex[0];
            for(let j=1;j<tex.length;j++){
                text += `<h${i} id="h${i}-${j}" ${tex[j]}`;

            }
        }
        return text;
    }

    onChange = (e)=>{
        console.log(e);
    }

    uploadArticle = () => {
        console.log(this.state);
    }

    uploadImageCallBack = (file) => {
        console.log(file)
        return new Promise(
            (resolve, reject) => {

                const xhr = new XMLHttpRequest();
                xhr.open('POST', `${URL}article/test`);
                // xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }
    render(){
        const { TextArea } = Input;

        return (<Row className="editor">
            <Col xs={{span: 3}} sm={{span: 3}} md={{span: 3}} lg={{span: 3}} className="editor-sidebar">左侧栏</Col>
            <Col xs={{span: 4}} sm={{span: 4}} md={{span: 4}} lg={{span: 4}} className="editor-middle">

            </Col>
            <Col xs={{span: 17}} sm={{span: 17}} md={{span: 17}} lg={{span: 17}} className="editor-viewport">
                <div className="editor-title">
                    <h2 className="in-block">标题</h2> <Button className="right" onClick={this.uploadArticle()}>保存</Button>
                </div>
                <Editor
                    onEditorStateChange={this.onEditorStateChange}
                    editorState={this.state.editorState}
                    toolbar={{
                        colorPicker: { component: ColorPic },
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: false } },
                    }}
                    localization={{
                        locale: 'zh',
                    }}
                    editorClassName="editor-editor"
                />

            </Col>

        </Row>)

    }
}
export default EditorCustomizedToolbarOption;
