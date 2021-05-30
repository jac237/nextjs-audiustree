import React from 'react';

const audiusPurple = 'https://i.imgur.com/oGkFpNj.png';
const audiusBlack = 'https://i.imgur.com/Onc0tpx.png';
const audiusWhite = 'https://i.imgur.com/Xz1XF44.png';

const AudiusButton = ({ href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        borderRadius: 4,
        background: '#35364f',
        padding: '10px 20px',
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={audiusWhite}
        alt="View Track on Audius"
        style={{ width: 90, opacity: 0.9 }}
      />
    </a>
  );
};

export default AudiusButton;
