import React from "react";
import { createUser } from "../../api/api";
import "./CreateUser.css";
import {
  Jumbotron,
  Container,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      message: ""
    };
  }

  handleCreateUserChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitCreateUser = async () => {
    try {
      const newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      await createUser(newUser);
      this.setState({ message: "New account created!" });
      this.props.history.push("/");
    } catch (err) {
      this.setState({ message: "Unable to create new account :(" });
    }
  };

  render() {
    return (
      <Jumbotron fluid>
        <Container>
          <h2>Create Account</h2>
          <InputGroup>
            <FormControl
              name="email"
              type="string"
              onChange={this.handleCreateUserChange}
              value={this.state.email}
              placeholder="Email"
              required
            />
          </InputGroup>
          <InputGroup>
            <FormControl
              name="username"
              type="string"
              onChange={this.handleCreateUserChange}
              value={this.state.username}
              placeholder="Username"
              required
            />
          </InputGroup>
          <InputGroup>
            <FormControl
              name="password"
              type="string"
              onChange={this.handleCreateUserChange}
              value={this.state.password}
              placeholder="Password"
              required
            />
          </InputGroup>
          <Button onClick={this.submitCreateUser} data-testid="create__button">
            Create
          </Button>
          <p>{this.state.message}</p>
        </Container>
      </Jumbotron>
    );
  }
}

export default CreateUser;
