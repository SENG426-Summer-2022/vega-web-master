import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Helmet>
        <meta
          http-equiv="Content-Security-Policy"
          content="connect-src 'self' http://localhost:8000 http://seng426group7frontendserver.azurewebsites.net;
        default-src 'none';
        img-src 'self' data:;
        manifest-src 'self';
        script-src-elem 'self';
        style-src-elem 'self';
        object-src 'self';
       "
        />
      </Helmet>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: http://localhost:8000://bit.ly/CRA-vitals
reportWebVitals();
