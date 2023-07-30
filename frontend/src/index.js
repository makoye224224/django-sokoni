import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Context from "./context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/store"; 
import { Provider } from "react-redux"; 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Context>
      <App />
    </Context>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


