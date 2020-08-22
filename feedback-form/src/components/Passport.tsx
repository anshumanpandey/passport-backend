import React, { useState } from 'react';
import useAxios from 'axios-hooks'
import { useParams } from 'react-router-dom';
import MoonLoader from "react-spinners/MoonLoader";
import { PassportResponse } from '../types/PassportResponse';
import hat from "../img/hat.png"

export const Passport: React.FC = () => {
  let { id } = useParams();

  const [{ data, loading, error }, post] = useAxios<PassportResponse>({
    url: `${process.env.REACT_APP_API_URL}/passport/${id}`,
  })

  const [donwloadReq, doDownload] = useAxios<PassportResponse>({}, { manual: true })

  if (loading) {
    return (
      <div style={{ width: '100%', height: '100%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: "#FAF9FE" }} className="row middle">
        <div style={{ display: 'flex', alignItems: 'center' }} className="body col-10">
          <MoonLoader />
        </div>
      </div>
    );
  }

  if (error && error.response) {
    return (
      <div style={{ width: '100%', height: '100%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: "#FAF9FE" }} className="row middle">
        <div style={{ display: 'flex', alignItems: 'center' }} className="body col-10">
          <p>{error.response.data.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row" style={{ backgroundColor: "#FAF9FE" }}>
        <div className="col-8" style={{ marginTop: '2.5rem', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', width: '80%', marginLeft: "auto", marginRight: 'auto' }}>
          <div>
            <img style={{ height: "100px", width: "100px", borderRadius: '50px' }} src={data.User.profilePic ? data.User.profilePic : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} />
          </div>
          <div style={{ width: '18rem', backgroundColor: "white", border: "1px solid rgba(153, 135, 157, 0.24)", borderRadius: "5px", alignSelf: 'center' }}>
            <p style={{ color: '#120E21', fontSize: '20px', fontFamily: 'RedHatBold', marginLeft: '1rem', marginBottom: '1.2rem', marginTop: '1.2rem' }}>
              {data?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="row" style={{ backgroundColor: "#FAF9FE" }}>
        <div className="col-8" style={{ backgroundColor: 'white', paddingLeft: '1rem', paddingRight: '1rem', flexDirection: 'column', display: 'flex', width: '77.5%', minHeight: '100%', marginLeft: "auto", marginRight: 'auto' }}>
          <div>
            <div className="row" style={{ height: '100%' }}>
              <div className="col-md-6">
                <p style={{ margin: 0, fontSize: "25px", fontFamily: 'RedHatBold' }}>{data.User.firstName} {data.User.lastName}</p>
                <p style={{ margin: 0, color: "#99879D", fontSize: "16px", fontFamily: "ABeeZeeRegular" }}>{data.User.companyTitle}</p>
                <p style={{ margin: 0, color: "#99879D", fontSize: "16px" }}>{data.User.companyName}</p>
              </div>
              <div className="col-md-6">
                <div className="row" style={{ height: '100%' }}>
                  <div className="col-md-12" style={{ flexWrap: 'wrap',backgroundColor: 'white', justifyContent: 'flex-end', display: 'flex', flexDirection: 'row', marginLeft: "auto", marginRight: 'auto' }}>
                    {data?.Achivements.reduce((achievement, next) => {
                      const feedbackSkills = next.Feedbacks.reduce((skillsArr: any[], nextFeedback: any) => {
                        nextFeedback.skillsWithExperience.forEach((s: any) => {
                          const found = skillsArr.find(i => i.skill == s)

                          if (found) {
                            skillsArr = [
                              ...skillsArr.filter(i => i.skill != found.skill),
                              { ...found, amount: found.amount + 1 }
                            ]

                          } else {
                            skillsArr.push({ skill: s, amount: 1 })
                          }
                        })

                        return skillsArr
                      }, [])
                      achievement.push(...feedbackSkills)
                      return achievement
                    }, [] as any[])
                      .map((f) => {
                        console.log(f)
                        return (
                          <div style={{ display: "flex", flexDirection: 'row', marginRight: '0.5rem' }}>
                            <div
                              key={f.skill}
                              style={{
                                height: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: "1px solid #99879D",
                                backdropFilter: 'blur(81.5485px)',
                                borderRadius: '4px',
                                backgroundColor: 'transparent',
                                marginBottom: '0.5rem',
                              }}>
                              <p style={{
                                justifyContent: 'center',
                                margin: 0,
                                paddingLeft: '0.1rem',
                                paddingRight: '0.1rem',
                                fontFamily: 'ABeeZeeRegular',
                                fontSize: '9px',
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'center',
                                color: '#3DC35B',
                              }}>{f.skill}</p>
                            </div>
                            <div
                              key={f.skill}
                              style={{
                                width: '1rem',
                                height: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: "1px solid #99879D",
                                backdropFilter: 'blur(81.5485px)',
                                borderRadius: '4px',
                                backgroundColor: 'transparent',
                                marginBottom: '0.5rem',
                              }}>
                              <p style={{
                                justifyContent: 'center',
                                margin: 0,
                                paddingLeft: '0.1rem',
                                paddingRight: '0.1rem',
                                fontFamily: 'ABeeZeeRegular',
                                fontSize: '9px',
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'center',
                                color: '#3DC35B',
                              }}>{f.amount}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="col-md-12" style={{ flexWrap: 'wrap',backgroundColor: 'white', justifyContent: 'flex-end', display: 'flex', flexDirection: 'row', marginLeft: "auto", marginRight: 'auto' }}>
                    {data?.Achivements.reduce((achievement, next) => {
                      const feedbackSkills = next.Feedbacks.reduce((skillsArr: any[], nextFeedback: any) => {
                        nextFeedback.skillsWithImproving.forEach((s: any) => {
                          const found = skillsArr.find(i => i.skill == s)

                          if (found) {
                            skillsArr = [
                              ...skillsArr.filter(i => i.skill != found.skill),
                              { ...found, amount: found.amount + 1 }
                            ]

                          } else {
                            skillsArr.push({ skill: s, amount: 1 })
                          }
                        })

                        return skillsArr
                      }, [])
                      achievement.push(...feedbackSkills)
                      return achievement
                    }, [] as any[])
                      .map((f) => {
                        return (
                          <div style={{ display: "flex", flexDirection: 'row', marginRight: '0.5rem' }}>
                            <div
                              key={f.skill}
                              style={{
                                height: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: "1px solid #99879D",
                                backdropFilter: 'blur(81.5485px)',
                                borderRadius: '4px',
                                backgroundColor: 'transparent',
                                marginBottom: '0.5rem',
                              }}>
                              <p style={{
                                justifyContent: 'center',
                                margin: 0,
                                paddingLeft: '0.1rem',
                                paddingRight: '0.1rem',
                                fontFamily: 'ABeeZeeRegular',
                                fontSize: '9px',
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'center',
                                color: '#83A0F4',
                              }}>{f.skill}</p>
                            </div>
                            <div
                              key={f.skill}
                              style={{
                                width: '1rem',
                                height: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: "1px solid #99879D",
                                backdropFilter: 'blur(81.5485px)',
                                borderRadius: '4px',
                                backgroundColor: 'transparent',
                                marginBottom: '0.5rem',
                              }}>
                              <p style={{
                                justifyContent: 'center',
                                margin: 0,
                                paddingLeft: '0.1rem',
                                paddingRight: '0.1rem',
                                fontFamily: 'ABeeZeeRegular',
                                fontSize: '9px',
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'center',
                                color: '#83A0F4',
                              }}>{f.amount}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>

              <div className="col-md-12">
              <h6 style={{ textAlign: 'right', fontFamily: 'ABeeZeeRegular', }}>{data?.Achivements.length} recommendations</h6>
              </div>
            </div>
          </div>
          {data?.Achivements.map(p => {
            return (
              <div style={{ display: "flex", flexDirection: 'column' }}>
                <div style={{ paddingLeft: '1rem', paddingRight: '1rem', paddingBottom: '0.5rem', paddingTop: '0.5rem',width: 'auto', border: "1px solid rgba(153, 135, 157, 0.24)", boxShadow: "inset -16px 16px 56px rgba(251, 234, 255, 0.32)", borderRadius: "5px" }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <p style={{ fontFamily: 'RedHatRegular' }}>{p.title}</p>
                    <p style={{ fontFamily: 'ABeeZeeRegular', color: "#99879D", fontSize: '12px' }}>{p.description}</p>
                    <img src={hat} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <p style={{ fontFamily: 'RedHatRegular', fontSize: "20px", margin: 0, alignSelf: "flex-end" }}>Additional</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <p style={{ fontFamily: 'RedHatRegular' }}>{p.valueObteined}</p>
                      <p style={{ fontFamily: 'RedHatRegular' }}>{p.resultObteined}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <p style={{ fontFamily: 'ABeeZeeRegular', color: 'rgba(18, 14, 33, 0.54)', fontSize: '12px', marginRight: "0.5rem", marginBottom: 0 }}>{p.year}</p>
                      {p.awardFilename && (
                        <div onClick={() => window.open(`${process.env.REACT_APP_API_URL}/download/${p.id}`, "_blank")} style={{ cursor: 'pointer', backgroundColor: '#FBEAFF', borderRadius: '4px', alignSelf: 'center', display: 'flex' }}>
                          <p style={{ fontFamily: 'ABeeZeeRegular', fontSize: '12px', marginTop: '0.2rem', marginBottom: '0.2rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                            Certification
                          </p>
                        </div>
                      )}
                    </div>
                    <div style={{ alignItems: "center", display: "flex" }}>
                      <p style={{ fontFamily: 'ABeeZeeRegular', color: "rgba(18, 14, 33, 0.54)", margin: 0, fontSize: '14px' }}>{p.titleObteined}</p>
                    </div>
                  </div>
                </div>
                {p.Feedbacks.map(f => {
                  return (
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', width: '70%', marginLeft: 'auto' }}>
                      <div style={{ marginTop: '1rem' }}>
                        <p style={{ fontSize: "20px", color: "#120E21", fontFamily: "RedHatBold", margin: 0 }}>{f.collegueRole} at {p.company}</p>
                        <p style={{ fontSize: "18px", color: "#120E21", fontFamily: "RedHatRegular", marginTop: 0 }}>{f.collegueName}</p>
                        <p style={{ fontSize: "12", color: "#99879D", fontFamily: "ABeeZeeRegular" }}>{p.year}</p>
                      </div>
                      <div style={{ marginTop: '1rem', width: '50%' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'normal' }}>
                          {f.skillsWithExperience.map((i: string) => {
                            return (
                              <div
                                key={i}
                                style={{
                                  height: '1rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: "1px solid #99879D",
                                  backdropFilter: 'blur(81.5485px)',
                                  borderRadius: '4px',
                                  backgroundColor: 'transparent',
                                  marginRight: '0.5rem',
                                  marginBottom: '0.5rem',
                                }}>
                                <p style={{
                                  justifyContent: 'center',
                                  margin: 0,
                                  paddingLeft: '0.1rem',
                                  paddingRight: '0.1rem',
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
                        <p style={{ fontSize: "10px", color: "#99879D", fontFamily: "ABeeZeeRegular" }}>{f.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'normal' }}>

                          {f.skillsWithImproving.map((i: string) => {
                            return (
                              <div
                                key={i}
                                style={{
                                  height: '1rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: "1px solid #99879D",
                                  backdropFilter: 'blur(81.5485px)',
                                  borderRadius: '4px',
                                  backgroundColor: 'transparent',
                                  marginRight: '0.5rem',
                                  marginBottom: '0.5rem',
                                }}>
                                <p style={{
                                  justifyContent: 'center',
                                  margin: 0,
                                  paddingLeft: '0.1rem',
                                  paddingRight: '0.1rem',
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
                        <p style={{ fontSize: "10px", color: "#99879D", fontFamily: "ABeeZeeRegular" }}>{f.engagementDescription}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      </>
  );
}