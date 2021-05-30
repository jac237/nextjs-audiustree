import React from 'react';
import Head from 'next/head';

const DEFAULT_TITLE = 'AudiusTree | #Moombahton #AudiusAPI #NextJS';
const DEFAULT_DESCRIPTION =
  "Get Moombahfy'd! New to Audius? Check out our featured tracks, artists, and playlists! Built using the Audius API. Make sure to check out these artists and give them a follow!";
const DEFAULT_IMAGE = 'https://i.imgur.com/fHPijWA.jpg';

const DefaultHead = (props) => {
  console.log('props:', props);
  const { title, description, image } = props;

  return (
    <Head>
      <title>{title ? `${title} | AudiusTree` : DEFAULT_TITLE}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="#MOOMBAHTON" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@moomahfy" />
      <meta name="twitter:creator" content="@moomahfy" />

      {/* <meta property="og:url" content="https://audiustree.vercel.app/" /> */}
      <meta property="og:title" content={title ? title : DEFAULT_TITLE} />
      <meta
        property="og:description"
        content={description ? description : DEFAULT_DESCRIPTION}
      />
      <meta property="og:image" content={image ? image : DEFAULT_IMAGE} />
    </Head>
  );
};

export default DefaultHead;
