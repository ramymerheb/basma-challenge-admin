import React from "react";
import ReactDOM from "react-dom";
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Login from "./Login";
import Clients from "./clients";

import reportWebVitals from "./reportWebVitals";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import GuardedRoute from "./guards/guard.js";

function Routes() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Login} exact />
          <GuardedRoute path="/clients" component={Clients} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppProvider i18n={enTranslations}>
      <Routes />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
