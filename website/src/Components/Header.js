import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetch('http://localhost:8080/google').then(res => res.json()).then((result) => {
            this.setState({ url: result.url });
            console.log(result);
        }, (err) => {
            console.log(err);
        });
    }
    render() {
        const user = this.props.user;
        const url = this.state.url || "";
        if (user == null) {
            return (
                <div>
                    <h1>Please log in!</h1>
                    <a href={url}>Login with Google</a>
                </div>
            );
        } else {
            return (<h1>Hello, {user}!</h1>);
        }
    }
}

export default Header;