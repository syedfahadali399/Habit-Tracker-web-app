import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/Store.js";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
        <ToastContainer position="bottom-right" autoClose={1500} hideProgressBar={true} theme="dark"/>
      </StrictMode>
    </BrowserRouter>
  </Provider>,
);
