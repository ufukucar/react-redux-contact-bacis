import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={AddContact} />
        <Route exact path="/edit/:id" component={EditContact} />
      </Switch>
    </div>
  );
};

export default App;
