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
      const { container } = renderLogin(EMPTY_USER);

      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(
        container.querySelector("a[role='button'][href='/signup']")
      ).toBeInTheDocument();
    });

    it("renders login form", () => {
      const { container } = renderLogin(EMPTY_USER);

      expect(screen.getByLabelText("USERNAME")).toBeInTheDocument();
      expect(screen.getByLabelText("PASSWORD")).toBeInTheDocument();
      expect(
        container.querySelector("button[type='submit']")
      ).toBeInTheDocument();
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

    it("displays error message when password field is unfilled", async () => {
      renderLogin(EMPTY_USER);

      const username = screen.getByLabelText("USERNAME");
      const submit = screen.getByText("Submit");

      userEvent.type(username, USER_LOGIN.username);

      await act(async () => {
        await userEvent.click(submit);
      });

      expect(screen.getByText("Please fill in all fields")).toBeInTheDocument();
    });

    it("displays error message when username field is unfilled", async () => {
      renderLogin(EMPTY_USER);

      const password = screen.getByLabelText("PASSWORD");
      const submit = screen.getByText("Submit");

      userEvent.type(password, USER_LOGIN.password);

      await act(async () => {
        await userEvent.click(submit);
      });

      expect(screen.getByText("Please fill in all fields")).toBeInTheDocument();
    });

    it("displays error message when both username and password fields are unfilled", async () => {
      renderLogin(EMPTY_USER);

      const submit = screen.getByText("Submit");

      await act(async () => {
        await userEvent.click(submit);
      });

      expect(screen.getByText("Please fill in all fields")).toBeInTheDocument();
    });

    it("displays error message when credentials are incorrect", async () => {
      mockLogin.mockReturnValue(Promise.resolve({ code: 401 }));

      renderLogin(EMPTY_USER);

      const username = screen.getByLabelText("USERNAME");
      const password = screen.getByLabelText("PASSWORD");
      const submit = screen.getByText("Submit");

      userEvent.type(username, USER_LOGIN.username);
      userEvent.type(password, USER_LOGIN.password);

      await act(async () => {
        await userEvent.click(submit);
      });

      expect(
        screen.getByText("Login failed, The username or password is incorrect.")
      ).toBeInTheDocument();
    });
  });
});
