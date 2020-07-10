import React, { useState } from 'react';
import { parse } from "query-string"
import passportico from './img/passportico.svg';
import './App.css';
import { PassportButton } from './components/PassportButton';

function App() {
  const params = parse(window.location.search)

  const [name, setName] = useState(params.name);
  const [changeName, setChangeName] = useState(false);
  const [validated, setValidated] = useState<boolean | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [goodSkills, setGoodSkills] = useState<{ [k: string]: string }>({});
  const [badSkills, setBadSkills] = useState<{ [k: string]: string }>({});
  const [badDescription, setBadDescription] = useState<null | string>(null);
  const [wouldReachAgain, setWouldReachAgain] = useState<boolean | null>(null);

  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" />

        <title>Hello, world!</title>
      </head>

      <body>
        <div className="container-fluid">
          <div className="row header">
            <div className="col-12">
              <h2>Passport</h2>
              <h5>Your career companion</h5>
            </div>
            <img src={passportico} alt="icon" />
          </div>

          <div className="row middle">
            <div className="body col-10">


              <div className="ask-item">
                <p>1 - Are you Florian Guerin, job titiel etc</p>
                <div>
                  <PassportButton onClick={() => setChangeName(true)} text="Yes" />
                  <PassportButton onClick={() => setChangeName(false)} text="No" type="Normal" style={{ marginLeft: '1rem', }} />
                  {changeName && (
                    <textarea
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      style={{
                        marginTop: '1rem',
                        padding: '2rem',
                        height: '1rem',
                        width: '95%',
                        backgroundColor: 'rgba(119, 195, 242, 0.1)',
                        border: 0,
                        borderRadius: '8px',
                      }}>

                    </textarea>
                  )}
                </div>
              </div>

              <div className="ask-item">
                <p>2 - Do you validate the achievement</p>
                <div>
                  <PassportButton onClick={() => setValidated(true)} text="Yes" />
                  <PassportButton onClick={() => setValidated(false)} text="No" type="Normal" style={{ marginLeft: '1rem', }} />
                </div>
              </div>

              <div className="ask-item">
                <p>3 - In 50 words or less, could you describe how “Nicolas Fatout” achieved this performance? What were the obstacles? What was the impact?</p>

                <div>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    style={{
                      height: '15rem',
                      padding: '2rem',
                      width: '95%',
                      backgroundColor: 'rgba(119, 195, 242, 0.1)',
                      border: 0,
                      borderRadius: '8px',
                    }}>

                  </textarea>
                </div>
              </div>

              <div className="ask-item">
                <p>4 - Please select 1 or 2 skills that he demonstrated and used for this experience ?</p>

                <div style={{ display: 'flex' }}>
                  {Array(10).fill(0).map((i, idx) => {
                    return (
                      <div
                        key={`good-skill-${idx}`}
                        onClick={() => {
                          setGoodSkills((p) => {
                            if (p[i]) {
                              delete p[i]
                            } else {
                              p[i] = i
                            }

                            return p
                          })
                        }}
                        style={{
                          border: "1px solid #99879D",
                          backdropFilter: 'blur(81.5485px)',
                          borderRadius: '4px',
                          marginRight: '1rem'
                        }}>
                        <p style={{
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          fontFamily: 'ABeeZee',
                          fontSize: '9px',
                          display: 'flex',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#3DC35B',
                        }}>OWNERSHIP</p>
                      </div>
                    );
                  })}
                </div>
              </div>


              <div className="ask-item">
                <p>5 - Please select 1 skill “Nicolas Fatout” is currently working on or should continue improving according to you?</p>

                <div style={{ display: 'flex' }}>
                  {Array(10).fill(0).map((i, idx) => {
                    return (
                      <div
                        key={`bad-skill-${idx}`}
                        onClick={() => {
                          setBadSkills((p) => {
                            if (p[i]) {
                              delete p[i]
                            } else {
                              p[i] = i
                            }

                            return p
                          })
                        }}
                        style={{
                          border: "1px solid #99879D",
                          backdropFilter: 'blur(81.5485px)',
                          borderRadius: '4px',
                          marginRight: '1rem'
                        }}>
                        <p style={{
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          fontFamily: 'ABeeZee',
                          fontSize: '9px',
                          display: 'flex',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#83A0F4',
                        }}>OWNERSHIP</p>
                      </div>
                    );
                  })}
                </div>

                <textarea
                  onChange={(e) => {
                    setBadDescription(e.target.value)
                  }}
                  placeholder="Comment if you would like (max 50 words)"
                  style={{
                    marginTop: '1rem',
                    padding: '2rem',
                    height: '5rem',
                    width: '95%',
                    backgroundColor: 'rgba(119, 195, 242, 0.1)',
                    border: 0,
                    borderRadius: '8px',
                  }}>

                </textarea>
              </div>

              <div className="ask-item">
                <p>6 - Are you willing to get reached-out by a recruiter regarding “Nicolas Fatout” on this specific achievement? </p>
                <div>
                  <PassportButton onClick={() => setWouldReachAgain(true)} text="Yes" />
                  <PassportButton onClick={() => setWouldReachAgain(false)} text="No" type="Normal" style={{ marginLeft: '1rem', }} />
                </div>
              </div>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <button style={{
                  background: '#52C76C',
                  borderRadius: '8px',
                  border: 0,
                  color: 'white',
                  height: "3rem",
                  width: "95%",
                  fontSize: '1rem',
                  fontFamily: 'RedHatRegular',
                  boxShadow: '0px 2.76726px 2.21381px rgba(0, 0, 0, 0.00562291), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.00807786), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.01), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0119221), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0143771), 0px 100px 80px rgba(0, 0, 0, 0.02)',
                }}>
                  Done
                </button>
              </div>


            </div>
          </div>

        </div>

        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
          integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
          integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"></script>
      </body>
    </>
  );
}

export default App;
