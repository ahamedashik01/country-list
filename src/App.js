import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import LogIn from './pages/LogIn/LogIn';
import Register from './pages/Register/Register';
import AddCountry from './pages/AddCountry/AddCountry';
import Manage from './pages/Manage/Manage';
import AuthProvider from './context/AuthProvider';



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/add-country">
              <AddCountry></AddCountry>
            </Route>
            <Route path="/Manage">
              <Manage></Manage>
            </Route>
            <Route path="/login">
              <LogIn></LogIn>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
