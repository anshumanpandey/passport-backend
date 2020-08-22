import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import passportico from '../img/passportico.svg';

type Props = {
    style?: React.CSSProperties,
    noLogo?: boolean,
}
export const Header: React.FC<Props> = ({ style, noLogo = false }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <div className="row header">
            <div className="col-12">
                <h2 style={{ position: 'relative', zIndex: 3 }}>Passport</h2>
                <h5 style={{ position: 'relative', zIndex: 3 }}>Your career companion</h5>
            </div>
            {noLogo == false && <img style={{ left: isTabletOrMobile ? '5%' : '25%' }} src={passportico} alt="icon" />}
        </div>
    );
}