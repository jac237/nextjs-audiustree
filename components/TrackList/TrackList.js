import React, { useState, createRef } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTrack, selectCurrentTrack } from '../../redux/playerSlice';
import styles from './TrackList.module.css';
import approx from 'approximate-number';
import styled from 'styled-components';
import TimeFormat from 'hh-mm-ss';
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
import TwitterIcon from '@material-ui/icons/Twitter';
import AlbumIcon from '@material-ui/icons/Album';
import PersonIcon from '@material-ui/icons/Person';
import CodeIcon from '@material-ui/icons/Code';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import Skeleton from '@material-ui/lab/Skeleton';
import TrackDialog from '../MetadataDialogs/TrackDialog';
import getTweetIntent from '../../lib/getTweetIntent';

const useStyles = makeStyles((theme) => ({
  listAvatar: {
    minWidth: 75,
    [theme.breakpoints.up('sm')]: {
      minWidth: 95,
    },
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 4,
    [theme.breakpoints.up('sm')]: {
      width: 80,
      height: 80,
    },
  },
  albumIcon: {
    width: 50,
    height: 50,
    [theme.breakpoints.up('sm')]: {
      width: 70,
      height: 70,
    },
  },
}));

export default function TrackList({ tracks }) {
  return (
    <List style={{ width: '100%' }}>
      {Boolean(tracks)
        ? tracks.map((track) => <TrackListItem track={track} key={track.id} />)
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <LoadingListItem key={index} />
          ))}
    </List>
  );
}

const initialState = {
  mouseX: null,
  mouseY: null,
};

const TrackListItem = ({ track }) => {
  const classes = useStyles();
  // const currentTrack = useSelector(selectCurrentTrack);
  // const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const menuRef = React.createRef();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTrackClick = (track) => {
    console.log('Clicked track:', track);
    // dispatch(setCurrentTrack(track));
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleCloseContext = () => {
    setState(initialState);
  };

  const MenuItems = ({ track, onMenuClose }) => {
    const handleDialogClick = () => {
      onMenuClose();
      setDialogOpen(true);
    };

    const handleDialogClose = () => {
      setDialogOpen(false);
    };

    return (
      <>
        <MenuItem onClick={handleDialogClick}>
          <CodeIcon className={styles.menuIcon} />
          <Typography variant="subtitle2">View Metadata</Typography>
        </MenuItem>

        <Link href={`/tracks/${track.id}`}>
          <MenuItem onClick={onMenuClose}>
            <AlbumIcon className={styles.menuIcon} />
            <Typography variant="subtitle2">View Track</Typography>
          </MenuItem>
        </Link>

        <Link href={`/user/${track.user.handle}`}>
          <MenuItem onClick={onMenuClose}>
            <PersonIcon className={styles.menuIcon} />
            <Typography variant="subtitle2">View Artist</Typography>
          </MenuItem>
        </Link>

        <a
          target="_blank"
          rel="noopener noreferrer"
          component="div"
          href={getTweetIntent(track.id)}
        >
          <MenuItem onClick={onMenuClose}>
            <TwitterIcon className={styles.menuIcon} />
            <Typography variant="subtitle2">Share</Typography>
          </MenuItem>
        </a>

        <TrackDialog
          track={track}
          open={isDialogOpen}
          handleClose={handleDialogClose}
        />
      </>
    );
  };

  return (
    <>
      <ListItem
        button
        onClick={() => handleTrackClick(track)}
        onContextMenu={handleRightClick}
      >
        <ListItemAvatar className={classes.listAvatar}>
          {track.artwork ? (
            <Avatar
              variant="square"
              src={track.artwork['150x150']}
              className={classes.avatar}
            />
          ) : (
            <Avatar variant="square" className={classes.avatar}>
              <AlbumIcon className={classes.albumIcon} />
            </Avatar>
          )}
        </ListItemAvatar>

        <ListItemText
          style={{ width: '100%' }}
          disableTypography
          primary={
            <Typography variant="inherit" component="h3" noWrap>
              {track.title}
            </Typography>
          }
          secondary={
            <div>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                noWrap
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {track.user.name}
                {track.user.is_verified && (
                  <CheckCircleIcon
                    style={{
                      color: '#02e976',
                      fontSize: 14,
                      marginLeft: 4,
                    }}
                  />
                )}
              </Typography>
              {/* {currentTrack?.id === track.id ? (
                <Typography
                  variant="subtitle2"
                  className={styles.nowPlaying}
                  noWrap
                >
                  <EqualizerIcon
                    style={{ marginRight: 4, fontSize: 18 }}
                    color="inherit"
                  />
                  Now Playing
                </Typography>
              ) : ( */}
              <Typography
                variant="subtitle2"
                color="textSecondary"
                noWrap
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <PlayArrowRoundedIcon
                  style={{
                    color: 'inherit',
                    fontSize: 20,
                    marginRight: 4,
                    marginLeft: '-4px',
                  }}
                />
                {approx(track.play_count)}
              </Typography>
              {/* )} */}
            </div>
          }
        />

        {track?.genre === 'Moombahton' && (
          <img
            alt="moombahton-fire"
            src="https://i.imgur.com/O4bkcwy.png"
            style={{
              width: 18,
              height: 18,
              marginRight: 8,
              marginLeft: 4,
            }}
          />
        )}
        <ListItemSecondaryAction
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
            padding: '8px 0px',
          }}
        >
          <Typography variant="caption" color="textSecondary">
            {TimeFormat.fromS(track.duration)}
          </Typography>

          <IconButton
            aria-label="more-info"
            size="small"
            onClick={handleMenuClick}
          >
            <MoreHorizIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Menu
        id="track-button-menu"
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItems track={track} onMenuClose={handleMenuClose} />
      </Menu>

      <Menu
        id="track-context-menu"
        keepMounted
        open={state.mouseY !== null}
        onClose={handleCloseContext}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItems track={track} onMenuClose={handleCloseContext} />
      </Menu>
    </>
  );
};

const LoadingListItem = () => {
  const classes = useStyles();

  return (
    <ListItem button>
      <ListItemAvatar className={classes.listAvatar}>
        <Skeleton animation="wave" variant="rect" className={classes.avatar} />
      </ListItemAvatar>

      <ListItemText
        primary={<Skeleton animation="wave" variant="text" width="60%" />}
        secondary={<Skeleton animation="wave" variant="text" width="20%" />}
      />
    </ListItem>
  );
};
