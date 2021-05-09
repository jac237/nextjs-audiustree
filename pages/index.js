import React, { useState } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
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
        <HomeTitle />
        <TrackList tracks={tracks} />
      </main>
    </Container>
  );
}

const HomeTitle = () => {
  return (
    <>
      <div style={{ padding: '20px 0px 10px 0px' }}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography
              variant="inherit"
              component="h1"
              style={{ textTransform: 'capitalize' }}
            >
              Featured tracks
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant="inherit"
              component="h5"
              color="textSecondary"
              style={{ textTransform: 'uppercase' }}
            >
              <img
                alt="moombahton-fire"
                src="https://i.imgur.com/O4bkcwy.png"
                style={{
                  width: 18,
                  height: 18,
                  marginRight: 2,
                }}
              />
              = Moombahton
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            We just know know you'll love these tracks! Make sure to check out
            these artists & give them a follow on Audius!
          </Typography>
        </Grid>

        <Grid container>
          <a className={styles.startPlayingButton}>
            <PlayArrowRoundedIcon style={{ marginRight: 4 }} />
            Start playing
          </a>
        </Grid>
      </div>
    </>
  );
};
