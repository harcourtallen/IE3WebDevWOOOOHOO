import React, { Component } from 'react';
import Card from './Card';
import './Search.css';

class Search extends Component {

    state = {
        input: '',
        users: []
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/user').then(res => res.json()).then((result) => {
            this.setState({users: result});
            console.log(result);
        }, (err) => {
            console.log(err);
        });
    }

    inputHandler = (e) => {
        let input = e.target.value;

        // Must set input state before everything else, otherwise lag
        this.setState({input});
    }

    cardHandler = (item, i) => {
        return (
            <Card key={i}>
                {item}
            </Card>
        );
    }

    render() {
        return (
            <div className="search_component">
                <div className="search_box"
                style={{textAlign: 'center'}}>
                    <input type="text"
                    className="search"
                    onChange={this.inputHandler}
                    value={this.state.input} />

                    <button type="button"
                    className="button">
                    Go</button>

                    <p>{this.props.users}</p>

                    <div className="card_results">
                        {this.state.users.map(this.cardHandler)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
