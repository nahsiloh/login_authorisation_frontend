import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

describe("Login Form", () => {
  describe("display elements", () => {
    it("should have Login title on page ", () => {
      const { getByText } = render(
        <Router>
          <LoginForm />
        </Router>
      );
      expect(getByText("User Login")).toBeInTheDocument();
    });

    it("should display the email and password input", () => {
      const { getByPlaceholderText } = render(
        <Router>
          <LoginForm />
        </Router>
      );
      expect(getByPlaceholderText("Username")).toBeInTheDocument();
      expect(getByPlaceholderText("Password")).toBeInTheDocument();
    });

    it("should display a login button", () => {
      const { getByTestId } = render(
        <Router>
          <LoginForm />
        </Router>
      );
      expect(getByTestId("login__button")).toBeInTheDocument();
    });

    it("should display a create new account button", () => {
      const { getByTestId } = render(
        <Router>
          <LoginForm />
        </Router>
      );
      expect(getByTestId("createAccount__button")).toBeInTheDocument();
    });
  });

  describe("enter inputs", () => {
    it("should fill in the login credentials", () => {
      const handleLoginChange = jest.fn();
      const { getByPlaceholderText } = render(
        <Router>
          <LoginForm handleLoginChange={handleLoginChange} />
        </Router>
      );

      const userPassword = getByPlaceholderText("Password");
      fireEvent.change(userPassword, { target: { value: "pass1234" } });

      expect(userPassword.value).toBe("pass1234");
    });
  });

  describe("confirmation message", () => {
    it("should display an error message when user failed to logged in", async () => {
      const loginSubmit = jest.fn();
      const { getByTestId, findByText } = render(
        <Router>
          <LoginForm loginSubmit={loginSubmit} />
        </Router>
      );

      const button = getByTestId("login__button");
      fireEvent.click(button);

      const loginErrorMessage = await findByText(
        "Invalid username or password"
      );
      expect(loginErrorMessage).toBeInTheDocument();
    });
  });
});
