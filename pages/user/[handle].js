import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import styles from '../../styles/User.module.css';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import approx from 'approximate-number';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TrackList from '../../components/TrackList/TrackList';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function User() {
  const router = useRouter();
  const { handle } = router.query;
  const { data: user, error: userError } = useSWR(
    `/api/user/${handle}`,
    fetcher
  );

  console.log('USER:', user);

  if (!user) return <div>Loading User</div>;

  return (
    <div>
      <Head>
        <title>{user ? `${user.name} | AudiusTree` : 'AudiusTree'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        style={{
          width: '100%',
          height: 240,
          backgroundColor: '#111111',
          backgroundImage: `url(${
            user.cover_photo
              ? user.cover_photo['2000x']
              : 'https://i.imgur.com/Ut6DnI5.jpg'
          })`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Container maxWidth="md">
        <UserInfo user={user} />
        <UserTracks id={user.id} />
      </Container>
    </div>
  );
}

const UserInfo = ({ user }) => {
  return (
    <>
      <Grid
        container
        justify="space-between"
        style={{ padding: '20px 0px 10px 0px' }}
        spacing={4}
      >
        <Grid item>
          <Avatar
            src={
              user.profile_picture
                ? user.profile_picture['480x480']
                : 'https://i.imgur.com/iajv7J1.png'
            }
            style={{
              height: 100,
              width: 100,
              border: '4px solid rgb(255, 255, 255, 0.7)',
            }}
          />
        </Grid>

        <Grid item xs style={{ maxWidth: 600 }}>
          <Grid container justify="space-between" spacing={1}>
            <UserStat value={user.track_count} text="tracks" />
            <UserStat value={user.follower_count} text="followers" />
            <UserStat value={user.followee_count} text="following" />
          </Grid>

          <Grid container>
            <FollowButton
              href={`https://audius.co/${user.handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on <Audius src="https://i.imgur.com/TdeeCK8.png" />
            </FollowButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Typography variant="inherit" component="h1" style={{ fontSize: 40 }}>
            {user.name}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            @{user.handle}
            {user.is_verified && (
              <CheckCircleIcon
                style={{ color: '#02e976', fontSize: 14, marginLeft: 4 }}
              />
            )}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            {user.bio}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">
            {user.location}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const UserTracks = ({ id }) => {
  console.log(id);
  const { data: tracks, error: tracksError } = useSWR(
    `/api/user/tracks/${id}`,
    fetcher
  );

  console.log('Tracks:', tracks);

  return <TrackList tracks={tracks} />;
};

function UserStat({ value, text }) {
  return (
    <Grid item xs>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="inherit" component="h2" align="center">
            {approx(value)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary" align="center">
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

const FollowButton = styled.a`
  display: flex;
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  font-size: 15px;
  font-weight: 650;
  letter-spacing: 1px;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #c50000;
  border-radius: 4px;
`;

const Audius = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  margin-left: 0.3rem;
`;
