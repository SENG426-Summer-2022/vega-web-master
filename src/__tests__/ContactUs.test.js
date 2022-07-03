import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserProvider } from "../auth/UserProvider.js";
import ContactUs from "../components/pages/ContactUs.js";

function getFormFields(screen) {
  return {
    name: screen.getByLabelText("NAME"),
    email: screen.getByLabelText("EMAIL"),
    message: screen.getByLabelText("MESSAGE"),
    submit: screen.getByText("Submit"),
  };
}

const EMPTY_USER = {
  username: "",
  jwt: "",
  role: "",
};

const USER_MESSAGE = {
  name: "John Doe",
  email: "john@doe.com",
  message: "This is a test message",
};

const sendMessagePromise = Promise.resolve({ success: true });
const mockSendMessage = jest.fn();
jest.mock("../service/ContactUs/ContactService", () => ({
  sendMessage: (name, email, message) => mockSendMessage(name, email, message),
}));

function wrappedRender(component, user) {
  return render(<UserProvider user={user}>{component}</UserProvider>);
}

describe("Contact Us", () => {
  describe("form", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockSendMessage.mockReturnValue(sendMessagePromise);
    });

    it("renders the Contact Us page", () => {
      wrappedRender(<ContactUs />, EMPTY_USER);

      expect(screen.getByText("Contact Us")).toBeInTheDocument();
    });

    it("renders contact us form", () => {
      const { container } = wrappedRender(<ContactUs />, EMPTY_USER);

      expect(container.querySelector("form")).toBeInTheDocument();
      expect(screen.getByText("NAME")).toBeInTheDocument();
      expect(screen.getByText("EMAIL")).toBeInTheDocument();
      expect(screen.getByText("MESSAGE")).toBeInTheDocument();
      expect(
        container.querySelector("button[type='submit']")
      ).toBeInTheDocument();
    });

    it("calls sendMessage when form is submitted", async () => {
      wrappedRender(<ContactUs />, EMPTY_USER);

      await act(async () => {
        await userEvent.type(screen.getByLabelText("NAME"), USER_MESSAGE.name);
        await userEvent.type(
          screen.getByLabelText("EMAIL"),
          USER_MESSAGE.email
        );
        await userEvent.type(
          screen.getByLabelText("MESSAGE"),
          USER_MESSAGE.message
        );
        await userEvent.click(screen.getByText("Submit"));
      });

      expect(mockSendMessage).toHaveBeenCalledWith(
        USER_MESSAGE.name,
        USER_MESSAGE.email,
        USER_MESSAGE.message
      );
    });

    it("displays error message when name field is unfilled", async () => {
      wrappedRender(<ContactUs />, EMPTY_USER);

      const { email, message, submit } = getFormFields(screen);

      await act(async () => {
        await userEvent.type(email, USER_MESSAGE.email);
        await userEvent.type(message, USER_MESSAGE.message);
        await userEvent.click(submit);
      });

      expect(
        screen.getByText("Please provide your name. Only letters are allowed.")
      ).toBeInTheDocument();
    });

    it("displays error message when email field is unfilled", async () => {
      wrappedRender(<ContactUs />, EMPTY_USER);

      const { name, message, submit } = getFormFields(screen);

      await act(async () => {
        await userEvent.type(name, USER_MESSAGE.name);
        await userEvent.type(message, USER_MESSAGE.message);

        await userEvent.click(submit);
      });

      expect(
        screen.getByText("Please provide your email.")
      ).toBeInTheDocument();
    });

    it("displays error message when message field is unfilled", async () => {
      wrappedRender(<ContactUs />, EMPTY_USER);

      const { name, email, submit } = getFormFields(screen);

      await act(async () => {
        await userEvent.type(email, USER_MESSAGE.email);
        await userEvent.type(name, USER_MESSAGE.name);

        await userEvent.click(submit);
      });

      expect(
        screen.getByText("Please provide a message. Max 1000 characters.")
      ).toBeInTheDocument();
    });

    it("displays error message when message is too long", async () => {
      wrappedRender(<ContactUs />, EMPTY_USER);

      const { name, email, message, submit } = getFormFields(screen);

      await act(async () => {
        await userEvent.type(email, USER_MESSAGE.email);
        await userEvent.type(name, USER_MESSAGE.name);
        await userEvent.type(message, "a".repeat(1001));

        await userEvent.click(submit);
      });

      expect(
        screen.getByText("Please provide a message. Max 1000 characters.")
      ).toBeInTheDocument();
    });

    it("displays error message when email is invalid", async () => {
      wrappedRender(<ContactUs />, EMPTY_USER);

      const { email, submit } = getFormFields(screen);

      await act(async () => {
        await userEvent.type(email, "invalid email");

        await userEvent.click(submit);
      });

      expect(
        screen.getByText("Please provide your email.")
      ).toBeInTheDocument();
    });

    it("displays error messages when all fields are unfilled", async () => {
      wrappedRender(<ContactUs />, EMPTY_USER);

      const { submit } = getFormFields(screen);

      await act(async () => {
        await userEvent.click(submit);
      });

      expect(
        screen.getByText("Please provide your name. Only letters are allowed.")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Please provide your email.")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Please provide a message. Max 1000 characters.")
      ).toBeInTheDocument();
    });

    it("displays error message when message failed to send", async () => {
      mockSendMessage.mockReturnValue(Promise.resolve({ error: "error" }));

      wrappedRender(<ContactUs />, EMPTY_USER);

      const { name, email, message, submit } = getFormFields(screen);

      await act(async () => {
        await userEvent.type(email, USER_MESSAGE.email);
        await userEvent.type(name, USER_MESSAGE.name);
        await userEvent.type(message, USER_MESSAGE.message);

        await userEvent.click(submit);
      });

      expect(
        screen.getByText("Something went wrong. Please try again later.")
      ).toBeInTheDocument();
    });

    it("displays success message when message sends", async () => {
      mockSendMessage.mockReturnValue(Promise.resolve({ success: true }));

      wrappedRender(<ContactUs />, EMPTY_USER);

      const name = screen.getByLabelText("NAME");
      const email = screen.getByLabelText("EMAIL");
      const message = screen.getByLabelText("MESSAGE");
      const submit = screen.getByText("Submit");

      await act(async () => {
        await userEvent.type(email, USER_MESSAGE.email);
        await userEvent.type(name, USER_MESSAGE.name);
        await userEvent.type(message, USER_MESSAGE.message);
        await userEvent.click(submit);
      });

      expect(
        screen.getByText(
          "Your message has been sent. We will get back to you soon."
        )
      ).toBeInTheDocument();
    });
  });
});
