import React, { useState } from 'react';

type Props = {
    text: string,
    style?: React.CSSProperties,
}
export const ErrorLabel: React.FC<Props> = ({ text, style }) => {
    return (
        <p style={{ color: 'rgba(212, 62, 32, 0.5)'}}>{text}</p>
    );
}