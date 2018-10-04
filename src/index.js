import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./app/layout/App.jsx";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import SrollToTop from './app/common/util/srollToTop'

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <SrollToTop>
      <App />
      </SrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
