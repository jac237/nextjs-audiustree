import React, { useState } from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SubscriptionsRoundedIcon from '@material-ui/icons/SubscriptionsRounded';
import TwitterIcon from '@material-ui/icons/Twitter';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SearchBar from '../Searchbar/Searchbar';
import AudiusIcon from '../Icons/AudiusIcon';
import SoundcloudIcon from '../Icons/SoundcloudIcon';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: '#000000',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: '#000000',
    borderRight: 'none',
  },
  content: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  listItem: {
    // color: 'lightgray',
    // borderRadius: 4,
    // paddingLeft: 10,
    // '&:hover': {
    //   color: 'white',
    // },
  },
  listItemIcon: {
    minWidth: 44,
    color: 'inherit',
  },
}));

const SidebarListItem = withStyles({
  root: {
    color: 'lightgray',
    borderRadius: 4,
    padding: '4px 4px 4px 8px',
    '&:hover': {
      color: 'black',
      background: '#02e976',
    },
  },
  selected: {
    '&.Mui-selected': {
      color: 'black',
      background: '#02e976',
      '&:hover': {
        color: 'black',
        background: '#02e976',
        opacity: 0.8,
      },
    },
  },
})(ListItem);

function ResponsiveDrawer(props) {
  const { window, children } = props;
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ padding: '0 10px 0 10px' }}>
      <List
        subheader={
          <ListSubheader
            disableGutters
            style={{
              fontWeight: 'bold',
              letterSpacing: 2,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            AudiusTree
          </ListSubheader>
        }
      >
        <Link href="/">
          <SidebarListItem button selected={router.pathname === '/'}>
            <ListItemIcon className={classes.listItemIcon}>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </SidebarListItem>
        </Link>

        <Link disabled href="/search">
          <SidebarListItem
            disabled
            button
            selected={router.pathname === '/search'}
          >
            <ListItemIcon color="inherit" className={classes.listItemIcon}>
              <SearchRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Search"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
            <ComingSoon />
          </SidebarListItem>
        </Link>
      </List>

      <Divider />

      <List subheader={<ListSubheader disableGutters>Featured</ListSubheader>}>
        <Link href="/featured/artists">
          <SidebarListItem
            button
            selected={router.pathname === '/featured/artists'}
          >
            <ListItemIcon color="inherit" className={classes.listItemIcon}>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText
              primary="Artists"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </SidebarListItem>
        </Link>

        <Link href="/featured/playlists">
          <SidebarListItem
            button
            selected={router.pathname === '/featured/playlists'}
          >
            <ListItemIcon color="inherit" className={classes.listItemIcon}>
              <SubscriptionsRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Playlists"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </SidebarListItem>
        </Link>
      </List>

      <Divider />

      <List subheader={<ListSubheader disableGutters>Socials</ListSubheader>}>
        <a rel="noopener" target="_blank" href="https://audius.co/jessie">
          <SidebarListItem button>
            <ListItemIcon color="inherit" className={classes.listItemIcon}>
              <AudiusIcon
                color="inherit"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                // style={{ width: '1.5rem', height: '1.5rem' }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Audius"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </SidebarListItem>
        </a>

        <a
          rel="noopener"
          target="_blank"
          href="https://twitter.com/intent/follow?screen_name=moombahfy"
        >
          <SidebarListItem button>
            <ListItemIcon color="inherit" className={classes.listItemIcon}>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText
              primary="Twitter"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </SidebarListItem>
        </a>

        <a
          rel="noopener"
          target="_blank"
          href="https://soundcloud.com/moombahfy"
        >
          <SidebarListItem button>
            <ListItemIcon color="inherit" className={classes.listItemIcon}>
              <SoundcloudIcon
                color="inherit"
                width="40"
                height="40"
                viewBox="0 0 20 20"
                // style={{ width: '1.5rem', height: '1.5rem' }}
              />
            </ListItemIcon>
            <ListItemText
              primary="SoundCloud"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </SidebarListItem>
        </a>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="/audiustree.png"
            alt="AudiusFindr"
            width={50}
            height={50}
            style={{ marginRight: 14 }}
          />
          <SearchBar />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="navigation">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

const ComingSoon = () => {
  return (
    <span
      style={{
        background: 'red',
        borderRadius: 4,
        color: 'white',
        padding: '4px 8px',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }}
    >
      soon 👀
    </span>
  );
};

export default ResponsiveDrawer;
