import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserProvider } from "../auth/UserProvider.js";
import SignUp from "../components/pages/SignUp.js";

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

const signupPromise = Promise.resolve(USER_USER_INFO);
const mockSignup = jest.fn();
jest.mock("../service/auth/AuthenticationManager", () => ({
  signup: (userData) => mockSignup(userData),
}));

function renderSignUp(user) {
  return render(
    <UserProvider user={user}>
      <SignUp />
    </UserProvider>
  );
}

describe("SignUp", () => {
  describe("when the user is not logged in", () => {
    it("renders the SignUp page", () => {
      renderSignUp(EMPTY_USER);
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });
  });
});
