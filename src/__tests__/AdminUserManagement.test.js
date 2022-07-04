import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserProvider } from "../auth/UserProvider.js";
import AdminUserManagement from "../components/pages/AdminUserManagement.js";

const EMPTY_USER = {
  username: "",
  jwt: "",
  role: "",
};

const ADMIN_USER = {
  username: "admin",
  jwt: "eyabc",
  role: "ROLE_ADMIN",
};

const USER_USER = {
  username: "user",
  jwt: "blah",
  role: "ROLE_USER",
};

const ADMIN_USER_INFO = {
  username: "admin",
  role: "ROLE_ADMIN",
  firstName: "Vince",
  lastName: "Vaughn",
};

const USER_USER_INFO = {
  username: "user",
  role: "ROLE_USER",
  firstName: "Roy",
  lastName: "O'Bannon",
};

const deleteAccountPromise = Promise.resolve({});
const updateUserPromise = Promise.resolve({});

const mockDeleteAccount = jest.fn();
const mockUpdateUser = jest.fn();
jest.mock("../service/AdminPanel/AdminPanel", () => ({
  deleteAccount: (username, token) => mockDeleteAccount(username, token),
  updateUser: (data, token) => mockUpdateUser(data, token),
}));

function wrappedRender(component, user) {
  return render(<UserProvider user={user}>{component}</UserProvider>);
}

describe("AdminUserManagement", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockDeleteAccount.mockReturnValue(deleteAccountPromise);
    mockUpdateUser.mockReturnValue(updateUserPromise);
  });

  describe("as admin", () => {
    it("renders the page", () => {});

    describe("delete user", () => {
      it("renders the delete user button");

      it("displays a confirmation when the delete user button is clicked");

      it("calls deleteUser when the Confirm button is clicked");

      it("displays success message when user is deleted");

      it("displays a Back To Admin Panel button when deletion is successful");

      it("displays an error message when deletion is unsuccessful");

      it("does not call deleteUser when Cancel button is clicked");

      it("reverts back to default view when Cancel button is clicked");
    });

    describe("edit user form", () => {
      it("renders the form", async () => {
        wrappedRender(<AdminUserManagement />, ADMIN_USER);
      });

      it("renders the form as disabled by default");

      it("renders the form with correct values");

      it("enables the form when Edit User button is clicked");

      it("disables the enabled form when Cancel button is clicked");

      it("reverts any changes in the form when Cancel button is clicked");

      it("displays changes in the inputs for an enabled form");

      it("displays an error message when username is empty");

      it("displays an error message when username is invalid");

      it("calls updateUser with the correct data when the form is submitted");

      it("shows a success message when the form is successfully submitted");

      it(
        "disables the form with the updated values when the form is successfully submitted"
      );

      it("displays an error message when the form submits unsuccessfully");

      it(
        "keeps the form enabled and populated when the form submits unsuccessfully"
      );
    });
  });

  describe("as staff", () => {
    it("does not render the page");
  });

  describe("as user", () => {
    it("does not render the page");
  });
});
