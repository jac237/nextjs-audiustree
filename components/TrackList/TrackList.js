import { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTrack, selectCurrentTrack } from '../../redux/playerSlice';
import styles from './TrackList.module.css';
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
import Skeleton from '@material-ui/lab/Skeleton';
import TrackDialog from '../MetadataDialogs/TrackDialog';
import getTweetIntent from '../../lib/getTweetIntent';

export default function TrackList({ tracks }) {
  return (
    <List>
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
  const currentTrack = useSelector(selectCurrentTrack);
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTrackClick = (track) => {
    console.log('Clicked track:', track);
    dispatch(setCurrentTrack(track));
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

  return (
    <>
      <ListItem
        button
        onClick={() => handleTrackClick(track)}
        onContextMenu={handleRightClick}
      >
        <ListItemAvatar style={{ minWidth: 60 }}>
          {track.artwork ? (
            <Avatar
              variant="square"
              src={track.artwork['150x150']}
              style={{ width: 48, height: 48 }}
            />
          ) : (
            <Avatar variant="square" style={{ width: 48, height: 48 }}>
              <AlbumIcon style={{ height: 40, width: 40 }} />
            </Avatar>
          )}
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography variant="inherit" component="h3" noWrap>
              {track.title}
            </Typography>
          }
          secondary={
            currentTrack?.id === track.id ? (
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
            ) : (
              <Typography
                variant="subtitle2"
                color="textSecondary"
                noWrap
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {track.user.name}
                {track.user.is_verified && (
                  <CheckCircleIcon
                    style={{ color: '#02e976', fontSize: 14, marginLeft: 4 }}
                  />
                )}
              </Typography>
            )
          }
        />

        {track?.genre === 'Moombahton' && (
          <img
            alt="fire"
            src="https://i.imgur.com/O4bkcwy.png"
            style={{
              width: 18,
              height: 18,
              marginRight: 8,
            }}
          />
        )}

        <ListItemSecondaryAction
          style={{
            display: 'flex',
            flexDirection: 'column',
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
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
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

const MenuItems = ({ track, onMenuClose }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogClick = () => {
    onMenuClose();
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={getTweetIntent(track.id)}
      >
        <MenuItem onClick={onMenuClose}>
          <TwitterIcon className={styles.menuIcon} />
          <Typography variant="subtitle2">Share</Typography>
        </MenuItem>
      </a>

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

      <MenuItem onClick={handleDialogClick}>
        <CodeIcon className={styles.menuIcon} />
        <Typography variant="subtitle2">View Metadata</Typography>
      </MenuItem>

      <TrackDialog
        track={track}
        open={isDialogOpen}
        handleClose={handleDialogClose}
      />
    </>
  );
};

const LoadingListItem = () => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Skeleton animation="wave" variant="rect" width={40} height={40} />
      </ListItemAvatar>

      <ListItemText
        primary={<Skeleton animation="wave" variant="text" width="60%" />}
        secondary={<Skeleton animation="wave" variant="text" width="20%" />}
      />
    </ListItem>
  );
};

const UserLink = styled.div`
  &:hover {
    text-decoration: underline;
    color: whitesmoke;
  }
`;
