import { useState } from 'react';
import useSWR from 'swr';
import getHost from '../../lib/getHost';
import AudiusHead from '../../components/Head';
import Link from 'next/link';
import approx from 'approximate-number';
import styles from '../../styles/Track.module.css';
import styled from 'styled-components';
import TimeFormat from 'hh-mm-ss';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AlbumIcon from '@material-ui/icons/Album';
import AudiusButton from '../../components/Audius/Button';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Track({ track, errorCode }) {
  // const router = useRouter();
  // const { id } = router.query;
  // const { data: track, error } = useSWR(`/api/tracks/${id}`, fetcher);

  if (errorCode) console.log('ErrorCode:', errorCode);

  return (
    <div>
      <AudiusHead
        title={track ? `${track.title}` : null}
        description={track ? track.description : null}
        image={
          track
            ? track.artwork
              ? track.artwork['480x480']
              : 'https://i.imgur.com/iajv7J1.png'
            : 'https://i.imgur.com/iajv7J1.png'
        }
      />
      <Container maxWidth="lg">
        <TrackInfo track={track} />
      </Container>
    </div>
  );
}

const TrackInfo = ({ track }) => {
  console.log('TRACK:', track);
  if (!track) return <LoadingTrackInfo />;

  return (
    <>
      <Grid container spacing={1} style={{ width: '100%', margin: 0 }}>
        <div
          style={{
            backgroundColor: '#181818',
            padding: '40px 30px 30px 30px',
            borderRadius: '0px 0px 4px 4px',
            width: '100%',
          }}
        >
          <Grid item container justify="center">
            <a
              target="_blank"
              rel="noopener"
              href={`https://audius.co${track.permalink}`}
              style={{
                marginBottom: 20,
              }}
            >
              <Avatar
                variant="square"
                src={track.artwork ? track.artwork['480x480'] : ''}
                style={{
                  width: 175,
                  height: 175,
                  borderRadius: 4,
                  boxShadow:
                    'rgb(0 0 0) -10px 0px 13px -7px, rgb(0 0 0) 10px 0px 13px -7px, rgb(0 0 0 / 76%) 0px 0px 30px -2px',
                }}
              >
                <AlbumIcon style={{ width: 150, height: 150 }} />
              </Avatar>
            </a>
          </Grid>

          <PlayTrackButton track={track} />

          <Grid item container justify="center">
            <Typography
              variant="inherit"
              component="h1"
              align="center"
              style={{ wordBreak: 'break-word' }}
            >
              {track.title}
            </Typography>
          </Grid>

          <Grid item container justify="center" spacing={1}>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {track.user.name}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                #{track.genre}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {TimeFormat.fromS(track.duration)}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {new Date(track.release_date).getUTCFullYear()}
              </Typography>
            </Grid>
          </Grid>

          <TrackStats track={track} />

          <Grid item container justify="center">
            <Typography
              variant="subtitle2"
              color="textSecondary"
              align="center"
              style={{ wordBreak: 'break-word' }}
            >
              {track.description}
            </Typography>
          </Grid>

          <Grid item container justify="center">
            <AudiusButton href={`https://audius.co${track.permalink}`} />
          </Grid>
        </div>

        <Grid
          item
          container
          alignItems="center"
          spacing={1}
          style={{ margin: '5px 0px' }}
        >
          <Grid item xs>
            <hr style={{ borderColor: 'gray', margin: 0 }} />
          </Grid>
          <Grid item>
            <Typography
              variant="inherit"
              component="h4"
              align="center"
              style={{ textTransform: 'uppercase' }}
            >
              Artist info
            </Typography>
          </Grid>
          <Grid item xs>
            <hr style={{ borderColor: 'gray', margin: 0 }} />
          </Grid>
        </Grid>

        <Link href={`/user/${track.user.handle}`}>
          <a style={{ width: '100%' }}>
            <UserPreview user={track.user} />
          </a>
        </Link>
      </Grid>
    </>
  );
};

