import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Components/Header';
import EventPage from './Components/EventPage';
import Home from './Components/Home';
import Error from './Components/Error';

class App extends Component {
  state = {
    user: "Collin",
  };
  constructor(props) {
    super(props);
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  handleUserLogin(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header user={this.state.user} />
          <Switch>
            <Route path="/" component={() => <Home />} exact />
            <Route path="/event" component={() => <EventPage />} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
