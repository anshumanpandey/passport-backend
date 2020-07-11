import React, { useState } from 'react';

export const SuccessMessage: React.FC = () => {
    return (
        <div style={{ marginTop: '10rem', width: '80%', marginLeft: 'auto', marginRight: 'auto' }} className="header">
          <div className="col-8">
            <h2>Thanks!</h2>
            <h5>You completed this form</h5>
          </div>
        </div>
    );
}