import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

ReactDOM.render(
  <BrowserRouter>
    <div className="all">
      <Header />
      <App />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
