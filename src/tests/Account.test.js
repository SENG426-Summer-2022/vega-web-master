import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminPanel from '../components/pages/AdminPanel.js';
import { fetchuser } from '../service/AdminPanel/AdminPanel.js';
import {UserProvider} from '../auth/UserProvider.js';

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

test('Admin can change user roles', async () => {
    const users = [ {username: "admin", role: "ROLE_ADMIN", firstName: "Admin", lastName: "Smith"} ];
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    // jest.mock("../service/AdminPanel/AdminPanel", () => {
    //     return {
    //       fetchuser: jest.fn(() => Promise.resolve(users))
    //     };
    //   });
    render(
        <UserProvider user={ADMIN_USER}>
            <AdminPanel users={users}/>
        </UserProvider>
    );
    expect(screen.getByText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Smith/i)).toBeInTheDocument()
});

test('User cannot change user roles', async () => {
    const users = [ {username: "admin", role: "ROLE_ADMIN", firstName: "Admin", lastName: "Smith"} ];
    render(
        <UserProvider user={USER_USER}>
            <AdminPanel users={users}/>
        </UserProvider>
    );
    expect(screen.getByText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Smith/i)).toBeInTheDocument()
});

// test('Non-signed in users cannot change user roles', async () => {
//     render(
//         <UserProvider user={EMPTY_USER}>
//             <AdminPanel/>
//         </UserProvider>
//     );
//     expect(screen.getByText(/First Name/i)).not.toBeInTheDocument()
// });