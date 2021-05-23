import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 100,
    height: 100,
    [theme.breakpoints.up('sm')]: {
      width: 120,
      height: 120,
    },
  },
  verified: {
    color: '#02e976',
    fontSize: 22,
    marginBottom: '2rem',
    marginRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: 26,
      marginRight: '1.5rem',
    },
  },
}));

export default function FeaturedArtists() {
  const classes = useStyles();
  const [tracks, setTracks] = useState([]);
  const [users, setUsers] = useState([]);
  // console.log(tracks.map(track => track.id));
  console.log(users);

  useEffect(() => {
    console.log('calling api');
    const API_URL =
      'https://discoveryprovider.audius.co/v1/playlists/DNgQ8/tracks?app_name=AudiusTree';
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => json.data)
      .then((tracks) => {
        setTracks(tracks);
        let uniqueUsers = [];
        const uniqueIds = [...new Set(tracks.map((track) => track.user.id))];
        console.log(uniqueIds);

        uniqueIds.forEach((id) => {
          for (let i = 0; i < tracks.length; i++) {
            if (id === tracks[i].user.id) {
              uniqueUsers.push(tracks[i].user);
              break;
            }
          }
        });

        setUsers(uniqueUsers);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Featured Artists | AudiusTree</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <div>
          <Typography
            variant="inherit"
            component="h1"
            style={{ textTransform: 'capitalize', marginTop: 10 }}
          >
            Featured artists
          </Typography>
        </div>
        <Grid
          container
          spacing={3}
          justify="center"
          style={{ margin: 0, width: '100%' }}
        >
          {users?.map((user) => {
            const cover = user.profile_picture
              ? user.profile_picture['150x150']
              : '';
            const title = (
              <Typography
                variant="inherit"
                component="h2"
                align="center"
                noWrap
              >
                {user.name}
              </Typography>
            );
            const subTitle = (
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="center"
                noWrap
              >
                @{user.handle}
              </Typography>
            );

            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                onClick={() => console.log(user)}
                key={user.id}
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
                    <Badge
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      invisible={!user.is_verified}
                      badgeContent={
                        <CheckCircleIcon className={classes.verified} />
                      }
                    >
                      <Avatar src={cover} className={classes.avatar} />
                    </Badge>
                  </Grid>
                  <Grid item zeroMinWidth>
                    {title}
                    {subTitle}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
