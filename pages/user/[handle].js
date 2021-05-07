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
import Skeleton from '@material-ui/lab/Skeleton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TrackList from '../../components/TrackList/TrackList';
import UserDialog from '../../components/MetadataDialogs/UserDialog';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function User() {
  const router = useRouter();
  const { handle } = router.query;
  const { data: user, error: userError } = useSWR(
    `/api/user/${handle}`,
    fetcher
  );

  console.log('USER:', user);

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
            user?.cover_photo
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
        <UserTracks id={user?.id} handle={user?.handle} />
      </Container>
    </div>
  );
}

// TODO: ADD BUTTON FOR USER ID METADATA
const UserInfo = ({ user }) => {
  if (!user) return <LoadingUserInfo />;

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <UserDialog
        user={user}
        open={isDialogOpen}
        handleClose={handleDialogClose}
      />
      <Grid
        container
        justify="space-between"
        style={{ padding: '20px 0px 10px 0px' }}
        spacing={4}
      >
        <Grid item>
          <Avatar
            onClick={handleDialogClick}
            src={
              user.profile_picture
                ? user.profile_picture['480x480']
                : 'https://i.imgur.com/iajv7J1.png'
            }
            style={{
              height: 150,
              width: 150,
              // border: '4px solid rgb(255, 255, 255, 0.7)',
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

const LoadingUserInfo = () => {
  return (
    <Grid
      container
      direction="column"
      spacing={1}
      style={{ margin: 0, width: '100%' }}
    >
      <Grid item container alignItems="center">
        <Grid item xs={4}>
          <Skeleton
            animation="wave"
            variant="circle"
            width={150}
            height={150}
          />
        </Grid>

        <Grid item xs={8}>
          <RoundSkeleton
            animation="wave"
            variant="rect"
            width="100%"
            height={120}
          />
        </Grid>
      </Grid>

      <Grid item container>
        <RoundSkeleton
          animation="wave"
          variant="rect"
          width="30%"
          height={50}
        />
      </Grid>

      <Grid item container>
        <RoundSkeleton
          animation="wave"
          variant="rect"
          width="100%"
          height={100}
        />
      </Grid>
    </Grid>
  );
};

const UserTracks = ({ id, handle }) => {
  console.log('USER_ID:', id);

  if (!id) return <TrackList />;

  const { data: tracks, error: tracksError } = useSWR(
    `/api/user/tracks/${id}`,
    fetcher
  );

  console.log('User tracks:', tracks);

  return (
    <>
      <TrackList tracks={tracks} />
      {tracks?.length >= 100 && (
        <Grid container justify="center">
          <Typography
            variant="subtitle2"
            color="textSecondary"
            align="center"
            style={{ border: '1px solid gray', padding: 10, borderRadius: 4 }}
          >
            <a
              href={`https://audius.co/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              All tracks on <Audius src="https://i.imgur.com/TdeeCK8.png" />
            </a>
          </Typography>
        </Grid>
      )}
    </>
  );
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

const RoundSkeleton = styled(Skeleton)`
  border-radius: 4px;
`;
