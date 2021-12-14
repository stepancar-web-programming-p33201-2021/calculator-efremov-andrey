import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const buttons = ['+', '1', '2', '3', 'br', '-', '4', '5', '6', 'br', '*', '7', '8', '9', 'br', '%', 'x^y', '0', '=', 'br', 'clear']

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {value: ''};
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        console.log(this.state.value)
    }

    handleClick(e) {
        let current = this.state.value
        if (e.target.id === 'clear') {
            this.setState({value: ''})
        } else if (e.target.id === '=')
            this.calc()
        else if (e.target.id === 'x^y') {
            this.setState({value: current + '^'})
        } else {
            this.setState({value: current + e.target.id})
        }
    }

    calc() {
        let nums = this.state.value.toString()
        let result
        if (nums.match(/[^0123456789+\-*%^ ]/)) {
            result = "Incorrect input"
        } else if (nums.includes("+")) {
            nums = nums.split("+")
            result = parseInt(nums[0]) + parseInt(nums[1])
        } else if (nums.includes("-")) {
            nums = nums.split("-")
            result = parseInt(nums[0]) - parseInt(nums[1])
        } else if (nums.includes("*")) {
            nums = nums.split("*")
            result = parseInt(nums[0]) * parseInt(nums[1])
        } else if (nums.includes("%")) {
            nums = nums.split("%")
            result = Math.floor(parseInt(nums[0]) / parseInt(nums[1]))
        } else if (nums.includes("^")) {
            nums = nums.split("^")
            result = Math.pow(parseInt(nums[0]), parseInt(nums[1]))
        } else
            result = nums
        this.setState({value: result})
        return result
    }

    render() {
        return (
            <div className="calculator">
                <textarea
                    id="input-area"
                    onChange={this.handleChange}
                    value={this.state.value}
                />
                <br/>
                {buttons.map(item => {
                    if (item === 'br')
                        return (<br/>)
                    else {
                        return (<button id={item} onClick={this.handleClick}>{item}</button>)
                    }
                })}
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator/>,
    document.getElementById('root')
);