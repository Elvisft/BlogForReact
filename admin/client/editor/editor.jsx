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

const SubMenu = Menu.SubMenu;

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
class Update extends Component {
    render() {
        return (
            <Button className="right" onClick={this.props.click}>保存</Button>
        );
    }
}



class EditorCustomizedToolbarOption extends React.Component {
    state = {
        classes: new Map(),
        articles:[],
        selArticle:undefined,
        editorState: EditorState.createEmpty(),
        article:{},
        id:undefined,
        // content:'',
        title:'',
        date:new Date(),
        type:undefined
    }

    static defaultProps = {
        getArticlesURL : 'article/getArticles/',
        getClassesURL : 'classes/getClasses/',
        getArticleURL : 'article/getArticle/'
    }
    constructor(props){
        super(props);
        this.menuItemClick({key: 0}, (data)=>{
            this.getArticle(data[0].id,(data)=>{
                if(data.length>0){
                    this.setState({selArticle: data[0].id});
                    this.setArticle(data[0]);
                }
            });
        });
        // this.state.editorState=this.getEditorState(this.state.content);
    }

    //获取菜单
    getClasses = (classes, callback) => {
        return fetch( URL + this.props.getClassesURL + classes ).then(response => response.json())
            .then(data => callback(data))
            .catch(e => console.log('Oops, error', e));
    }
    getArticles = (type, page, size, callback) => {
        return fetch( URL + this.props.getArticlesURL + `${type}/${page}/${size}` ).then(response => response.json())
            .then(data => callback(data))
            .catch(e => console.log('Oops, error', e));
    }

    getArticle = (id, callback) => {
        return fetch(  `${URL}${this.props.getArticleURL}${id}` ).then(response => response.json())
            .then(data => callback(data))
        // .catch(e => console.log('Oops, error', e));
    }

    setArticle = (article)=>{

        this.setState({

            id:article.id,
            type: article.type,
            title: article.title,
            date: article.date,
            // content: article.content,
            editorState: this.getEditorState(article.content)
        });
    }

    //菜单动作
    menuItemClick = (e,args) =>{
        let type = e.key;

        this.getArticles(type, 0, 1000, (data)=>{
            this.setState({articles:data});
            if(typeof args === 'function'){
                args(data);
            }
        });

    }

    articlesItemClick = (e,id)=>{

        this.getArticle(id,(data)=>{
            if(data.length>0){
                this.setState({  selArticle: e});
                this.setArticle(data[0]);

            }

        });
    }
    test=(editorState)=>{
        // this.setState({content:this.htmlFormat(draftToHtml(convertToRaw(editorState.getCurrentContent())))});
        console.log(this.htmlFormat(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
        this.uploadArticle();

    }

    //编辑器
    getEditorState = (text)=>{

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

        });

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
        this.setState({title:e.target.innerHTML},this.uploadArticle);

    }

    //编辑器
    uploadArticle = () => {

        let article = {
            id:this.state.id,
            title:this.state.title,
            type:this.state.type,
            date:new Date(),
            content: this.htmlFormat(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        };
        console.log(article.title);
        let articles = this.state.articles;

        articles[this.state.selArticle-1] = {
            id:article.id,
            title:article.title,
            type:article.type,
            date:article.date.getMonth()+'.'+article.date.getDate()+'.'+article.date.getFullYear(),
            briefing:article.content.replace(/<(?:.|\s)*?>/g,'')
        }
        this.setState({articles: articles});
        this.setArticle(article);

        fetch(`${URL}article/update`, {
            method: "POST",
            body: JSON.stringify(article)
        }).then(function(response) {
            // do sth
        });
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


     classes = (type) => {
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
                    {this.classes(d.id)}
                </SubMenu>);
            }
        }
    }
    return tem;
};
     articles =() => {
    let cl = this.state.articles;
    let tem = [];
    if (cl === undefined) {

    }else{
        for(let [index,d] of new Map( cl.map( ( item, i ) => [ i, item ] ) )){
            index++;
            tem.push(
                <li key={index} className={this.state.selArticle ===index?'pointer active':'pointer'} onClick={this.articlesItemClick.bind(this , index, d.id)}>
                    <div className="menu-title color-4">{d.title}</div>
                    <div className="menu-briefing font-1 color-5">{d.briefing}</div>
                    <div className="menu-date font-1 color-3">{d.date}</div>
                </li>
            );
        }
    }
    return tem;
};
    render(){


        return (<Row className="editor">
            <Col xs={{span: 3}} sm={{span: 3}} md={{span: 3}} lg={{span: 3}} className="editor-sidebar">
                <Menu
                    inlineCollapsed={false}
                    // theme={"dark"}
                    onClick={this.menuItemClick}
                    className="sel-left"
                    defaultSelectedKeys={['0']}
                    // defaultOpenKeys={['sub4']}
                    mode="inline"
                >

                    <Menu.Item key={0}>最近文档</Menu.Item>
                {this.classes(0)}
                </Menu>

            </Col>
            <Col xs={{span: 4}} sm={{span: 4}} md={{span: 4}} lg={{span: 4}} className="editor-middle">

                <ul className="editor-middle-menu font-7">
                    {this.articles()}
                </ul>

            </Col>
            <Col xs={{span: 17}} sm={{span: 17}} md={{span: 17}} lg={{span: 17}} className="editor-viewport">
                <div className="editor-title"  contentEditable={true} onBlur={this.changeTitle} suppressContentEditableWarning = {true}>
                    {this.state.title}
                </div>
                <Editor

                    onEditorStateChange={this.onEditorStateChange}
                    onBlur={this.test.bind(this,this.state.editorState)}
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
