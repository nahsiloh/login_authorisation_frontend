import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../api/api";
import "./LoginForm.css";
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Jumbotron
} from "react-bootstrap";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  handleLoginChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  loginSubmit = async () => {
    try {
      const { username, password } = this.state;
      await loginUser(username, password);
      this.setState({ message: "You are logged in" });
    } catch (err) {
      this.setState({ message: "Invalid username or password" });
    }
  };

  render() {
    return (
      <Jumbotron fluid>
        <Container>
          <h2>User Login</h2>
          <InputGroup>
            <FormControl
              name="username"
              type="string"
              onChange={this.handleLoginChange}
              value={this.state.username}
              placeholder="Username"
              required
            />
          </InputGroup>
          <InputGroup>
            <FormControl
              name="password"
              type="string"
              onChange={this.handleLoginChange}
              value={this.state.password}
              placeholder="Password"
              required
            />
          </InputGroup>
          <Button onClick={this.loginSubmit} data-testid="login__button">
            Login
          </Button>
          <Link to="/create">
            <Button data-testid="createAccount__button">Create Account</Button>
          </Link>
          <p>{this.state.message}</p>
        </Container>
      </Jumbotron>
    );
  }
}

export default LoginForm;
