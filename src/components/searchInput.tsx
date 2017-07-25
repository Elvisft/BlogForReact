// import { Select } from 'antd';
// import jsonp from 'fetch-jsonp';
// import querystring from 'querystring';

// const option: any = Select.Option;

// let timeout: any;
// let currentValue: any;
//
// function fetch(value: any, callback: Function): void {
//     if (timeout) {
//         clearTimeout(timeout);
//         timeout = null;
//     }
//     currentValue = value;
//
//     function fake() {
//         // const str: string = value;
//
//         jsonp('https://suggest.taobao.com/sug?${str}')
//             .then(response => response.json())
//             .then((d) => {
//             if (currentValue === value ) {
//                 const result = d.result;
//                 const data: any[] = [];
//                 result.forEach((r: any) => {
//                     data.push({
//                         value: r[0],
//                         text: r[0]
//                     });
//                 });
//                 callback(data);
//             }
//         });
//     }
//
//     timeout = setTimeout(fake, 300);
// }
// interface SearchInputProps {
//     placeholder: string;
// }
// class SearchInput extends React.Component<SearchInputProps, {}> {
//     state = {
//         data: [],
//         value: ''
//     };
//     handleChange = (value) => {
//         this.setState({value});
//         fetch(value, data => this.setState({data}));
//     }
//
//     render() {
//         const options = this.state.data.map(d => <option key={d.value}>{d.text}</option>);
//
//         return (
//             <Select
//                 mode="combobox"
//                 value={this.state.value}
//                 placeholder={this.props.placeholder}
//                 notFoundContent=""
//                 style={this.props.style}
//                 defaultActiveFirstOption={false}
//                 showArrow={false}
//                 filterOption={false}
//                 onChange={this.handleChange}
//             >
//                 {options}
//             </Select>
//         );
//     }
// }

import * as React from 'react';
import { Select } from 'antd';
// import fetchJsonp from 'fetch-jsonp';
// import Fetch from 'isomorphic-fetch';
// import es6 from 'es6-promise';

// import querystring from 'querystring';
const Option = Select.Option;

let timeout: any;
let currentValue: any;

function fetch1(value: any, callback: Function) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        // es6.polyfill();


        fetch('http://localhost:7070/company/search/'+value ,
            {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then((d) => {
                if (currentValue === value) {
                    const result = d.list;
                    const data: any[] = [];
                    result.forEach((r: any) => {
                        data.push({
                            value: r.companyNm,
                            text: r.companyNm,
                        });
                    });
                    callback(data);
                }
            });
    }

    timeout = setTimeout(fake, 300);
}
interface SearchInputProps {
    placeholder: string;
    style: any;

}
class SearchInput extends React.Component<SearchInputProps, any> {
    state = {
        data: [],
        value: '',
    }
    handleChange = (value: any) => {
        this.setState({ value });
        fetch1(value, (data: any) => this.setState({ data }));
    }
    render() {
        const options = this.state.data.map((d: any) => <Option key={d.value}>{d.text}</Option>);
        return (
            <Select
                mode="combobox"
                value={this.state.value}
                placeholder={this.props.placeholder}
                notFoundContent=""
                style={this.props.style}
                defaultActiveFirstOption={false}

                onChange={this.handleChange}
            >
                {options}
            </Select>
        );
    }
}
export default SearchInput;