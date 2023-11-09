import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {QueryClient, QueryClientProvider} from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "./styles/Global";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyles />
        <App />
        <ToastContainer />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
