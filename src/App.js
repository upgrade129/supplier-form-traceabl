import logo from "./logo.svg";
import "./App.css";
import Form from "./components/form";
import Welcome from "./components/welcome";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/upload/:id">
            <Form />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
