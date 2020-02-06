import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import CreateUser from "./components/CreateUser/CreateUser";
import HomePage from "./components/HomePage/HomePage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userHasAuthenticated: false,
      secretMessage: ""
    };
  }

  checkUserAuthenticated = userHasAuthenticated => {
    this.setState({
      userHasAuthenticated
    });
    localStorage.setItem("userHasAuthenticated", true);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <LoginForm
                  checkUserAuthenticated={this.checkUserAuthenticated}
                  {...props}
                />
              )}
            />
            <Route exact path="/create" component={() => <CreateUser />} />
            <Route
              exact
              path="/home"
              component={() => (
                <HomePage
                  checkUserAuthenticated={this.checkUserAuthenticated}
                  userHasAuthenticated={this.state.userHasAuthenticated}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
