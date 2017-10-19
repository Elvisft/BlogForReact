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
        text:'213',
        title:'标题',
        date:new Date(),
        type:2
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

    changeTitle = (e)=>{
        this.setState({title:e.target.firstChild.innerHTML});
        console.log(this.state.title)
    }

    uploadArticle = () => {
        let article = {
            id:undefined,
            title:'标题',
            type:2,
            date:new Date(),
            content:'<h1 id="h1-1" >qwe</h1>在引入 官方的demo后，采用babel能成功引入了antd design的相关组件，发现多了antd design的组件还是很强大的，，但是问题来了，如何才能修改antd design自带的样式呢?哪怕是更改一下背景颜色，官方API 说明里面没有样式修改。求大神help一下下。2。组件代码如下 ，引入的都是自定义的组件，直接加class或者style是无效的，在引入 官方的demo后，采用babel能成功引入了antd design的相关组件，发现多了antd design的组件还是很强大的，，但是问题来了，如何才能修改antd design自带的样式呢?哪怕是更改一下背景颜色，官方API 说明里面没有样式修改。求大神help一下下。2。组件代码如下 ，引入的都是自定义的组件，直接加class或者style是无效的，在引入 官方的demo后，采用babel能成功引入了antd design的相关组件，发现多了antd design的组件还是很强大的，，但是问题来了，如何才能修改antd design自带的样式呢?哪怕是更改一下背景颜色，官方API 说明里面没有样式修改。求大神help一下下。了antd design的组件还是很强大的，，但是问题来了，如何才能修改antd design自带的样式呢?哪怕是更改一下背景颜色，官方API 说明里面没有样式修改。求大神help一下下。2。组件代码如下 ，引入的都是自定义的组件，直接加class或者style是无效的，在引入 官方2。组件代码如下 ，引入的都是自定义的组件，直接加class或者style是无效的，在引入 官方的demo后，采用babel能成功引入了antd design的相关组件，发现多了antd design的组件还是很强大的，，但是问题来了，如何才能修改antd design自带的样式呢?哪怕是更改一下背景颜色，官方API 说明里面没有样式修改。求大神help一下下。2。组件代码如下 ，引入的都是自定义的组件，直接加class或者style是无效的，<h4 id="h4-1" >qwe</h4> <h2 id="h2-1" >qwe</h2> <h1 id="h1-2" >qwe</h1> <h2 id="h2-2" >123</h2> <h5 id="h5-1" >qwe</h5> '
        };
        fetch(`${URL}article/update`, {
            method: "POST",
            body: JSON.stringify(article)
        }).then(function(response) {
            // do sth
        });
    }

    uploadImageCallBack = (file) => {

        return new Promise(
            (resolve, reject) => {

                let xhr = new XMLHttpRequest();
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
                <div className="editor-title"  contentEditable={true} onInput={this.changeTitle} suppressContentEditableWarning = {true}>
                    <h2 className="in-block">{this.state.title}</h2> <Button className="right" onClick={this.uploadArticle}>保存</Button>
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
