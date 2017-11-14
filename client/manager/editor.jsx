import React from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor.less';
import { Row, Col, Button, Menu, Pagination, Icon, Input } from 'antd';
import { URL } from './../components/config';
import  { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';



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




class EditorCustomizedToolbarOption extends React.Component {
    state = {
        classes: new Map(),
        articles:[],
        selArticle:true,
        editorState: EditorState.createEmpty(),
        text:'<p>12<strong>3fs</strong>df12<em>31</em>23</p>',
        title:'标题',
        date:new Date(),
        type:2
    }

    static defaultProps = {
        getArticleURL : 'article/getArticles/',
        getClassesURL : 'classes/getClasses/'
    }
    constructor(props){
        super(props);
        this.state.editorState=this.getEditorState(this.state.text);

    }

    //获取菜单
    getClasses = (classes, callback) => {
        return fetch( URL + this.props.getClassesURL + classes ).then(response => response.json())
            .then(data => callback(data))
            .catch(e => console.log('Oops, error', e));
    }
    getArticles = (type, page, size, callback) => {
        return fetch( URL + this.props.getArticleURL + `${type}/${page}/${size}` ).then(response => response.json())
            .then(data => callback(data))
            .catch(e => console.log('Oops, error', e));
    }

    //菜单动作
    menuItemClick = (e) =>{
        let type = e.key;
        this.getArticles(type, 0, 1000, (data)=>{
            this.setState({articles:data});
           console.log(data);
        });

    }

    articlesItemClick = (e)=>{
        console.log(e);

        this.setState({selArticle: e});
    }

    //编辑器
    getEditorState = (text)=>{
        console.log(text);
        const contentBlock = htmlToDraft(text);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            return EditorState.createWithContent(contentState);

        }
    }
    //编辑器
    onEditorStateChange = (editorState) => {

        this.setState({
            editorState:editorState,
            text:this.htmlFormat(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        });
        console.log(this.state.text);
    };
    //编辑器
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
    //编辑器
    changeTitle = (e)=>{
        this.setState({title:e.target.firstChild.innerHTML});

    }

    //编辑器
    uploadArticle = () => {
        console.log(1);
        let article = {
            id:10,
            title:'标题',
            type:2,
            date:new Date(),
            content:'<h1 id="h1-1" >qwe</h1>在引入 官方的demo后，采用babel能成功引入了antd design的相关组件，发现多了antd design的组件还是很强大的，，但是问题来了，如何才能修改antd design自带的样式呢?哪怕是更改一下背景颜色，官方API 说明里面没有样式修改。求大神help一下下。2。组件代码如下 ，引入的都是自定义的组件，直接加class或者style是无效的，在引入 官方的demo后，采用babel能成功引入了antd design的相关组件，发现多了antd design的组件还是很强大的，，但是问题来了，如何才能修改antd design自带的样式呢?哪怕是更改一下背景颜色，官方API 说明里面没有样式修改。求大神help一下下。2。组件代码如下 ，引入的都是自定义的组件，直接加class或者style是无效的，在引入 官方的demo后，采用babel能成功引入了antd design的相关组件，发现多了antd design的组件还是很强大的，，但是问题来了，如何才能修改antd design自带的样式呢?哪怕是更改一下背景颜色，官方API 说明里面没有样式修改。求大神help一下下。了antd design的组件还是很强大的，，但是问题来了，如何才能修改antd design自带的样式呢?哪怕是更改一下背景颜色，官方API 说明里面没有样式修改。求大神help一下下。2。组件代码如下 ，引入的都是自定义的组件，直接加class或者style是无效的，在引入 官方2。组件代码如下 ，引入的都是自定义的组件，直接加class或者style是无效的，在引入 官方的demo后，采用babel能成功引入了antd design的相关组件，发现多了antd design的组件还是很强大的，，但是问题来了，如何才能修改antd design自带的样式呢?哪怕是更改一下背景颜色，官方API 说明里面没有样式修改。求大神help一下下。2。组件代码如下 ，引入的都是自定义的组件，直接加class或者style是无效的，<h4 id="h4-1" >qwe</h4> <h2 id="h2-1" >qwe</h2> <h1 id="h1-2" >qwe</h1> <h2 id="h2-2" >123</h2> <h5 id="h5-1" >qwe</h5> '
        };
        this.setState({
            editorState:this.getEditorState(article.content)
        });
        // fetch(`${URL}article/update`, {
        //     method: "POST",
        //     body: JSON.stringify(article)
        // }).then(function(response) {
        //     // do sth
        // });
    }
    //编辑器
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
        const SubMenu = Menu.SubMenu;
        const classes = (type) => {
            let cl = this.state.classes.get(type+'');
            let tem = [];
            if (cl === undefined) {
                this.getClasses(type, (data) => {
                    let classes = this.state.classes;
                    classes.set(type+'',data);
                    this.setState({classes: classes});
                });
            }else{
                for (let d of cl) {
                    if (d.has_child === 0) {
                        tem.push(<Menu.Item key={d.id}>{d.name}</Menu.Item>);
                    }else {
                        if(!this.state.classes.get(type+'')){
                            this.getClasses(type, (data) => {
                                let classes = this.state.classes;
                                classes.set(type,data);
                                this.setState({classes: classes});
                            });
                        }
                        tem.push(<SubMenu key={d.id} title={d.name} disabled={false} onTitleClick={this.menuClick}>
                            {classes(d.id)}
                        </SubMenu>);
                    }
                }
            }
            return tem;
        };
        const articles =() => {
            let cl = this.state.articles;
            let tem = [];
            if (cl === undefined) {

            }else{
                for (let d of cl) {

                    tem.push(
                        <li key={d.id} className={this.state.selArticle ===d.id?'pointer active':'pointer'} onClick={this.articlesItemClick.bind(this , d.id)}>
                            <div className="menu-title color-4">{d.title}</div>
                            <div className="menu-briefing font-1 color-5">{d.briefing}</div>
                            <div className="menu-date font-1 color-3">{d.date}</div>
                        </li>
                       );
                }
            }
            return tem;
        };
        class Update extends Component {
            render() {
                return (
                    <Button className="right" onClick={this.props.click}>保存</Button>
                );
            }
        }

        return (<Row className="editor">
            <Col xs={{span: 3}} sm={{span: 3}} md={{span: 3}} lg={{span: 3}} className="editor-sidebar">
                <Menu
                    inlineCollapsed={false}
                    // theme={"dark"}
                    onClick={this.menuItemClick}
                    className="sel-left"
                    defaultSelectedKeys={['java']}
                    defaultOpenKeys={['sub4']}
                    mode="inline"
                >
                {classes(0)}
                </Menu>

            </Col>
            <Col xs={{span: 4}} sm={{span: 4}} md={{span: 4}} lg={{span: 4}} className="editor-middle">

                <ul className="editor-middle-menu font-7">
                    {articles()}
                </ul>

            </Col>
            <Col xs={{span: 17}} sm={{span: 17}} md={{span: 17}} lg={{span: 17}} className="editor-viewport">
                <div className="editor-title"  contentEditable={true} onInput={this.changeTitle} suppressContentEditableWarning = {true}>
                    <h2 className="in-block">{this.state.title}</h2>
                </div>
                <Editor

                    onEditorStateChange={this.onEditorStateChange}
                    editorState={this.state.editorState}
                    toolbarCustomButtons={[<Update click={this.uploadArticle}/>]}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],
                        inline: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
                            bold: { icon: undefined, className: 'ant-btn bold' },
                            italic: { icon: undefined, className: 'ant-btn italic' },
                            underline: { icon: undefined, className: 'ant-btn underline' },
                            strikethrough: { icon: undefined, className: 'ant-btn strikethrough' },
                            // monospace: { icon: undefined, className: 'ant-btn monospace' },
                            superscript: { icon: undefined, className: 'ant-btn superscript' },
                            subscript: { icon: undefined, className: 'ant-btn subscript' },
                        },
                        list: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ['unordered', 'ordered', 'indent', 'outdent'],
                            unordered: { icon: undefined, className: 'ant-btn unordered' },
                            ordered: { icon: undefined, className: 'ant-btn ordered' },
                            indent: { icon: undefined, className: 'ant-btn indent' },
                            outdent: { icon: undefined, className: 'ant-btn outdent' },
                        },
                        textAlign: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ['left', 'center', 'right', 'justify'],
                            left: { icon: undefined, className: 'ant-btn editor-icon-left' },
                            center: { icon: undefined, className: 'ant-btn editor-icon-center' },
                            right: { icon: undefined, className: 'ant-btn editor-icon-right' },
                            justify: { icon: undefined, className: 'ant-btn editor-icon-justify' },
                        },
                        colorPicker: { component: ColorPic },
                        link: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            popupClassName: undefined,
                            dropdownClassName: undefined,
                            showOpenOptionOnHover: true,
                            defaultTargetOption: '_self',
                            options: ['link', 'unlink'],
                            link: { icon: undefined, className: 'ant-btn link' },
                            unlink: { icon: undefined, className: 'ant-btn unlink' },
                        },
                        embedded: {
                            icon: undefined,
                            className: 'ant-btn embedded',
                            component: undefined,
                            popupClassName: undefined,
                            defaultSize: {
                                height: 'auto',
                                width: 'auto',
                            },
                        },
                        image: {
                            icon: undefined,
                            className: 'ant-btn image',
                            uploadCallback: this.uploadImageCallBack,
                            alt: { present: true, mandatory: false },
                            inputAccept:'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                            },
                        remove: { icon: undefined, className: 'ant-btn remove' },
                        history: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ['undo', 'redo'],
                            undo: { icon: undefined, className: 'ant-btn undo' },
                            redo: { icon: undefined, className: 'ant-btn redo' },
                        }
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
