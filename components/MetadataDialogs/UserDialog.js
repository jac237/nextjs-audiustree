import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function UserDialog({ user, open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent style={{ paddingBottom: 50, paddingTop: 30 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="inherit" component="h1" align="center">
              {user.name}
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
                <Link href={`/user/${user.handle}`}>{`@${user.handle}`}</Link>
              </UserLink>
              {user.is_verified && (
                <CheckCircleIcon
                  style={{ color: '#02e976', fontSize: 14, marginLeft: 4 }}
                />
              )}
            </Typography>
          </Grid>

          <UserInfo
            userId={user.id}
            x150={user.profile_picture ? user.profile_picture['150x150'] : null}
            x480={user.profile_picture ? user.profile_picture['480x480'] : null}
            x1000={
              user.profile_picture ? user.profile_picture['1000x1000'] : null
            }
          />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

const UserInfo = ({ userId, x150, x480, x1000 }) => {
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
      <Grid item container justify="center" alignItems="center">
        <Grid item>
          <CopyToClipboard text={userId} onCopy={() => handleSnackbar(userId)}>
            <InfoTitle>USER_ID: "{userId}"</InfoTitle>
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
              <Avatar src={x150} style={{ width: 80, height: 80 }} />
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
              <Avatar src={x480} style={{ width: 100, height: 100 }} />
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
              <Avatar src={x1000} style={{ width: 120, height: 120 }} />
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
