import React, { useState } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import AlbumIcon from '@material-ui/icons/Album';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ImageIcon from '@material-ui/icons/Image';

export default function MetadataDialog({ track, open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent style={{ paddingBottom: 30, paddingTop: 30 }}>
        <Grid container spacing={1}>
          <Grid item container justify="center">
            {track.artwork ? (
              <Avatar
                variant="square"
                src={track.artwork['150x150']}
                style={{ width: 120, height: 120, borderRadius: 10 }}
              />
            ) : (
              <Avatar
                variant="square"
                style={{ width: 120, height: 120, borderRadius: 10 }}
              >
                <AlbumIcon style={{ width: 120, height: 120 }} />
              </Avatar>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="inherit" component="h2" align="center">
              {track.title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              align="center"
            >
              {track.user.name}
            </Typography>
          </Grid>

          <TracksStats
            reposts={track.repost_count}
            plays={track.play_count}
            likes={track.favorite_count}
          />

          <MetaInfo
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

const TracksStats = ({ reposts, plays, likes }) => {
  return (
    <Grid item container justify="center" alignItems="center" spacing={3}>
      <Grid item>
        <Grid container alignItems="center">
          <PlayArrowRoundedIcon style={{ color: 'gray', fontSize: 24 }} />
          <Typography variant="subtitle2">{reposts}</Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container alignItems="center">
          <RepeatRoundedIcon
            style={{ color: 'gray', fontSize: 20, marginRight: 2 }}
          />
          <Typography variant="subtitle2">{plays}</Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container alignItems="center">
          <FavoriteIcon
            style={{ color: 'gray', fontSize: 16, marginRight: 4 }}
          />
          <Typography variant="subtitle2">{likes}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const MetaInfo = ({ trackId, userId, x150, x480, x1000 }) => {
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
    <Grid item container spacing={1}>
      <Grid item container alignItems="center" spacing={2}>
        <Grid item container justify="center" xs>
          <InfoTitle>150x150.jpg</InfoTitle>
        </Grid>

        <Grid item container justify="center" xs>
          <CopyToClipboard text={x150} onCopy={() => handleSnackbar(x150)}>
            <IconButton>
              <CopyIcon />
            </IconButton>
          </CopyToClipboard>

          <IconButton target="_blank" rel="noopener noreferrer" href={x150}>
            <LinkIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item container alignItems="center" spacing={2}>
        <Grid item container justify="center" xs>
          <InfoTitle>480x480.jpg</InfoTitle>
        </Grid>

        <Grid item container justify="center" xs>
          <CopyToClipboard text={x480} onCopy={() => handleSnackbar(x480)}>
            <IconButton>
              <CopyIcon />
            </IconButton>
          </CopyToClipboard>

          <IconButton target="_blank" rel="noopener noreferrer" href={x480}>
            <LinkIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item container alignItems="center" spacing={2}>
        <Grid item container justify="center" xs>
          <InfoTitle>1000x1000.jpg</InfoTitle>
        </Grid>

        <Grid item container justify="center" xs>
          <CopyToClipboard text={x1000} onCopy={() => handleSnackbar(x1000)}>
            <IconButton>
              <CopyIcon />
            </IconButton>
          </CopyToClipboard>

          <IconButton target="_blank" rel="noopener noreferrer" href={x1000}>
            <LinkIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item container alignItems="center" spacing={2}>
        <Grid item container justify="center" xs>
          <InfoTitle>TRACK_ID: "{trackId}"</InfoTitle>
        </Grid>

        <Grid item container justify="center" xs>
          <CopyToClipboard
            text={trackId}
            onCopy={() => handleSnackbar(trackId)}
          >
            <IconButton>
              <CopyIcon />
            </IconButton>
          </CopyToClipboard>
        </Grid>
      </Grid>

      <Grid item container alignItems="center" spacing={2}>
        <Grid item container justify="center" xs>
          <InfoTitle>USER_ID: "{userId}"</InfoTitle>
        </Grid>

        <Grid item container justify="center" xs>
          <CopyToClipboard text={userId} onCopy={() => handleSnackbar(userId)}>
            <IconButton>
              <CopyIcon />
            </IconButton>
          </CopyToClipboard>
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
`;

const CopyIcon = styled(FileCopyOutlinedIcon)`
  color: darkgray;
`;

const LinkIcon = styled(ImageIcon)`
  color: darkgray;
`;
