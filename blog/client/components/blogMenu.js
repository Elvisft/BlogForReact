import React from 'react';
import ReactDOM from 'react-dom';
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
                            level:1,
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
                <div className="menu-title color-4" style={{paddingLeft: this.props.level*24}}>
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
    }
    state={
        style : {
            height:0,
            opacity:0
        }
    }
    onClick=(e)=>{

        if(!this.props.state) {
            this.setState({
                style:{
                    height:0,
                    opacity:0
                }
            },()=>{
                this.setState({
                    style:{
                        height:React.Children.count(this.props.children)*48-4,
                        opacity:1
                    }
                });
            });

        }else{
            this.setState({
                style:{

                    height:React.Children.count(this.props.children)*48-4,
                    opacity:1
                }
            },()=>{
                this.setState({
                    style:{
                        height:0,
                        opacity:0
                    }
                });
            });
        }

            this.props.subMenuOnClick({
                key: this.props.keys,
                domEvent: e,
                item: this,
                child: React.Children.count(this.props.children)
            });

    }
    componentWillUpdate(nextProps, nextState){

    }
    componentWillReceiveProps(){
            console.log(ReactDOM.findDOMNode(this).querySelector('.blog-menu').clientHeight);
            this.setState({style:{}});

    }
    render(){
        const child = this.props.children;
        let className = 'pointer blog-submenu ';
        const count = React.Children.count(child);

        if(!this.props.state){
            className += 'off';
        }


        return(
            <li className={className}>
                <div className="menu-title color-4" style={{paddingLeft: this.props.level*24}} onClick={this.onClick}>{this.props.title}<i className="menu-arrow"/></div>
                <ul className="blog-menu" style={this.state.style}>
                    {
                        React.Children.map(child,thisArg=>{
                            let dom={
                                state: false ,
                                level:this.props.level+1,
                                keys: thisArg.key,
                                itemOnClick:this.props.itemOnClick,
                                selectedKeys:this.props.selectedKeys,
                                openKeys:this.props.openKeys,
                                subMenuOnClick: this.props.subMenuOnClick,
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