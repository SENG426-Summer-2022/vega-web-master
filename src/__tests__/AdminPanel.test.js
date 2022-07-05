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
    role: { authority: "ROLE_ADMIN"},
    enabled: false,
  firstName: "Vince",
  lastName: "Vaughn",
};

const STAFF_USER_INFO = {
  username: "staff",
  role: { authority: "ROLE_STAFF"},
  enabled: true,
  firstName: "Vince",
  lastName: "Vaughn",
};

const USER_USER_INFO = {
  username: "user",
  role: { authority: "ROLE_USER" },
  enabled: false,
  firstName: "Roy",
  lastName: "O'Bannon",
};

const fetchusersResult = [STAFF_USER_INFO, USER_USER_INFO];

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

async function renderAdminPanel(user, users = fetchusersResult) {
    render(
    <UserProvider user={user}>
      <AdminPanel users={users} />
    </UserProvider>
    );
    return await act(async () => {
        await fetchuserPromise;
    });
}

describe("AdminPanel", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockFetchuser.mockReturnValue(fetchuserPromise);
    mockEnableAccount.mockReturnValue(enableAccountPromise);
    mockChangeAccountRole.mockReturnValue(mockChangeAccountRolePromise);
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());
  });

  describe("List of Users", () => {
    it("renders a list of users", async () => {
      await renderAdminPanel(ADMIN_USER, [...fetchusersResult, USER_USER]);
      expect(
        screen.getByText(fetchusersResult[0].firstName)
      ).toBeInTheDocument();
      expect(
        screen.getByText(fetchusersResult[1].firstName)
      ).toBeInTheDocument();
    });
    it("renders a list with no users", async () => {
      await renderAdminPanel(ADMIN_USER, []);
      expect(
          screen.getByText("First Name")
      ).toBeInTheDocument();
      expect(
          screen.getByText("Last Name")
      ).toBeInTheDocument();
    });
  });
  describe("Change Role", () => {
    it("allows Admin to change staff to user", async () => {
      await renderAdminPanel(ADMIN_USER, fetchusersResult);
      
      const user = fetchusersResult.find((x) => x.role.authority == "ROLE_STAFF");
      const select = screen.getAllByDisplayValue("STAFF")[0];
      
      userEvent.selectOptions(select, "ROLE_USER");
      expect(mockChangeAccountRole).toBeCalledWith(
        user.username,
        "ROLE_USER",
        ADMIN_USER.jwt
      );
    });
    it("allows Admin to change user to staff", async () => {
      await renderAdminPanel(ADMIN_USER, fetchusersResult);

      const user = fetchusersResult.find((x) => x.role.authority == "ROLE_USER");
      const select = screen.getAllByDisplayValue("USER")[0];
      
      userEvent.selectOptions(select, "ROLE_STAFF");
      expect(mockChangeAccountRole).toBeCalledWith(
        user.username,
        "ROLE_STAFF",
        ADMIN_USER.jwt
      );
  });
});

  describe("Enable User", () => {
    it("allows Admin to enable user", async () => {
      mockEnableAccount.mockReturnValue(enableAccountPromise);
      await renderAdminPanel(ADMIN_USER, fetchusersResult);

      expect(screen.getAllByText(/Enable User/i)[0]).toBeInTheDocument();
      // click enable user
      act(() => {
        screen.getAllByText(/Enable User/i)[0].click();
      });

      // check that user is enabled
      expect(screen.getByText(/Disable User/i)).toBeInTheDocument();
    });
  });
});
