import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePageLayout from "./components/templates/HomePageLayout.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Platform from "./components/pages/Platform.js";
import Login from "./components/pages/Login.js";
import SignUp from "./components/pages/SignUp.js";
import NewsAndEvents from "./components/pages/NewsAndEvents.js";
import AboutUs from "./components/pages/AboutUs.js";
import Resources from "./components/pages/Resources.js";
import AdminPanel from "./components/pages/AdminPanel.js";
import Leadership from "./components/pages/Leadership.js";
import { UserProvider } from "./auth/UserProvider.js";
import UserAccount from "./components/pages/UserAccount.js";
import ContactUs from "./components/pages/ContactUs";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePageLayout} exact />
          <Route path="/contactus" component={ContactUs} exact />
          <Route path="/leadership" component={Leadership} exact />
          <Route path="/news" component={NewsAndEvents} />
          <Route path="/platform" component={Platform} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/account" component={UserAccount} />
          <Route path="/resources" component={Resources} />
          <Route path="/adminpanel" component={AdminPanel} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/usermanagement" component={AdminUserManagement} />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