function LoadingTrackInfo() {
  return (
    <div>
      <div style={{ backgroundColor: 'rgb(0,0,0,0.5)', padding: 50 }}>
        <Grid container spacing={1}>
          <Grid item container justify="center">
            <Skeleton
              variant="rect"
              width={175}
              height={175}
              style={{ borderRadius: 4 }}
            />
          </Grid>
          <Grid item container justify="center">
            <Skeleton
              variant="rect"
              width="100%"
              height={40}
              style={{ maxWidth: 600, borderRadius: 4 }}
            />
          </Grid>
          <Grid item container justify="center">
            <Skeleton variant="rect" width="50%" height={40} />
          </Grid>
          <Grid item container justify="center">
            <Skeleton variant="rect" width="30%" height={20} />
          </Grid>
          <Grid item container justify="center">
            <Skeleton variant="rect" width="50%" height={40} />
          </Grid>
        </Grid>
      </div>

      <Grid
        container
        spacing={1}
        alignItems="center"
        style={{ margin: '12px 0px' }}
      >
        <Grid item xs>
          <hr style={{ borderColor: 'gray' }} />
        </Grid>
        <Grid item style={{ fontWeight: 'bold' }}>
          ARTIST INFO
        </Grid>
        <Grid item xs>
          <hr style={{ borderColor: 'gray' }} />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        style={{ padding: '0px 10px' }}
        alignItems="center"
      >
        <Grid item>
          <Skeleton variant="circle" width={150} height={150} />
        </Grid>
        <Grid item xs>
          <Skeleton variant="rect" width="100%" height={130} />
        </Grid>
      </Grid>
    </div>
  );
}

const PlayTrackButton = ({ track }) => {
  return (
    <Grid item container justify="center" style={{ display: 'none' }}>
      <a onClick={() => console.log(track)} className={styles.playButton}>
        <PlayArrowRoundedIcon style={{ marginRight: 4 }} />
        Play Track
      </a>
    </Grid>
  );
};

const PlayButton = styled.a`
  display: flex;
  background: #02e976;
  color: black;
  padding: 4px;
  margin: 8px 0px 8px 0px;
  border-radius: 4px;
  width: 100%;
  max-width: 500px;
  text-align: center;
  font-weight: 600;
  text-transform: capitalize;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const TrackStats = ({ track }) => {
  return (
    <Grid item container spacing={2} justify="center">
      <Grid item>
        <Typography gutterBottom variant="subtitle2" color="textSecondary">
          {approx(track.play_count)}{' '}
          <span className={styles.statTitle}>plays</span>
        </Typography>
      </Grid>

      <Grid item>
        <Typography gutterBottom variant="subtitle2" color="textSecondary">
          {approx(track.repost_count)}{' '}
          <span className={styles.statTitle}>reposts</span>
        </Typography>
      </Grid>

      <Grid item>
        <Typography gutterBottom variant="subtitle2" color="textSecondary">
          {approx(track.favorite_count)}{' '}
          <span className={styles.statTitle}>favorites</span>
        </Typography>
      </Grid>
    </Grid>
  );
};

const UserPreview = ({ user }) => {
  console.log(user);

  return (
    <Grid container>
      <Grid
        item
        container
        alignItems="center"
        style={{
          backgroundImage: user.cover_photo
            ? `url(${user.cover_photo['2000x']})`
            : '',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundColor: 'black',
          minHeight: 200,
          borderRadius: 4,
          margin: 0,
          overflow: 'hidden',
          boxShadow:
            '0px 10px 13px -7px rgb(0,0,0,0.8), -3px 44px 0px 5px rgba(0,0,0,0)',
        }}
      >
        <Grid item style={{ padding: 20 }}>
          <Avatar
            src={
              user.profile_picture
                ? user.profile_picture['480x480']
                : 'https://i.imgur.com/iajv7J1.png'
            }
            style={{
              width: 150,
              height: 150,
              marginRight: 10,
            }}
          />
        </Grid>

        <Grid
          item
          xs
          style={{
            backgroundColor: 'rgb(0,0,0, 0.85)',
            padding: '10px 16px 16px 16px',
            borderRadius: '10px 0px 0px 4px',
          }}
        >
          <Grid item>
            <Typography
              variant="inherit"
              component="h1"
              noWrap
              style={{ fontSize: 35, margin: 0 }}
            >
              {user.name}
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              style={{ display: 'flex', alignItems: 'center' }}
              gutterBottom
              noWrap
            >
              @{user.handle}
              {user.is_verified && (
                <CheckCircleIcon
                  style={{ marginLeft: 4, fontSize: 15, color: '#02e976' }}
                />
              )}
            </Typography>
          </Grid>

          <Grid item container spacing={1}>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {approx(user.track_count)}{' '}
                <span className={styles.statTitle}>tracks</span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {approx(user.follower_count)}{' '}
                <span className={styles.statTitle}>followers</span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {approx(user.followee_count)}{' '}
                <span className={styles.statTitle}>following</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const StatTitle = styled.span`
  color: whitesmoke;
  text-transform: capitalize;
`;

export async function getServerSideProps({ params }) {
  const host = await getHost();
  // const host = 'https://dn1.monophonic.digital';
  const appName = process.env.APP_NAME;

  const url = `${host}/v1/tracks/${params.id}?app_name=${appName}`;

  console.log('/TRACKS/:ID', url);

  const result = await fetch(url);
  const json = await result.json();

  return {
    props: {
      track: json.data,
    }, // will be passed to the page component as props
  };
}
