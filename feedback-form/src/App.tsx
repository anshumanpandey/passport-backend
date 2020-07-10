import React, { useState } from 'react';
import { parse } from "query-string"
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import passportico from './img/passportico.svg';
import './App.css';
import { PassportButton } from './components/PassportButton';
import { ErrorLabel } from './components/ErroLabel';

const Skils = [
  "Web Dev",
  "Design",
  "Marketing",
  "Sales",
  "Languages",
  "Life",
  "Social Skills",
  "Client",
  "Extra Mile",
  "Organization",
  "Communication",
  "Management",
  "Account & Finance",
  "Education",
  "BI / Data Science",
];

type FormValues = {
  name: string
  validated: null | boolean,
  description: string,
  goodSkills: { [k: string]: string }
  badSkills: { [k: string]: string }
  badDescription: string,
  wouldReachAgain: null | boolean
}

function App() {
  const params = parse(window.location.search)

  const fValues: FormValues = {
    name: params.name?.toString() || "",
    validated: null,
    description: '',
    goodSkills: {},
    badSkills: {},
    badDescription: '',
    wouldReachAgain: null
  }

  const [name, setName] = useState();
  const [changeName, setChangeName] = useState(false);

  const [{ data, loading, error }, post] = useAxios({
    url: `http://localhost:5000/api/feedback/${params.token}`,
    method: 'POST'
  }, { manual: true })

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

        <Formik
          initialValues={fValues}
          validate={values => {
            const errors: any = {}
            if (values.validated == null) errors.validated = "You must select an option"
            if (values.wouldReachAgain == null) errors.validated = "You must select an option"
            if (!values.description) errors.description = "Required field"
            if (!values.name) errors.name = "Required field"
            if (Object.keys(values.goodSkills).length == 0) errors.goodSkills = "You must select at least one skill"
            if (Object.keys(values.badSkills).length == 0) errors.badSkills = "You must select at least one skill"
            return errors;
          }}

          onSubmit={(values) => {
            post({
              data: {
                fullname: values.name,
                validated: values.validated,
                description: values.description,
                skillsWithExperience: Object.keys(values.goodSkills).join(','),
                skillsWithImproving: Object.keys(values.badSkills).join(','),
                engagementDescription: values.badDescription,
                wouldReachAgain: values.wouldReachAgain
              }
            })

          }}

        >

          {({ handleSubmit, handleChange, values, setFieldValue, errors, touched }) => (

            <div className="row middle">
              <div className="body col-10">

                <div className="ask-item">
                  <p>1 - Are you {params.name}, {params.title || ""} etc ? {!changeName ? 'Yes' : 'No'} </p>
                  <div>
                    <PassportButton onClick={() => setChangeName(false)} text="Yes" />
                    <PassportButton onClick={() => setChangeName(true)} text="No, modify" type="Normal" style={{ marginLeft: '1rem', }} />
                    {changeName && (
                      <textarea
                        onChange={handleChange}
                        value={values.name}
                        name="name"
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
                    {errors.name && touched.name ? <ErrorLabel text={errors.name} /> : null}
                  </div>
                </div>

                <div className="ask-item">
                  <p>2 - Do you validate the achievement ? {values.validated == true && 'Yes'} {values.validated == false && 'No'}</p>
                  <div>
                    <PassportButton onClick={() => setFieldValue("validated", true)} text="Yes" />
                    <PassportButton onClick={() => setFieldValue("validated", false)} text="No" type="Normal" style={{ marginLeft: '1rem', }} />
                  </div>
                  {errors.validated && touched.validated ? <ErrorLabel text={errors.validated} /> : null}
                </div>

                <div className="ask-item">
                  <p>3 - In 50 words or less, could you describe how “Nicolas Fatout” achieved this performance? What were the obstacles? What was the impact?</p>

                  <div>
                    <textarea
                      onChange={handleChange}
                      value={values.description}
                      name="description"
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
                  {errors.description && touched.description ? <ErrorLabel text={errors.description} /> : null}
                </div>

                <div className="ask-item">
                  <p>4 - Please select 1 or 2 skills that he demonstrated and used for this experience ?</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {Skils.map((i, idx) => {
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            const n = { ...values.goodSkills };
                            if (n[i]) {
                              delete n[i]
                            } else {
                              n[i] = i
                            }
                            setFieldValue("goodSkills", n)
                          }}
                          style={{
                            width: '6rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: "1px solid #99879D",
                            backdropFilter: 'blur(81.5485px)',
                            borderRadius: '4px',
                            marginRight: '1rem',
                            marginBottom: '1rem',
                            backgroundColor: values.goodSkills[i] != undefined ? '#3DC35B30' : 'transparent',
                          }}>
                          <p style={{
                            justifyContent: 'center',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            fontFamily: 'ABeeZee',
                            fontSize: '9px',
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#3DC35B',
                          }}>{i}</p>
                        </div>
                      );
                    })}
                  </div>

                  {errors.goodSkills && touched.goodSkills ? <ErrorLabel text={errors.goodSkills.toString()} /> : null}
                </div>


                <div className="ask-item">
                  <p>5 - Please select 1 skill “Nicolas Fatout” is currently working on or should continue improving according to you?</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {Skils.map((i, idx) => {
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            const n = { ...values.badSkills };
                            if (n[i]) {
                              delete n[i]
                            } else {
                              n[i] = i
                            }
                            setFieldValue("badSkills", n)
                          }}
                          style={{
                            width: '6rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: "1px solid #99879D",
                            backdropFilter: 'blur(81.5485px)',
                            borderRadius: '4px',
                            marginRight: '1rem',
                            marginBottom: '1rem',
                            backgroundColor: values.badSkills[i] != undefined ? '#83A0F430' : 'transparent',
                          }}>
                          <p style={{
                            justifyContent: 'center',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            fontFamily: 'ABeeZee',
                            fontSize: '9px',
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#83A0F4',
                          }}>{i}</p>
                        </div>
                      );
                    })}
                  </div>
                  {errors.badSkills && touched.badSkills ? <ErrorLabel text={errors.badSkills.toString()} /> : null}

                  <textarea
                    onChange={handleChange}
                    value={values.badDescription}
                    name="badDescription"
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
                  <p>6 - Are you willing to get reached-out by a recruiter regarding “Nicolas Fatout” on this specific achievement? {values.wouldReachAgain == true && 'Yes'} {values.wouldReachAgain == false && 'No'}</p>
                  <div>
                    <PassportButton onClick={() => setFieldValue('wouldReachAgain', true)} text="Yes" />
                    <PassportButton onClick={() => setFieldValue("wouldReachAgain", false)} text="No" type="Normal" style={{ marginLeft: '1rem', }} />
                  </div>

                  {errors.validated && touched.validated ? <ErrorLabel text={errors.validated} /> : null}
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <PassportButton
                    style={{ width: "50%", backgroundColor: loading ? '#52c76c30': '#52c76c' }}
                    onClick={handleSubmit} text="Done" />
                </div>


              </div>
            </div>
          )}

        </Formik>


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
