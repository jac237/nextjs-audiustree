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
import GroupIcon from '@material-ui/icons/Group';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Skeleton from '@material-ui/lab/Skeleton';
import MetadataDialog from '../MetadataDialog/MetadataDialog';
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

const TrackListItem = ({ track }) => {
  const currentTrack = useSelector(selectCurrentTrack);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleMenuClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTrackClick = (track) => {
    console.log('Clicked track:', track);
    dispatch(setCurrentTrack(track));
  };

  const handleDialogClick = () => {
    setAnchorEl(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <ListItem button onClick={() => handleTrackClick(track)}>
        <ListItemAvatar>
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
                <UserLink>
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
            )
          }
        />

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
        id="track-menu"
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
        keepMounted
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={getTweetIntent(track.id)}
        >
          <MenuItem onClick={handleMenuClose}>
            <TwitterIcon className={styles.menuIcon} />
            <Typography variant="subtitle2">Share</Typography>
          </MenuItem>
        </a>

        <Link href={`/user/${track.user.handle}`}>
          <MenuItem onClick={handleMenuClose}>
            <GroupIcon className={styles.menuIcon} />
            <Typography variant="subtitle2">View Artist</Typography>
          </MenuItem>
        </Link>

        <Link href={`/tracks/${track.id}`}>
          <MenuItem onClick={handleMenuClose}>
            <AlbumIcon className={styles.menuIcon} />
            <Typography variant="subtitle2">View Track</Typography>
          </MenuItem>
        </Link>

        <MenuItem onClick={handleDialogClick}>
          <ArtTrackIcon className={styles.menuIcon} />
          <Typography variant="subtitle2">View Metadata</Typography>
        </MenuItem>
      </Menu>

      <MetadataDialog
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
        <Avatar variant="square">
          <AlbumIcon style={{ height: 40, width: 40 }} />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={<Skeleton animation="wave" variant="text" width="50%" />}
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
