import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { AuthProvider } from "./context/authContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

root.render(
  <GoogleOAuthProvider clientId="990777673756-6pl474kuhja9vd84c25s94qsvc1u4iud.apps.googleusercontent.com">
    <BrowserRouter>
      <AuthProvider>
        <div className="all">
          <Header />
          <App />
        </div>
      </AuthProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
