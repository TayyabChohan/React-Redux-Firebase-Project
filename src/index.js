import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ReduxToastr from "react-redux-toastr";
import App from "./app/layout/App.jsx";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import SrollToTop from "./app/common/util/srollToTop";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

const store = configureStore();

const rootEl = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <SrollToTop>
          <ReduxToastr
            position='bottom-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
          />
          <App />
        </SrollToTop>
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}

store.firebaseAuthIsReady.then(() => {
  render();
  registerServiceWorker();
})

