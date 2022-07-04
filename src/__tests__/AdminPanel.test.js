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

// const ADMIN_USER_INFO = {
//   username: "admin",
//     role: { authority: "ROLE_ADMIN"},
//     enabled: false,
//   firstName: "Vince",
//   lastName: "Vaughn",
// };

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
    it("renders a list with no users", async () => {
      renderAdminPanel(ADMIN_USER, []);
      await act(async () => {
        await fetchuserPromise;
      });
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
      jest.spyOn(React, "useEffect").mockImplementation((f) => f());

      renderAdminPanel(ADMIN_USER, fetchusersResult);
      await act(async () => {
        await fetchuserPromise;
      });
      
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
      jest.spyOn(React, "useEffect").mockImplementation((f) => f());

      renderAdminPanel(ADMIN_USER, fetchusersResult);
      await act(async () => {
        await fetchuserPromise;
      });

      const user = fetchusersResult.find((x) => x.role.authority == "ROLE_USER");
      const select = screen.getAllByDisplayValue("USER")[0];
      
      userEvent.selectOptions(select, "ROLE_STAFF");
      expect(mockChangeAccountRole).toBeCalledWith(
        user.username,
        "ROLE_STAFF",
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
      jest.spyOn(React, "useEffect").mockImplementation((f) => f());
      mockEnableAccount.mockReturnValue(enableAccountPromise);
      renderAdminPanel(ADMIN_USER, fetchusersResult);
      await act(async () => {
        await fetchuserPromise;
      });

      expect(screen.getAllByText(/Enable User/i)[0]).toBeInTheDocument();
      // click enable user
      act(() => {
        screen.getAllByText(/Enable User/i)[0].click();
      });
      // wait for promise to resolve
      await act(() => enableAccountPromise);

      // check that user is enabled
      expect(screen.getByText(/Disable User/i)).toBeInTheDocument();
    });
  });
});
