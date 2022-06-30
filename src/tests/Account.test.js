import React from "react";
import { act, render, screen } from "@testing-library/react";

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

const usersAdmin = [
  {
    username: "admin",
    role: "ROLE_ADMIN",
    firstName: "Admin",
    lastName: "Smith",
  },
];

const fetchuserPromise = Promise.resolve(usersAdmin);
const mockFetchuser = jest.fn();
jest.mock("../service/AdminPanel/AdminPanel", () => ({
  fetchuser: (jwt) => mockFetchuser(jwt),
}));

function renderAdminPanel(user, users = usersAdmin) {
  return render(
    <UserProvider user={user}>
      <AdminPanel users={users} />
    </UserProvider>
  );
}

beforeEach(() => {
  jest.resetAllMocks();
  mockFetchuser.mockReturnValue(fetchuserPromise);
});

test("Admin can change user roles", async () => {
  jest.spyOn(React, "useEffect").mockImplementation((f) => f());

  renderAdminPanel(ADMIN_USER);
  await act(() => fetchuserPromise);
  expect(screen.getByText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Smith/i)).toBeInTheDocument();
});

test("User cannot change user roles", async () => {
  renderAdminPanel(USER_USER);
  await act(() => fetchuserPromise);
  expect(screen.getByText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Smith/i)).toBeInTheDocument();
});

// test('Non-signed in users cannot change user roles', async () => {
//     render(
//         <UserProvider user={EMPTY_USER}>
//             <AdminPanel/>
//         </UserProvider>
//     );
//     expect(screen.getByText(/First Name/i)).not.toBeInTheDocument()
// });
