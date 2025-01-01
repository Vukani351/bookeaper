import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <GoogleOAuthProvider clientId="990777673756-6pl474kuhja9vd84c25s94qsvc1u4iud.apps.googleusercontent.com">
  <BrowserRouter>
    <div className="all">
      <Header />
      <App />
    </div>
  </BrowserRouter>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
