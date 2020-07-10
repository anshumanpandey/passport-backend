import React, { useState } from 'react';

type Props = {
    text: string,
    type?: 'Primary' | 'Normal',
    onClick?: () => void,
    style?: React.CSSProperties,
}
export const PassportButton: React.FC<Props> = ({ text, type = "Primary", onClick, style }) => {
    return (
        <button
        onClick={() => onClick && onClick()}
        style={{
            background: type == 'Primary' ? '#52C76C' : "#FFFFFF",
            borderRadius: '8px',
            border: 0,
            color: type == 'Primary' ? 'white' : 'black',
            height: "3rem",
            width: "10rem",
            fontFamily: 'RedHatRegular',
            boxShadow: '0px 2.76726px 2.21381px rgba(0, 0, 0, 0.00562291), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.00807786), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.01), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0119221), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0143771), 0px 100px 80px rgba(0, 0, 0, 0.02)',
            ...style
          }}>
            {text}
        </button>
    );
}