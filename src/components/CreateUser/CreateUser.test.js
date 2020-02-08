import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateUser from "./CreateUser";
import { BrowserRouter as Router } from "react-router-dom";
import * as data from "../../api/api";

const mockPost = jest.spyOn(data, "createUser");
jest.mock("axios");

describe("Create Account", () => {
  describe("display elements", () => {
    it("should have Login title on page ", () => {
      const { getByText } = render(
        <Router>
          <CreateUser />
        </Router>
      );
      expect(getByText("Create Account")).toBeInTheDocument();
    });

    it("should be able to see the email, username and password input fields", () => {
      const { getByPlaceholderText } = render(
        <Router>
          <CreateUser />
        </Router>
      );
      expect(getByPlaceholderText("Email")).toBeInTheDocument();
      expect(getByPlaceholderText("Username")).toBeInTheDocument();
      expect(getByPlaceholderText("Password")).toBeInTheDocument();
    });
  });

  it("should display a create button", () => {
    const { getByTestId } = render(
      <Router>
        <CreateUser />
      </Router>
    );
    expect(getByTestId("create__button")).toBeInTheDocument();
  });

  describe("enter inputs", () => {
    it("should fill in the create account inputs", () => {
      const handleCreateUserChange = jest.fn();
      const { getByPlaceholderText } = render(
        <Router>
          <CreateUser handleLoginChange={handleCreateUserChange} />
        </Router>
      );
      const email = getByPlaceholderText("Email");
      fireEvent.change(email, {
        target: { value: "testUser@mail.com" }
      });

      const username = getByPlaceholderText("Username");
      fireEvent.change(username, {
        target: { value: "testUser" }
      });

      const userPassword = getByPlaceholderText("Password");
      fireEvent.change(userPassword, { target: { value: "pass1234" } });

      expect(email.value).toBe("testUser@mail.com");
      expect(username.value).toBe("testUser");
      expect(userPassword.value).toBe("pass1234");
    });
  });

  describe("error message", () => {
    it("should display error message if failed to create", async () => {
      const submitCreateUser = jest.fn();
      const { getByTestId, findByText } = render(
        <Router>
          <CreateUser submitCreateUser={submitCreateUser} />
        </Router>
      );

      const createButton = getByTestId("create__button");
      fireEvent.click(createButton);

      const createErrorMessage = await findByText(
        "Unable to create new account :("
      );
      expect(createErrorMessage).toBeInTheDocument();
    });
  });
});
