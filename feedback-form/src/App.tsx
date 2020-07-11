import React, { useState } from 'react';
import passportico from './img/passportico.svg';
import './App.css';
import { SuccessMessage } from './components/SuccessMessage';
import { Form } from './components/Form';

function App() {
  const [successSend, setsuccessSend] = useState(false);

  return (
    <>
      <div className="container-fluid">
        <div className="row header">
          <div className="col-12">
            <h2>Passport</h2>
            <h5>Your career companion</h5>
          </div>
          <img src={passportico} alt="icon" />
        </div>

        {successSend && <SuccessMessage />}
        {!successSend && <Form onSuccess={() => setsuccessSend(true)} />}

      </div>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"></script>
    </>
  );
}

export default App;
