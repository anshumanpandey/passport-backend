import React, { useState, useEffect, useRef } from 'react';
import { parse } from "query-string"
import useAxios from 'axios-hooks'
import { Formik, FormikProps } from 'formik';
import MoonLoader from "react-spinners/MoonLoader";
import { PassportButton } from './PassportButton';
import { ErrorLabel } from './ErroLabel';

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

type Props = { onSuccess: () => void }

export const Form: React.FC<Props> = ({ onSuccess }) => {
    const params = parse(window.location.search)

    const fValues: FormValues = {
        name: "",
        validated: null,
        description: '',
        goodSkills: {},
        badSkills: {},
        badDescription: '',
        wouldReachAgain: null
    }

    const [changeName, setChangeName] = useState(false);
    const [userName, setUsername] = useState('');
    const formikRef = useRef<FormikProps<any>>()

    const [{ data, loading, error }, post] = useAxios({
        url: `http://localhost:5000/api/feedback/${params.token}`,
        method: 'POST'
    }, { manual: true })

    const [getDataReq] = useAxios({
        url: `http://localhost:5000/api/feedback/meta/${params.token}`,
    })

    useEffect(() => {
        if (!getDataReq.data) return
        formikRef.current?.setFieldValue("name", getDataReq.data.fullname)
        setUsername(`${getDataReq.data.Achivement.User.firstName} ${getDataReq.data.Achivement.User.lastName}`);
        if (getDataReq.data.isFilled) onSuccess()
    }, [getDataReq.loading]);

    if (getDataReq.loading) {
        return (
            <div className="row middle">
                <div style={{ display: 'flex', alignItems: 'center'}} className="body col-10">
                    <MoonLoader />
                </div>
            </div>
        );
    }

    return (
        <Formik
            innerRef={(r) => formikRef.current = r}
            enableReinitialize
            initialValues={fValues}
            validate={values => {
                const errors: any = {}
                if (values.validated == null) errors.validated = "You must select an option"
                if (values.wouldReachAgain == null) errors.validated = "You must select an option"
                if (!values.description) errors.description = "Required field"

                const splittedValues = values.name ? values.name.split(',') : []
                if (!values.name) {
                    errors.name = "Required"
                } else if (!values.name.includes(',')) {
                    errors.name = "Invalid value. Specify like: NAME, POSITION"
                } else if (splittedValues.length != 2) {
                    errors.name = "Invalid value. Specify like: NAME, POSITION"
                } else if (splittedValues[0].trim() == '' || splittedValues[1].trim() == "") {
                    errors.name = "Invalid value. Specify like: NAME, POSITION"
                }

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
                    .then(() => {
                        onSuccess()
                    })

            }}

        >
            {({ handleSubmit, handleChange, values, setFieldValue, errors, touched }) => (

                <div className="row middle">
                    <div className="body col-10">

                        <div className="ask-item">
                            <p>1 - Are you {values.name} etc ? {!changeName ? 'Yes' : 'No'} </p>
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
                            </div>
                            {errors.name && touched.name ? <ErrorLabel text={errors.name} /> : null}
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
                            <p>3 - In 50 words or less, could you describe how “{userName}” achieved this performance? What were the obstacles? What was the impact?</p>

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
                                                cursor: 'pointer',
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
                                                fontFamily: 'ABeeZeeRegular',
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
                            <p>5 - Please select 1 skill “{userName}” is currently working on or should continue improving according to you?</p>

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
                                                cursor: 'pointer',
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
                                                fontFamily: 'ABeeZeeRegular',
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
                            <p>6 - Are you willing to get reached-out by a recruiter regarding “{userName}” on this specific achievement? {values.wouldReachAgain == true && 'Yes'} {values.wouldReachAgain == false && 'No'}</p>
                            <div>
                                <PassportButton onClick={() => setFieldValue('wouldReachAgain', true)} text="Yes" />
                                <PassportButton onClick={() => setFieldValue("wouldReachAgain", false)} text="No" type="Normal" style={{ marginLeft: '1rem', }} />
                            </div>

                            {errors.validated && touched.validated ? <ErrorLabel text={errors.validated} /> : null}
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <PassportButton
                                style={{ width: "50%", backgroundColor: loading ? '#52c76c30' : '#52c76c' }}
                                onClick={handleSubmit} text="Done" />
                        </div>


                    </div>
                </div>
            )}

        </Formik>
    );
}
