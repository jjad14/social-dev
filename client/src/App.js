import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
// import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Navbar />

      <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </section>

    </Fragment>
  </BrowserRouter>
);

export default App;
