import React, { useState } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import TrackList from '../components/TrackList/TrackList';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data: tracks, error } = useSWR('/api/reposts', fetcher);

  if (error) console.log('Failed to load Home tracks');

  return (
    <Container>
      <Head>
        <title>AudiusTree | Next.js</title>
        <meta name="description" content="#MOOMBAHFY" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to <span style={{ color: 'gold' }}>AudiusTree!</span>
        </h1>

        <p>
          Get started by editing{' '}
          <code
            style={{
              backgroundColor: 'black',
              padding: 6,
              borderRadius: 4,
              fontWeight: 'bold',
            }}
          >
            pages/index.js
          </code>
        </p>

        <TrackList tracks={tracks} />
      </main>
    </Container>
  );
}
