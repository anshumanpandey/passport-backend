import React, { useState } from 'react';

export const SuccessMessage: React.FC = () => {
    return (
        <div style={{ marginTop: '10rem', width: '80%', marginLeft: 'auto', marginRight: 'auto' }} className="header">
          <div className="col-8">
            <h3 style={{ color: 'white', textAlign: 'center', fontSize: '1.8rem', fontFamily: 'RedHatBold'}}>Thank You for your recommendation</h3>
          </div>
        </div>
    );
}