import React from "react";
import { act, render, screen, prettyDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserProvider } from "../auth/UserProvider.js";
import UserAccount from "../components/pages/UserAccount.js";

const USER = {
  username: "user",
  jwt: "abc",
  role: "ROLE_USER",
};

const changePasswordPromise = Promise.resolve("OK");
const mockChangePassword = jest.fn();
jest.mock("../service/Users/PasswordManager", () => ({
  changePassword: (newPassword, token) =>
    mockChangePassword(newPassword, token),
}));

function getFormInputs(screen) {
  return {
    newPassword: screen.getByLabelText("New Password"),
    confirmPassword: screen.getByLabelText("Confirm Password"),
  };
}

function wrappedRender(component, user) {
  return render(<UserProvider user={user}>{component}</UserProvider>);
}

async function changePassword(newPass, token) {
  const { newPassword, confirmPassword } = getFormInputs(screen);

  userEvent.type(newPassword, newPass);
  userEvent.type(confirmPassword, newPass);
  await act(async () => {
    await userEvent.click(screen.getByText("Submit"));
  });
  expect(mockChangePassword).toHaveBeenCalledWith(newPass, token);
}

describe("UserAccount", () => {
  it("renders the page", () => {
    const { container } = wrappedRender(<UserAccount />, USER);

    expect(screen.getByText(`Hello, ${USER.username}`)).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
    expect(screen.getByText("Change Password")).toBeInTheDocument();
  });

  describe("change password form", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockChangePassword.mockReturnValue(changePasswordPromise);
    });

    it("renders the form", () => {
      const { container } = wrappedRender(<UserAccount />, USER);

      const { newPassword, confirmPassword } = getFormInputs(screen);

      expect(screen.getByText("Change Password")).toBeInTheDocument();
      expect(newPassword).toBeInTheDocument();
      expect(confirmPassword).toBeInTheDocument();
      expect(
        container.querySelector("button[type='submit']")
      ).toBeInTheDocument();
    });

    it("calls changePassword when form is submitted", async () => {
      wrappedRender(<UserAccount />, USER);

      await changePassword("12345678", USER.jwt);

      expect(
        screen.getByText("Password changed successfully!")
      ).toBeInTheDocument();
    });

    it("shows error message when changePassword fails", async () => {
      mockChangePassword.mockReturnValue(Promise.reject());
      wrappedRender(<UserAccount />, USER);

      await changePassword("12345678", USER.jwt);

      expect(
        screen.getByText("Password change failed. Please try again later.")
      ).toBeInTheDocument();
    });

    it("shows error message when newPassword is empty", async () => {
      wrappedRender(<UserAccount />, USER);
      const { newPassword, confirmPassword } = getFormInputs(screen);

      userEvent.type(confirmPassword, "12345678");

      await act(async () => {
        await userEvent.click(screen.getByText("Submit"));
      });

      expect(mockChangePassword).not.toHaveBeenCalled();

      expect(newPassword).toHaveClass("is-invalid");
      expect(
        screen.getByText("Please fill in all fields.")
      ).toBeInTheDocument();
    });

    it("shows error message when confirmPassword is empty", async () => {
      wrappedRender(<UserAccount />, USER);

      const { newPassword, confirmPassword } = getFormInputs(screen);

      userEvent.type(newPassword, "12345678");

      await act(async () => {
        await userEvent.click(screen.getByText("Submit"));
      });

      expect(mockChangePassword).not.toHaveBeenCalled();

      expect(confirmPassword).toHaveClass("is-invalid");
      expect(
        screen.getByText("Please fill in all fields.")
      ).toBeInTheDocument();
    });

    it("shows error message when newPassword is too short", async () => {
      wrappedRender(<UserAccount />, USER);
      const { newPassword, confirmPassword } = getFormInputs(screen);

      userEvent.type(newPassword, "123");
      userEvent.type(confirmPassword, "123");

      await act(async () => {
        await userEvent.click(screen.getByText("Submit"));
      });

      expect(mockChangePassword).not.toHaveBeenCalled();

      expect(newPassword).toHaveClass("is-invalid");
      expect(
        screen.getByText(
          "Password is too weak. It must be at least 8 characters long."
        )
      ).toBeInTheDocument();
    });

    it("shows error message when passwords do not match", async () => {
      wrappedRender(<UserAccount />, USER);
      const { newPassword, confirmPassword } = getFormInputs(screen);

      userEvent.type(newPassword, "12345678");
      userEvent.type(confirmPassword, "1234567");

      await act(async () => {
        await userEvent.click(screen.getByText("Submit"));
      });

      expect(mockChangePassword).not.toHaveBeenCalled();

      expect(confirmPassword).toHaveClass("is-invalid");
      expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    });
  });
});
