import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AdminPanel from "../components/pages/AdminPanel.js";
import { UserProvider } from "../auth/UserProvider.js";

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

const fetchusersResult = [ADMIN_USER_INFO, USER_USER_INFO];

const fetchuserPromise = Promise.resolve(fetchusersResult);
const enableAccountPromise = Promise.resolve();
const mockChangeAccountRolePromise = Promise.resolve();

const mockFetchuser = jest.fn();
const mockEnableAccount = jest.fn();
const mockChangeAccountRole = jest.fn();
jest.mock("../service/AdminPanel/AdminPanel", () => ({
  fetchuser: (jwt) => mockFetchuser(jwt),
  enableAccount: (username, jwt) => mockEnableAccount(username, jwt),
  changeAccountRole: (username, role, jwt) =>
    mockChangeAccountRole(username, role, jwt),
}));

function renderAdminPanel(user, users = fetchusersResult) {
  return render(
    <UserProvider user={user}>
      <AdminPanel users={users} />
    </UserProvider>
  );
}

describe("AdminPanel", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockFetchuser.mockReturnValue(fetchuserPromise);
    mockEnableAccount.mockReturnValue(enableAccountPromise);
    mockChangeAccountRole.mockReturnValue(mockChangeAccountRolePromise);
  });

  describe("List of Users", () => {
    it("renders a list of users", async () => {
      renderAdminPanel(ADMIN_USER, [...fetchusersResult, USER_USER]);
      await act(async () => {
        await fetchuserPromise;
      });
      expect(
        screen.getByText(fetchusersResult[0].firstName)
      ).toBeInTheDocument();
      expect(
        screen.getByText(fetchusersResult[1].firstName)
      ).toBeInTheDocument();
    });
  });

  describe("Change Role", () => {
    it("allows Admin to change user roles", async () => {
      jest.spyOn(React, "useEffect").mockImplementation((f) => f());

      renderAdminPanel(ADMIN_USER);
      await act(() => fetchuserPromise);

      const select = screen.getAllByDisplayValue("Open this select menu")[0];

      userEvent.selectOptions(select, "ROLE_USER");
      expect(mockChangeAccountRole).toBeCalledWith(
        fetchusersResult[0].username,
        "ROLE_USER",
        ADMIN_USER.jwt
      );
    });

    // TODO
    // test in other file?
    // test that user can't access admin panel if not admin
    // test("User cannot change user roles", async () => {
    //   renderAdminPanel(USER_USER);
    //   await act(() => fetchuserPromise);
    //   expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    //   expect(screen.getByText(/Last Name/i)).toBeInTheDocument();

    //   expect(screen.getByText(/Smith/i)).toBeInTheDocument();
    // });

    // test('Non-signed in users cannot change user roles', async () => {
    //     renderAdminPanel(EMPTY_USER, []);
    //     expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    // });
  });

  describe("Enable User", () => {
    it("allows Admin to enable user", async () => {
      mockEnableAccount.mockReturnValue(enableAccountPromise);

      renderAdminPanel(ADMIN_USER);
      await act(() => fetchuserPromise);
      expect(screen.getAllByText(/Enable User/i)[0]).toBeInTheDocument();
      // click enable user
      act(() => {
        screen.getAllByText(/Enable User/i)[0].click();
      });
      // wait for promise to resolve
      await act(() => enableAccountPromise);

      // check that user is enabled
      expect(screen.getByText(/Enabled/i)).toBeInTheDocument();
    });
  });
});
