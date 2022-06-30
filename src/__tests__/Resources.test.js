import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UserProvider } from "../auth/UserProvider.js";
import Resources from "../components/pages/Resources.js";

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

const STAFF_USER = {
  username: "staff",
  jwt: "blah",
  role: "ROLE_STAFF",
};

const fetchFilesResult = ["file1.txt", "file2.txt", "file3.txt"];
const fetchDataResult = "data";

const fileUploaderPromise = Promise.resolve({});
const fetchFilesPromise = Promise.resolve(fetchFilesResult);
const fetchDataPromise = Promise.resolve(fetchDataResult);
const mockFetchData = jest.fn();
const mockFetchFiles = jest.fn();
const mockFileUploader = jest.fn();

jest.mock("../service/FileUpload/FileUploader", () => ({
  fileUploader: (fileInfo, token) => mockFileUploader(fileInfo, token),
  fetchFiles: (token) => mockFetchFiles(token),
  fetchData: (name, token) => mockFetchData(name, token),
}));

function wrappedRender(children, user) {
  return render(<UserProvider user={user}>{children}</UserProvider>);
}

function setup() {
  jest.clearAllMocks();
  mockFileUploader.mockReturnValue(fileUploaderPromise);
  mockFetchFiles.mockReturnValue(fetchFilesPromise);
  mockFetchData.mockReturnValue(fetchDataPromise);
}

describe("Resources", () => {
  beforeEach(setup);
  afterEach(() => cleanup());

  describe("admin", () => {
    it("renders", async () => {
      const { container } = wrappedRender(<Resources />, ADMIN_USER);

      await act(async () => {
        await fetchFilesPromise;
      });

      expect(screen.getByTestId("resources-header")).toBeInTheDocument();
      expect(container.querySelector("input[type=file]")).toBeInTheDocument();
      expect(
        container.querySelector("button[type=submit]")
      ).toBeInTheDocument();
    });

    it("should display an error when fetching files fails", async () => {
      mockFetchFiles.mockReturnValue(Promise.resolve({ error: "error" }));

      wrappedRender(<Resources />, ADMIN_USER);

      await act(async () => {
        await fetchFilesPromise;
      });

      expect(screen.getByText("Could not fetch files.")).toBeInTheDocument();
    });

    it("should display an error when fetching files is unauthorized", async () => {
      mockFetchFiles.mockReturnValue(Promise.resolve({ code: 401 }));

      wrappedRender(<Resources />, ADMIN_USER);

      await act(async () => {
        await fetchFilesPromise;
      });

      expect(screen.getByText("Unauthorized.")).toBeInTheDocument();
    });

    describe("file upload", () => {
      it("should upload a file", async () => {
        const { container } = wrappedRender(<Resources />, ADMIN_USER);

        await act(async () => {
          await fetchFilesPromise;
        });

        const fileInput = container.querySelector("input[type=file]");
        const submitButton = container.querySelector("button[type=submit]");
        userEvent.upload(fileInput, "./test.txt");

        await act(async () => {
          await userEvent.click(submitButton);
        });

        expect(mockFileUploader).toHaveBeenCalled();
      });

      it("should display an error if the file upload fails", async () => {
        mockFileUploader.mockReturnValue(Promise.resolve({ error: "error" }));
        const { container } = wrappedRender(<Resources />, ADMIN_USER);

        await act(async () => {
          await fetchFilesPromise;
        });

        const fileInput = container.querySelector("input[type=file]");
        const submitButton = container.querySelector("button[type=submit]");
        userEvent.upload(fileInput, "./test.txt");

        await act(async () => {
          await userEvent.click(submitButton);
        });

        expect(mockFileUploader).toHaveBeenCalled();
        expect(
          screen.getByText("Failed to upload. Please try again later.")
        ).toBeInTheDocument();
      });
    });

    describe("file fetch", () => {
      it("should fetch files", async () => {
        wrappedRender(<Resources />, ADMIN_USER);

        await act(async () => {
          await fetchFilesPromise;
          await userEvent.click(screen.getByText("file1.txt"));
        });

        expect(mockFetchData).toHaveBeenCalled();
        expect(screen.getByText("data")).toBeInTheDocument();
      });

      it("should display error message when file fetch fails", async () => {
        mockFetchData.mockReturnValue(Promise.resolve({ error: "Error" }));

        wrappedRender(<Resources />, ADMIN_USER);

        await act(async () => {
          await fetchFilesPromise;
          await userEvent.click(screen.getByText("file1.txt"));
        });

        expect(mockFetchData).toHaveBeenCalled();
        expect(
          screen.getByText("Failed to get data. Please try again later.")
        ).toBeInTheDocument();
      });
    });

    describe("user", () => {
      it("renders", async () => {
        const { container } = wrappedRender(<Resources />, USER_USER);

        await act(async () => {
          await fetchFilesPromise;
        });

        // expect render to be null
        expect(container.firstChild).toBeNull();
      });
    });

    describe("staff", () => {
      it("renders", async () => {
        const { container } = wrappedRender(<Resources />, STAFF_USER);

        await act(async () => {
          await fetchFilesPromise;
        });

        expect(screen.getByTestId("resources-header")).toBeInTheDocument();
        expect(
          container.querySelector("input[type=file]")
        ).not.toBeInTheDocument();
        expect(
          container.querySelector("button[type=submit]")
        ).not.toBeInTheDocument();

        fetchFilesResult.forEach((file) => {
          expect(screen.getByText(file)).toBeInTheDocument();
        });
      });
    });
  });
});
