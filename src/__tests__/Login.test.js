import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserProvider } from "../auth/UserProvider.js";
import Login from "../components/pages/Login.js";

const EMPTY_USER = {
  username: "",
  jwt: "",
  role: "",
};

const USER_LOGIN = {
  username: "royobannon@chon.com",
  password: "password",
};

const loginPromise = Promise.resolve(USER_LOGIN);
const mockLogin = jest.fn();
jest.mock("../service/auth/AuthenticationManager", () => ({
  login: (userData) => mockLogin(userData),
}));

function renderLogin(user) {
  return render(
    <UserProvider user={user}>
      <Login />
    </UserProvider>
  );
}

describe("Login", () => {
  describe("form", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockLogin.mockReturnValue(loginPromise);
    });

    it("renders the Login page", () => {
      renderLogin(EMPTY_USER);
      expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("renders login form", () => {
      renderLogin(EMPTY_USER);

      expect(screen.getByLabelText("USERNAME")).toBeInTheDocument();
      expect(screen.getByLabelText("PASSWORD")).toBeInTheDocument();
    });

    it("calls login when form is submitted", async () => {
      renderLogin(EMPTY_USER);

      const username = screen.getByLabelText("USERNAME");
      const password = screen.getByLabelText("PASSWORD");
      const submit = screen.getByText("Submit");

      userEvent.type(username, USER_LOGIN.username);
      userEvent.type(password, USER_LOGIN.password);

      await act(async () => {
        await userEvent.click(submit);
      });

      expect(mockLogin).toHaveBeenCalledWith(USER_LOGIN);
    });
  });
});
