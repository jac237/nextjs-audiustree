import React, { useState, useEffect } from 'react';
import AudiusHead from '../../components/Head';
import Link from 'next/link';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import playlists from '../../lib/playlists.json';
import approx from 'approximate-number';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    [theme.breakpoints.up('sm')]: {
      width: 130,
      height: 130,
    },
  },
  verified: {
    color: 'rgb(12 209 167)',
    fontSize: 20,
    marginBottom: '2rem',
    marginRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: 26,
      marginRight: '1.5rem',
    },
  },
}));

export default function FeaturedPlaylists() {
  return (
    <div>
      <AudiusHead title="Featured Playlists" />
      <Container>
        <div>
          <Typography
            variant="inherit"
            component="h1"
            style={{ textTransform: 'capitalize', marginTop: 10 }}
          >
            Featured playlists
          </Typography>
        </div>
        <Grid
          container
          spacing={3}
          justify="center"
          style={{ width: '100%', margin: 0 }}
        >
          {playlists?.map((playlist) => (
            <PlaylistTile key={playlist.id} id={playlist.id} />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

const PlaylistTile = ({ id }) => {
  const classes = useStyles();
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    console.log('calling api');
    const API_URL = `https://dn-jpn.audius.metadata.fyi/v1/playlists/${id}?app_name=AudiusTree`;
    // console.log(API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => json.data)
      .then((playlist) => {
        console.log(playlist);
        if (playlist) {
          setPlaylist(playlist[0]);
        }
      });
  }, []);

  if (!playlist) return null;

  const cover = playlist.artwork ? playlist.artwork['150x150'] : '';
  const title = (
    <Typography variant="inherit" component="h3" align="center" noWrap>
      {playlist.playlist_name}
    </Typography>
  );
  const subTitle = (
    <Typography variant="subtitle2" color="textSecondary" align="center" noWrap>
      {approx(playlist.total_play_count)}{' '}
      <span style={{ color: 'white' }}>Plays</span>
    </Typography>
  );

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      lg={2}
      onClick={() => console.log(playlist)}
    >
      <Grid
        item
        container
        justify="center"
        spacing={2}
        style={{
          background: 'rgb(0,0,0,0.5)',
          padding: '20px 10px',
          borderRadius: 4,
        }}
      >
        <Grid item container justify="center">
          <a
            href={`https://audius.co/playlists/${playlist.id}`}
            target="_blank"
            rel="noopener"
          >
            <Avatar variant="square" src={cover} className={classes.avatar} />
          </a>
        </Grid>
        <Grid item zeroMinWidth>
          {title}
          {subTitle}
        </Grid>
      </Grid>
    </Grid>
  );
};
