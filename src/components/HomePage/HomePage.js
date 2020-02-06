import React, { Component } from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { logout } from "../../api/api";
import { Link } from "react-router-dom";
import { fetchSecret } from "../../api/api";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Login to receive your secret message"
    };
  }

  componentDidMount = async () => {
    try {
      const secretMessage = await fetchSecret();
      this.setState({ message: secretMessage });
    } catch (err) {
      return err.message;
    }
  };

  logoutSubmit = async () => {
    try {
      const logoutMessage = await logout();
      this.setState({
        message: logoutMessage
      });
      this.props.checkUserAuthenticated(false);
      this.props.history.push("/");
    } catch (err) {
      return err.message;
    }
  };

  displayLoginButton = () => {
    return !this.props.userHasAuthenticated ? (
      <Link to="/">
        <Button>Login</Button>
      </Link>
    ) : (
      <Link to="/">
        <Button onClick={this.logoutSubmit}>Logout</Button>
      </Link>
    );
  };

  render() {
    return (
      <Jumbotron fluid>
        <Container>
          <p>{this.state.message}</p>
          <this.displayLoginButton />
        </Container>
      </Jumbotron>
    );
  }
}

export default HomePage;
