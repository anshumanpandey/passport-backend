import React, { useState } from 'react';
import passportico from './img/passportico.svg';
import './App.css';
import { SuccessMessage } from './components/SuccessMessage';
import { Form } from './components/Form';
import { useMediaQuery } from 'react-responsive';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Passport } from './components/Passport';

function App() {
  const [successSend, setsuccessSend] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  return (
    <>
    <Router>
      <div className="container-fluid">
        <div className="row header">
          <div className="col-12">
            <h2 style={{ position: 'relative',zIndex: 3 }}>Passport</h2>
            <h5 style={{ position: 'relative',zIndex: 3 }}>Your career companion</h5>
          </div>
          <img style={{ left: isTabletOrMobile ? '5%' : '25%'}} src={passportico} alt="icon" />
        </div>

        <Switch>
          <Route path="/success">
            <SuccessMessage />
          </Route>
          <Route path="/passport/:id">
            <Passport />
          </Route>
          <Route path="/">
            <Form onSuccess={() => setsuccessSend(true)} />
          </Route>
        </Switch>

      </div>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"></script>
      </Router>
    </>
  );
}

export default App;
