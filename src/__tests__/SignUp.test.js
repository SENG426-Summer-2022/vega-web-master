import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserProvider } from "../auth/UserProvider.js";
import SignUp from "../components/pages/SignUp.js";

import { MemoryRouter } from "react-router-dom";

const EMPTY_USER = {
  username: "",
  jwt: "",
  role: "",
};

const USER_USER_INFO = {
  username: "royobannon@chon.com",
  role: "ROLE_USER",
  firstName: "Roy",
  lastName: "O'Bannon",
  password: "password",
};

const signupPromise = Promise.resolve(USER_USER_INFO);
const mockSignup = jest.fn();
jest.mock("../service/auth/AuthenticationManager", () => ({
  signup: (userData) => mockSignup(userData),
}));

function renderSignUp(user) {
  return render(
    <UserProvider user={user}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </UserProvider>,
    { wrapper: MemoryRouter }
  );
}

describe("SignUp", () => {
  describe("form", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockSignup.mockReturnValue(signupPromise);
    });
    it("renders the SignUp page", () => {
      renderSignUp(EMPTY_USER);
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });

    it("renders signup form", () => {
      renderSignUp(EMPTY_USER);

      expect(screen.getByLabelText("FIRST NAME")).toBeInTheDocument();
      expect(screen.getByLabelText("LAST NAME")).toBeInTheDocument();
      expect(screen.getByLabelText("USERNAME")).toBeInTheDocument();
      expect(screen.getByLabelText("PASSWORD")).toBeInTheDocument();
      expect(screen.getByLabelText("CONFIRM PASSWORD")).toBeInTheDocument();
      expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("renders the form input empty", () => {
      renderSignUp(EMPTY_USER);

      expect(screen.getByLabelText("FIRST NAME")).toHaveValue("");
      expect(screen.getByLabelText("LAST NAME")).toHaveValue("");
      expect(screen.getByLabelText("USERNAME")).toHaveValue("");
      expect(screen.getByLabelText("PASSWORD")).toHaveValue("");
      expect(screen.getByLabelText("CONFIRM PASSWORD")).toHaveValue("");
    });

    it("calls the signup service when the submit button is clicked", async () => {
      const alertMock = jest
        .spyOn(window, "alert")
        .mockImplementation((text) => true);

      renderSignUp(EMPTY_USER);
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText("FIRST NAME"),
          USER_USER_INFO.firstName
        );
        await userEvent.type(
          screen.getByLabelText("LAST NAME"),
          USER_USER_INFO.lastName
        );

        await userEvent.type(
          screen.getByLabelText("USERNAME"),
          USER_USER_INFO.username
        );
        await userEvent.type(
          screen.getByLabelText("PASSWORD"),
          USER_USER_INFO.password
        );
        await userEvent.type(
          screen.getByLabelText("CONFIRM PASSWORD"),
          USER_USER_INFO.password
        );

        await userEvent.click(screen.getByText("Submit"));
      });

      expect(mockSignup).toHaveBeenCalledWith({
        username: USER_USER_INFO.username,
        password: USER_USER_INFO.password,
        firstname: USER_USER_INFO.firstName,
        lastname: USER_USER_INFO.lastName,
      });

      expect(alertMock).toHaveBeenCalledWith(
        "Your account will soon be created"
      );
    });

    it("displays an error message when not all fields are filled", async () => {
      renderSignUp(EMPTY_USER);

      await act(async () => {
        await userEvent.type(
          screen.getByLabelText("FIRST NAME"),
          USER_USER_INFO.firstName
        );
        await userEvent.type(
          screen.getByLabelText("LAST NAME"),
          USER_USER_INFO.lastName
        );

        await userEvent.type(
          screen.getByLabelText("PASSWORD"),
          USER_USER_INFO.password
        );
        await userEvent.type(
          screen.getByLabelText("CONFIRM PASSWORD"),
          USER_USER_INFO.password
        );

        await userEvent.click(screen.getByText("Submit"));
      });

      expect(screen.getByText("Please fill all fields")).toBeInTheDocument();
    });

    it("displays error message when signup unsuccessful", async () => {
      mockSignup.mockReturnValue(Promise.resolve({ error: "error" }));

      renderSignUp(EMPTY_USER);
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText("FIRST NAME"),
          USER_USER_INFO.firstName
        );
        await userEvent.type(
          screen.getByLabelText("LAST NAME"),
          USER_USER_INFO.lastName
        );

        await userEvent.type(
          screen.getByLabelText("USERNAME"),
          USER_USER_INFO.username
        );
        await userEvent.type(
          screen.getByLabelText("PASSWORD"),
          USER_USER_INFO.password
        );
        await userEvent.type(
          screen.getByLabelText("CONFIRM PASSWORD"),
          USER_USER_INFO.password
        );

        await userEvent.click(screen.getByText("Submit"));
      });

      expect(
        screen.getByText(
          "Failed To Process Your Registration Please Try Again Later"
        )
      ).toBeInTheDocument();
    });

    it("displays unauthorized message when signup unauthorized", async () => {
      mockSignup.mockReturnValue(Promise.resolve({ code: 401 }));

      renderSignUp(EMPTY_USER);
      await act(async () => {
        await userEvent.type(
          screen.getByLabelText("FIRST NAME"),
          USER_USER_INFO.firstName
        );
        await userEvent.type(
          screen.getByLabelText("LAST NAME"),
          USER_USER_INFO.lastName
        );

        await userEvent.type(
          screen.getByLabelText("USERNAME"),
          USER_USER_INFO.username
        );
        await userEvent.type(
          screen.getByLabelText("PASSWORD"),
          USER_USER_INFO.password
        );
        await userEvent.type(
          screen.getByLabelText("CONFIRM PASSWORD"),
          USER_USER_INFO.password
        );

        await userEvent.click(screen.getByText("Submit"));
      });

      expect(screen.getByText("Unauthorized Sign Up.")).toBeInTheDocument();
    });
  });
});
