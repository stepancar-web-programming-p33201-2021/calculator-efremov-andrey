import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const buttons = ['+', '1', '2', '3', 'br', '-', '4', '5', '6', 'br', '*', '7', '8', '9', 'br', '%', 'x^y', '0', '=', 'br', 'clear']

class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {value: ''};
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleClick(e) {
        let current = document.getElementById("input-area").value
        if (e.target.id === 'clear') {
            document.getElementById("input-area").value = ''
            this.setState({value: ''})
        } else if (e.target.id === '=')
            document.getElementById("input-area").value = this.calc()
        else if (e.target.id === 'x^y') {
            document.getElementById("input-area").value = current + '^'
            this.setState({value: current + '^'})
        } else {
            document.getElementById("input-area").value = current + e.target.id
            this.setState({value: current + e.target.id})
        }
    }

    calc() {
        let nums = this.state.value.toString()
        let result
        if (nums.match(/[^0123456789+\-*%^ ]/)) {
            this.setState({value: ''})
            return "Incorrect input"
        }
        else if (nums.includes("+")) {
            nums = nums.split("+")
            result = parseInt(nums[0]) + parseInt(nums[1])
        }
        else if (nums.includes("-")) {
            nums = nums.split("-")
            result = parseInt(nums[0]) - parseInt(nums[1])
        }
        else if (nums.includes("*")) {
            nums = nums.split("*")
            result = parseInt(nums[0]) * parseInt(nums[1])
        }
        else if (nums.includes("%")) {
            nums = nums.split("%")
            result = Math.floor(parseInt(nums[0]) / parseInt(nums[1]))
        }
        else if (nums.includes("^")) {
            nums = nums.split("^")
            result = Math.pow(parseInt(nums[0]), parseInt(nums[1]))
        }
        else
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
                    defaultValue={this.state.value}
                />
                <br/>
                {buttons.map(item => {
                    if (item === 'br')
                        return (<br/>)
                    else{
                        return (<button id={item} onClick={this.handleClick}>{item}</button>)
                    }
                })}
            </div>
        );
    }
}

ReactDOM.render(
    <MarkdownEditor/>,
    document.getElementById('root')
);