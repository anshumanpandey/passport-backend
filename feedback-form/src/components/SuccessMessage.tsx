import React, { useState } from 'react';
import { Header } from './Header';

export const SuccessMessage: React.FC = () => {

  return (
    <>
      <Header />
      <div style={{ marginTop: '10rem', width: '80%', marginLeft: 'auto', marginRight: 'auto' }} className="header">
        <div className="col-8">
          <h3 style={{ color: 'white', textAlign: 'center', fontSize: '1.8rem', fontFamily: 'RedHatBold' }}>Thank You for your recommendation</h3>
        </div>
      </div>
    </>
  );
}