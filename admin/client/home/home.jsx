import * as React from 'react';
import './home.less';
import { DatePicker } from  'antd';
import * as actions from './../actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import 'antd/dist/antd.css';
// import { Link } from 'react-router-dom';
import logo from './../logo.svg';
// const logo = require('./../logo.svg');


export class Home extends React.Component {

    constructor (props) {
        super (props);
        this.state = {list : []};

    }

    render() {

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>

                <DatePicker/>
            </div>

        );
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
}
export default connect(
    undefined,
    mapDispatchToProps
)(Home);