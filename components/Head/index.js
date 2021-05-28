import React from 'react';
import Head from 'next/head';

const DEFAULT_TITLE = 'AudiusTree | Next.js #AudiusAPI';

const DefaultHead = (props) => {
  console.log('props:', props);
  const { title } = props;

  return (
    <Head>
      <title>{title ? `${title} | AudiusTree` : DEFAULT_TITLE}</title>
      <meta name="description" content="#MOOMBAHFY" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default DefaultHead;
