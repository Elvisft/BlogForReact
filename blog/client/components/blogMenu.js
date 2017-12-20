import React from 'react';
import PropTypes from 'prop-types';
import  { Component } from 'react';

class BlogMenu extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        defaultSelectedKeys: PropTypes.array,
        defaultOpenKeys: PropTypes.array
    };
    static defaultProps = {
        onClick : ()=>{},
        defaultSelectedKeys : ['0'],
        defaultOpenKeys : [1]
    }

    state = {
        selectedKeys:this.props.defaultSelectedKeys,
        openKeys:this.props.defaultOpenKeys
    }

    itemOnClick=(item)=>{

        this.setState({selectedKeys: [item.key]});
        this.props.onClick(item);
    }
    subMenuOnClick = (item)=>{
        let openKeys = this.state.openKeys;
        if(openKeys.indexOf(item.key)<0){
            openKeys.push(item.key);
        }else{
            openKeys.splice(openKeys.indexOf(item.key), 1);
        }
        this.setState({openKeys: openKeys});
    }
    render(){
        let child = this.props.children;

        return(
            <ul className="blog-menu font-8">
                {
                    React.Children.map(child,thisArg=>{
                        let dom={
                            state: false ,
                            keys: thisArg.key,
                            itemOnClick:this.itemOnClick,
                            subMenuOnClick: this.subMenuOnClick,
                            selectedKeys:this.state.selectedKeys,
                            openKeys:this.state.openKeys
                        };
                        if(this.state.selectedKeys.indexOf(thisArg.key)>=0||this.state.openKeys.indexOf(thisArg.key)>=0){
                            dom.state = true;
                        }
                        return React.cloneElement(thisArg, dom);
                    })
                }
            </ul>
        );
    }
}
BlogMenu.Item = class extends Component {
    onClick=(e)=>{
        this.props.itemOnClick({
            key: this.props.keys,
            domEvent: e,
            item: this
        });
    };
    render(){
        let child = this.props.children;
        let className = 'pointer blog-menu-item ';
        if(this.props.state){
            className += 'active';
        }
        return(
            <li className={className} onClick={this.onClick}>
                <div className="menu-title color-4">
                    {
                        React.Children.map(child,thisArg=>{
                            return thisArg;
                        })
                    }
                </div>
            </li>
        )}
};
BlogMenu.SubMenu = class extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    onClick=(e)=>{
        this.props.subMenuOnClick({
            key: this.props.keys,
            domEvent: e,
            item: this
        });
    }
    render(){
        const child = this.props.children;
        let className = 'pointer blog-submenu ';
        if(this.props.state) {
            className += 'open';
        }
        return(
            <li className={className}>
                <div className="menu-title color-4" onClick={this.onClick}>{this.props.title}<i className="menu-arrow"/></div>
                <ul className="blog-menu">
                    {
                        React.Children.map(child,thisArg=>{
                            let dom={
                                state: false ,
                                keys: thisArg.key,
                                itemOnClick:this.props.itemOnClick,
                                selectedKeys:this.props.selectedKeys
                            };
                            if(this.props.selectedKeys.indexOf(thisArg.key)>=0||this.props.openKeys.indexOf(thisArg.key)>=0){
                                dom.state = true;
                            }
                            return React.cloneElement(thisArg, dom);
                        })
                    }
                </ul>
            </li>
        )}
};
export default BlogMenu;