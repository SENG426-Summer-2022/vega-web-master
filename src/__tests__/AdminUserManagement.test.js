import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserProvider } from "../auth/UserProvider.js";
import AdminUserManagement from "../components/pages/AdminUserManagement.js";

const ADMIN_USER = {
  username: "admin",
  firstName: "Admin",
  lastName: "User",
  jwt: "eyabc",
  role: "ROLE_ADMIN",
};

const USER_USER = {
  username: "user",
  jwt: "blah",
  role: "ROLE_USER",
};

const STAFF_USER = {
  username: "staff",
  jwt: "blah",
  role: "ROLE_STAFF",
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

const deleteAccountPromise = Promise.resolve({ status: "OK" });
const updateUserPromise = Promise.resolve({ status: "OK" });

const mockDeleteAccount = jest.fn();
const mockUpdateUser = jest.fn();
jest.mock("../service/AdminPanel/AdminPanel", () => ({
  deleteAccount: (username, token) => mockDeleteAccount(username, token),
  updateUser: (data, token) => mockUpdateUser(data, token),
}));

function renderAdminUserManagement(user) {
  // set location state
  const location = {
    state: {
      ...user,
    },
  };

  return render(
    <UserProvider user={user}>
      <AdminUserManagement location={location} />
    </UserProvider>
  );
}

function getFormInputs() {
  return {
    username: screen.getByLabelText("Username"),
    firstName: screen.getByLabelText("First Name"),
    lastName: screen.getByLabelText("Last Name"),
  };
}

async function inputNewValues(formInputs, newValues) {
  // await userEvents
  await act(async () => {
    await userEvent.click(screen.getByText("Edit User"));

    await userEvent.clear(formInputs.username);
    await userEvent.clear(formInputs.firstName);
    await userEvent.clear(formInputs.lastName);

    await userEvent.type(formInputs.username, newValues.username);
    await userEvent.type(formInputs.firstName, newValues.firstName);
    await userEvent.type(formInputs.lastName, newValues.lastName);
  });
}

describe("AdminUserManagement", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockDeleteAccount.mockReturnValue(deleteAccountPromise);
    mockUpdateUser.mockReturnValue(updateUserPromise);
  });

  describe("as admin", () => {
    it("renders the page", () => {
      renderAdminUserManagement(ADMIN_USER);

      expect(screen.getByText("User Management")).toBeInTheDocument();
    });

    describe("delete user", () => {
      it("renders the delete user button", () => {
        renderAdminUserManagement(ADMIN_USER);

        expect(screen.getByText("Delete User")).toBeInTheDocument();
      });

      it("displays a confirmation when the delete user button is clicked", async () => {
        renderAdminUserManagement(ADMIN_USER);

        await act(async () => {
          await userEvent.click(screen.getByText("Delete User"));
        });

        expect(screen.getByText("Confirm")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
      });

      it("calls deleteUser when the Confirm button is clicked", async () => {
        renderAdminUserManagement(ADMIN_USER);

        await act(async () => {
          await userEvent.click(screen.getByText("Delete User"));
          await userEvent.click(screen.getByText("Confirm"));
        });

        expect(mockDeleteAccount).toHaveBeenCalledWith(
          ADMIN_USER.username,
          ADMIN_USER.jwt
        );
      });

      it("displays success message when user is deleted", async () => {
        renderAdminUserManagement(ADMIN_USER);

        await act(async () => {
          await userEvent.click(screen.getByText("Delete User"));
          await userEvent.click(screen.getByText("Confirm"));
        });

        expect(
          screen.getByText("User deleted successfully.")
        ).toBeInTheDocument();
      });

      it("displays a Return to Admin Panel button when deletion is successful", async () => {
        renderAdminUserManagement(ADMIN_USER);

        await act(async () => {
          await userEvent.click(screen.getByText("Delete User"));
          await userEvent.click(screen.getByText("Confirm"));
        });

        expect(screen.getByText("Return to Admin Panel")).toBeInTheDocument();
      });

      it("displays an error message when deletion is unsuccessful", async () => {
        mockDeleteAccount.mockReturnValue(Promise.reject({}));

        renderAdminUserManagement(ADMIN_USER);

        await act(async () => {
          await userEvent.click(screen.getByText("Delete User"));
          await userEvent.click(screen.getByText("Confirm"));
        });

        expect(
          screen.getByText(
            "User deletion was not successful. Please try again later."
          )
        ).toBeInTheDocument();
      });

      it("does not call deleteUser when Cancel button is clicked", async () => {
        renderAdminUserManagement(ADMIN_USER);

        await act(async () => {
          await userEvent.click(screen.getByText("Delete User"));
          await userEvent.click(screen.getByText("Cancel"));
        });

        expect(mockDeleteAccount).not.toHaveBeenCalled();
      });

      it("reverts back to default view when Cancel button is clicked", async () => {
        renderAdminUserManagement(ADMIN_USER);

        await act(async () => {
          await userEvent.click(screen.getByText("Delete User"));
          await userEvent.click(screen.getByText("Cancel"));
        });

        expect(screen.getByText("User Management")).toBeInTheDocument();
        expect(screen.getByText("Delete User")).toBeInTheDocument();
      });
    });

    describe("edit user form", () => {
      it("renders the form", async () => {
        renderAdminUserManagement(ADMIN_USER);

        const { firstName, lastName, username } = getFormInputs();

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(username).toBeInTheDocument();
      });

      it("renders the form as disabled by default", () => {
        renderAdminUserManagement(ADMIN_USER);

        const { firstName, lastName, username } = getFormInputs();

        expect(firstName).toBeDisabled();
        expect(lastName).toBeDisabled();
        expect(username).toBeDisabled();
      });

      it("renders the form with correct values", () => {
        renderAdminUserManagement(ADMIN_USER);

        const { firstName, lastName, username } = getFormInputs();

        expect(firstName.value).toBe(ADMIN_USER.firstName);
        expect(lastName.value).toBe(ADMIN_USER.lastName);
        expect(username.value).toBe(ADMIN_USER.username);
      });

      it("enables the form when Edit User button is clicked", async () => {
        renderAdminUserManagement(ADMIN_USER);

        await act(async () => {
          await userEvent.click(screen.getByText("Edit User"));
        });

        const { firstName, lastName, username } = getFormInputs();

        expect(firstName).not.toBeDisabled();
        expect(lastName).not.toBeDisabled();
        expect(username).not.toBeDisabled();
      });

      it("disables the enabled form when Cancel button is clicked", async () => {
        renderAdminUserManagement(ADMIN_USER);

        await act(async () => {
          await userEvent.click(screen.getByText("Edit User"));
          await userEvent.click(screen.getByText("Cancel"));
        });

        const { firstName, lastName, username } = getFormInputs();

        expect(firstName).toBeDisabled();
        expect(lastName).toBeDisabled();
        expect(username).toBeDisabled();
      });

      it("displays changes in the inputs for an enabled form", async () => {
        renderAdminUserManagement(ADMIN_USER);

        const { firstName, lastName, username } = getFormInputs();

        await inputNewValues(
          { firstName, lastName, username },
          {
            firstName: "newFirstName",
            lastName: "newLastName",
            username: "newUsername@s.com",
          }
        );

        expect(firstName.value).toBe("newFirstName");
        expect(lastName.value).toBe("newLastName");
        expect(username.value).toBe("newUsername@s.com");
      });

      it("reverts any changes in the form when Cancel button is clicked", async () => {
        renderAdminUserManagement(ADMIN_USER);

        const { firstName, lastName, username } = getFormInputs();

        await act(async () => {
          await userEvent.click(screen.getByText("Edit User"));

          await userEvent.type(firstName, "newFirstName");
          await userEvent.type(lastName, "newLastName");
          await userEvent.type(username, "newUsername@s");

          await userEvent.click(screen.getByText("Cancel"));
        });

        expect(firstName.value).toBe(ADMIN_USER.firstName);
        expect(lastName.value).toBe(ADMIN_USER.lastName);
        expect(username.value).toBe(ADMIN_USER.username);
      });

      it("displays an error message when username is empty", async () => {
        renderAdminUserManagement(ADMIN_USER);

        const { username } = getFormInputs();

        await act(async () => {
          await userEvent.click(screen.getByText("Edit User"));

          await userEvent.clear(username);

          await userEvent.click(screen.getByText("Save"));
        });

        expect(
          screen.getByText("Please enter a username.")
        ).toBeInTheDocument();
      });

      it("displays an error message when username is invalid", async () => {
        renderAdminUserManagement(ADMIN_USER);

        const { username } = getFormInputs();

        await act(async () => {
          await userEvent.click(screen.getByText("Edit User"));

          await userEvent.type(username, "invalidUsername");

          await userEvent.click(screen.getByText("Save"));
        });

        expect(
          screen.getByText("Please enter a valid email address.")
        ).toBeInTheDocument();
      });

      it("calls updateUser with the correct data when the form is submitted", async () => {
        renderAdminUserManagement(ADMIN_USER);

        const { firstName, lastName, username } = getFormInputs();

        await inputNewValues(
          { firstName, lastName, username },
          {
            firstName: "newFirstName",
            lastName: "newLastName",
            username: "newUsername@user.com",
          }
        );

        await act(async () => {
          await userEvent.click(screen.getByText("Save"));
        });

        expect(mockUpdateUser).toHaveBeenCalledWith(
          {
            username: ADMIN_USER_INFO.username,
            firstName: "newFirstName",
            lastName: "newLastName",
            newusername: "newUsername@user.com",
          },
          ADMIN_USER.jwt
        );
      });

      it("shows a success message when the form is successfully submitted", async () => {
        renderAdminUserManagement(ADMIN_USER);

        const { firstName, lastName, username } = getFormInputs();

        await inputNewValues(
          { firstName, lastName, username },
          {
            firstName: "newFirstName",
            lastName: "newLastName",
            username: "newUsername@user.com",
          }
        );

        await act(async () => {
          await userEvent.click(screen.getByText("Save"));
        });

        expect(
          screen.getByText("User updated successfully!")
        ).toBeInTheDocument();
      });

      it("disables the form with the updated values when the form is successfully submitted", async () => {
        renderAdminUserManagement(ADMIN_USER);

        const { firstName, lastName, username } = getFormInputs();

        await inputNewValues(
          { firstName, lastName, username },
          {
            firstName: "newFirstName",
            lastName: "newLastName",
            username: "newUsername@user.com",
          }
        );

        await act(async () => {
          await userEvent.click(screen.getByText("Save"));
        });

        expect(firstName).toBeDisabled();
        expect(lastName).toBeDisabled();
        expect(username).toBeDisabled();

        expect(firstName.value).toBe("newFirstName");
        expect(lastName.value).toBe("newLastName");
        expect(username.value).toBe("newUsername@user.com");

        expect(screen.getByText("Edit User")).toBeInTheDocument();
      });

      it("displays an error message when the form submits unsuccessfully", async () => {
        renderAdminUserManagement(ADMIN_USER);
        mockUpdateUser.mockRejectedValue(new Error("Error updating user"));

        const { firstName, lastName, username } = getFormInputs();

        await inputNewValues(
          { firstName, lastName, username },
          {
            firstName: "newFirstName",
            lastName: "newLastName",
            username: "newUsername@user.com",
          }
        );

        await act(async () => {
          userEvent.click(screen.getByText("Save"));
        });

        expect(
          screen.getByText("User update failed. Please try again later.")
        ).toBeInTheDocument();
      });

      it("keeps the form enabled and populated when the form submits unsuccessfully", async () => {
        renderAdminUserManagement(ADMIN_USER);
        mockUpdateUser.mockRejectedValue(new Error("Error updating user"));

        const { firstName, lastName, username } = getFormInputs();

        await inputNewValues(
          { firstName, lastName, username },
          {
            firstName: "newFirstName",
            lastName: "newLastName",
            username: "newUsername@user.com",
          }
        );

        await act(async () => {
          await userEvent.click(screen.getByText("Save"));
        });

        // expect values to still be set
        expect(screen.getByLabelText("First Name").value).toBe("newFirstName");
        expect(screen.getByLabelText("Last Name").value).toBe("newLastName");
        expect(screen.getByLabelText("Username").value).toBe(
          "newUsername@user.com"
        );

        //expect form to be enabled
        expect(screen.getByLabelText("First Name")).not.toBeDisabled();
        expect(screen.getByLabelText("Last Name")).not.toBeDisabled();
        expect(screen.getByLabelText("Username")).not.toBeDisabled();
      });
    });
  });

  describe("as staff", () => {
    it("does not render the page", () => {
      renderAdminUserManagement(STAFF_USER);

      expect(
        screen.queryByText("You are not authorized to access this page.")
      ).toBeInTheDocument();
    });
  });

  describe("as user", () => {
    it("does not render the page", () => {
      renderAdminUserManagement(USER_USER);

      expect(
        screen.queryByText("You are not authorized to access this page.")
      ).toBeInTheDocument();
    });
  });
});
