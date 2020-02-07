describe("Login Application", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Create Account", () => {
    it("should return error message when user fails to create account", () => {
      cy.get("button")
        .contains("Create Account")
        .click();
      cy.get("button")
        .contains("Create")
        .click();
      cy.get("p").should("contain", "Unable to create new account :(");
    });

    it("should reroute to login page upon successfully creating an account", () => {
      cy.get("button")
        .contains("Create Account")
        .click();
      cy.get("input[name=email]").type("bob@mail.com");
      cy.get("input[name=username]").type("bob_barker");
      cy.get("input[name=password]").type("pass1234");
      cy.get("button")
        .contains("Create")
        .click();
      cy.get("h2").should("contain", "User Login");
    });
  });

  describe("User Login", () => {
    it("should return error message when user fails to login", () => {
      cy.get("h2").contains("User Login");
      cy.get("button")
        .contains("Login")
        .click();
      cy.get("p").should("contain", "Invalid username or password");
    });

    it("should reroute to home page upon successful login and logout", () => {
      cy.get("input[name=username]").type("bob_barker");
      cy.get("input[name=password]").type("pass1234");
      cy.get("button")
        .contains("Login")
        .click();
      cy.get("p").should("contain", "The Secret is Emporio Analytics");
      cy.get("button")
        .contains("Logout")
        .click();
      cy.get("h2").should("contain", "User Login");
    });
  });

  describe("Home page", () => {
    it("should not show secret message is user is not logged in", () => {
      cy.visit("/home");
      cy.get("p").contains("Login to receive your secret message");
      cy.get("button")
        .contains("Login")
        .click();
      cy.get("h2").should("contain", "User Login");
    });
  });
});
