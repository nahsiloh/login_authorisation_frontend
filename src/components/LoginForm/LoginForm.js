import React, { Component } from "react";
import { fetchUsers, loginUser } from "../../api/api";
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Jumbotron
} from "react-bootstrap";
import "./LoginForm.css";
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
    console.log(await fetchUsers);
    try {
      const { username, password } = this.state;
      await loginUser(username, password);
      this.setState({ message: "You are logged in" });
    } catch (err) {
      this.setState({ message: "Invalid username or password" });
    }
  };

  createNewAccount = () => {
    this.props.history.push("/createUser");
  };

  render() {
    return (
      <Jumbotron fluid>
        <Container>
          <h2>Login</h2>
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
          <Button onClick={this.loginSubmit}>Login</Button>
          <Button onClick={this.createNewAccount}>Create new Account</Button>
          <p>{this.state.message}</p>
        </Container>
      </Jumbotron>
    );
  }
}

export default LoginForm;
