import React, { Component } from 'react';
import Search from '../Components/Search';

class Home extends Component {
    render() {
        return (
            <div>
                <Search />
                <a href="/event">event</a>
            </div>
        );
    }
}

export default Home;