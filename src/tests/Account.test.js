import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePageLayout from '../components/templates/HomePageLayout.js';
import Platform from '../components/pages/Platform.js';
import Login from '../components/pages/Login.js';
import NewsAndEvents from '../components/pages/NewsAndEvents.js';
import Resources from '../components/pages/Resources.js';
import AdminPanel from '../components/pages/AdminPanel.js';
import Leadership from '../components/pages/Leadership.js';
import UserRegistration from '../components/pages/UserRegistration.js';
import {UserProvider} from '../auth/UserProvider.js';
import UserAccount from '../components/pages/UserAccount.js';
const jwt = require('jsonwebtoken');

const token = jwt.sign("admin@venus.com", "test");
const ADMIN_USER = {
    username: "admin@venus.com",
    jwt: token,
    role: "ROLE_ADMIN"
}
const setUserInfo = () => {};
const logout = () => {};

function renderApp(user) {
    return render(
        <UserProvider user={user}> 
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={HomePageLayout} exact />
                    <Route path="/contactus" component={UserRegistration} exact />
                    <Route path="/leadership" component={Leadership} exact />
                    <Route path="/news" component={NewsAndEvents} />
                    <Route path="/platform" component={Platform} />
                    <Route path="/login" component={Login} />
                    <Route path="/account" component={UserAccount} />
                    <Route path="/resources" component={Resources} />
                    <Route path="/adminpanel" component={AdminPanel} />
                </Switch>
            </BrowserRouter>
        </UserProvider>
    );
  }

test('Admin account creation', async () => {
    //console.log(ADMIN_USER);
    renderApp(ADMIN_USER);
    const linkElement = screen.getByText(/Account/i);
    expect(linkElement).toBeInTheDocument();
});