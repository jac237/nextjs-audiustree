import { useState } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/User.module.css';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import TimeFormat from 'hh-mm-ss';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AlbumIcon from '@material-ui/icons/Album';
import GroupIcon from '@material-ui/icons/Group';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import TrackList from '../../components/TrackList/TrackList';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Track = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: track, error } = useSWR(`/api/tracks/${id}`, fetcher);

  if (error) console.log(error);
  if (track) console.log(track);
  if (!track) return <div>Loading tracks....</div>;

  return (
    <div>
      <Grid
        container
        style={{ padding: '50px 0px', background: 'rgb(0,0,0,0.4)' }}
      >
        <Grid item style={{ padding: '0px 40px 0px 40px' }}>
          <img
            src={track.artwork ? track.artwork['480x480'] : ''}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </Grid>

        <Grid item container justify="flex-start" xs>
          <Grid container direction="column" justify="flex-end">
            <Grid item>
              <Typography
                variant="inherit"
                component="h1"
                style={{ fontSize: 50 }}
              >
                {track.title}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                {track.user.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/** USER PREVIEW */}
    </div>
  );
};

export default Track;
