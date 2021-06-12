import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import approx from 'approximate-number';
import styles from '../../styles/Track.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function TrackDialog({ track, open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent style={{ paddingBottom: 50, paddingTop: 30 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="inherit"
              component="h2"
              align="center"
              style={{ wordBreak: 'break-word' }}
            >
              <UserLink onClick={handleClose}>
                <Link href={`/tracks/${track.id}`}>{track.title}</Link>
              </UserLink>
            </Typography>

            <Typography
              variant="subtitle2"
              color="textSecondary"
              align="center"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UserLink onClick={handleClose}>
                <Link href={`/user/${track.user.handle}`}>
                  {track.user.name}
                </Link>
              </UserLink>
              {track.user.is_verified && (
                <CheckCircleIcon
                  style={{ color: '#02e976', fontSize: 14, marginLeft: 4 }}
                />
              )}
            </Typography>
          </Grid>

          <TrackStats
            reposts={track.repost_count}
            plays={track.play_count}
            likes={track.favorite_count}
          />

          <Grid
            item
            container
            justify="center"
            style={{ marginTop: '-10px', wordBreak: 'break-word' }}
          >
            <Grid item>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="center"
              >
                {track.description}
              </Typography>
            </Grid>
          </Grid>

          <TrackInfo
            trackId={track.id}
            userId={track.user.id}
            x150={track.artwork ? track.artwork['150x150'] : null}
            x480={track.artwork ? track.artwork['480x480'] : null}
            x1000={track.artwork ? track.artwork['1000x1000'] : null}
          />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

const TrackStats = ({ reposts, plays, likes }) => {
  return (
    <Grid item container spacing={2} justify="center">
      <Grid item>
        <Typography gutterBottom variant="subtitle2" color="textSecondary">
          {approx(plays)} <span className={styles.statTitle}>plays</span>
        </Typography>
      </Grid>

      <Grid item>
        <Typography gutterBottom variant="subtitle2" color="textSecondary">
          {approx(reposts)} <span className={styles.statTitle}>reposts</span>
        </Typography>
      </Grid>

      <Grid item>
        <Typography gutterBottom variant="subtitle2" color="textSecondary">
          {approx(likes)} <span className={styles.statTitle}>favorites</span>
        </Typography>
      </Grid>
    </Grid>
  );
};

const TrackInfo = ({ trackId, userId, x150, x480, x1000 }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [key, setKey] = useState();

  const handleSnackbar = (key) => {
    setKey(key);
    setShowSnackbar(true);
  };

  const handleClose = () => {
    setShowSnackbar(false);
  };

  return (
    <Grid item container spacing={4}>
      <Grid item container justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <CopyToClipboard
            text={trackId}
            onCopy={() => handleSnackbar(trackId)}
          >
            <InfoTitle>TRACK_ID: {trackId}</InfoTitle>
          </CopyToClipboard>
        </Grid>

        <Grid item>
          <CopyToClipboard text={userId} onCopy={() => handleSnackbar(userId)}>
            <InfoTitle>USER_ID: {userId}</InfoTitle>
          </CopyToClipboard>
        </Grid>
      </Grid>

      <Grid item container spacing={1}>
        <Grid
          item
          container
          xs
          alignItems="center"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <a target="_blank" rel="noopener noreferrer" href={x150}>
              <img
                src={x150}
                style={{ width: 80, height: 80, borderRadius: 4 }}
              />
            </a>
          </Grid>

          <Grid item>
            <CopyToClipboard text={x150} onCopy={() => handleSnackbar(x150)}>
              <InfoTitle>150x150.jpg</InfoTitle>
            </CopyToClipboard>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs
          alignItems="center"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <a target="_blank" rel="noopener noreferrer" href={x480}>
              <img
                src={x150}
                style={{ width: 100, height: 100, borderRadius: 4 }}
              />
            </a>
          </Grid>

          <Grid item>
            <CopyToClipboard text={x480} onCopy={() => handleSnackbar(x480)}>
              <InfoTitle>480x480.jpg</InfoTitle>
            </CopyToClipboard>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs
          alignItems="center"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <a target="_blank" rel="noopener noreferrer" href={x1000}>
              <img
                src={x150}
                style={{ width: 120, height: 120, borderRadius: 4 }}
              />
            </a>
          </Grid>

          <Grid item>
            <CopyToClipboard text={x1000} onCopy={() => handleSnackbar(x1000)}>
              <InfoTitle>1000x1000.jpg</InfoTitle>
            </CopyToClipboard>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showSnackbar}
        onClose={handleClose}
        autoHideDuration={2000}
        key={key}
      >
        <Typography
          variant="subtitle2"
          align="center"
          style={{
            fontWeight: 700,
            backgroundColor: 'gold',
            color: 'black',
            padding: '6px 20px',
            borderRadius: 4,
            textTransform: 'uppercase',
          }}
        >
          copied!
        </Typography>
      </Snackbar>
    </Grid>
  );
};

const InfoTitle = styled.code`
  padding: 10px;
  background-color: rgb(0, 0, 0, 0.4);
  border-radius: 4px;
  text-align: center;
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const UserLink = styled.div`
  &:hover {
    text-decoration: underline;
    color: whitesmoke;
  }
`;
