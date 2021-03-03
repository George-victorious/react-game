import { prettyDOM } from "@testing-library/react";
import React, { Component } from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.myInterval = setInterval(() => {
            this.props.setTime(this.props.time + 1)
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
    render() {
        return (
            <>
                {this.props.time > 999 ? 999 : this.props.time}
            </>
        )
    }
}

export default Timer