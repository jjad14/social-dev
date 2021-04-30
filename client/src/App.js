import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
// import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import * as types from './actions/types';

const App = () => {

  useEffect(() => {
    // check for token
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser);

    // log user out from all tabs if they log out
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({ type: types.LOGOUT});
      }
    });
  });


  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />

          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </section>

        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
