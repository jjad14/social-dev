import React, { Fragment } from 'react';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Landing />
      <footer className='fixed-bottom bg-dark text-white mt-4 p-2 text-center'>
      Copyright &copy; {new Date().getFullYear()} Social Dev
    </footer>
    </Fragment>
  );
};

export default App;
