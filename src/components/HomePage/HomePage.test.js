import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter as Router } from "react-router-dom";

describe("Home Page", () => {
  describe("display elements when not user is not logged in", () => {
    it("should show message and login button", () => {
      const { getByText, getByTestId } = render(
        <Router>
          <HomePage />
        </Router>
      );
      const loginButton = getByTestId("login__button");
      expect(
        getByText("Login to receive your secret message")
      ).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe("display elements when user is logged in", () => {
    it("should show logout button", async () => {
      const { getByTestId } = render(
        <Router>
          <HomePage userHasAuthenticated={true} />
        </Router>
      );
      const logoutButton = getByTestId("logout__button");
      expect(logoutButton).toBeInTheDocument();
    });
  });
});
