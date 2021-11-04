import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./componenets/Header";
import ViewMovie from './pages/ViewMovie';
import Search from "./pages/Search";
import Home from './pages/Home';
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";


const App = () => {
  return (
    <div>

    <div className="wrapper">
    <Router>
      <Header/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movie/:id">
            <ViewMovie />
          </Route>
          <Route  path="/catalog/:genreid">
            <Catalog/>
          </Route>
          <Route  path="/catalog">
            <Catalog/>
          </Route>
          <Route  path="/search">
            <Search/>
          </Route>
          <Route  path="*">
            <NotFound />
          </Route>
        </Switch>
  
    </Router>
    </div>
    </div>
  );
}

export default App;
