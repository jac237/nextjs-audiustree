import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
    background: '#1f1f1f',
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
    background: '#1f1f1f',
  },
  content: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  listItem: {
    color: 'lightgray',
    borderRadius: 4,
    paddingLeft: 10,
    '&:hover': {
      color: 'white',
    },
  },
  listItemIcon: {
    minWidth: 44,
  },
}));

function ResponsiveDrawer(props) {
  const { window, children } = props;
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ padding: '0 16px 0 10px' }}>
      <List
        subheader={
          <ListSubheader
            disableGutters
            style={{ fontWeight: 'bold', letterSpacing: 2 }}
          >
            AUDIUSTREE
          </ListSubheader>
        }
      >
        <Link href="/">
          <ListItem
            button
            className={classes.listItem}
            selected={router.pathname === '/'}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </ListItem>
        </Link>

        <Link href="/search">
          <ListItem
            button
            className={classes.listItem}
            selected={router.pathname === '/search'}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <SearchRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Search"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List subheader={<ListSubheader disableGutters>Featured</ListSubheader>}>
        <Link href="/featured/artists">
          <ListItem
            button
            className={classes.listItem}
            selected={router.pathname === '/featured/artists'}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText
              primary="Artists"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </ListItem>
        </Link>

        <Link href="/featured/playlists">
          <ListItem
            button
            className={classes.listItem}
            selected={router.pathname === '/featured/playlists'}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <SubscriptionsRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Playlists"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List subheader={<ListSubheader disableGutters>Socials</ListSubheader>}>
        <a rel="noopener" target="_blank" href="https://audius.co/jessie">
          <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <img
                src="https://i.imgur.com/TdeeCK8.png"
                style={{ width: '1.5rem', height: '1.5rem' }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Audius"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </ListItem>
        </a>

        <a rel="noopener" target="_blank" href="https://twitter.com/moombahfy">
          <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText
              primary="Twitter"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </ListItem>
        </a>

        <a
          rel="noopener"
          target="_blank"
          href="https://soundcloud.com/moombahfy"
        >
          <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <img
                src="/soundcloud.png"
                style={{ width: '2rem', height: '2rem', marginLeft: '-2px' }}
              />
            </ListItemIcon>
            <ListItemText
              primary="SoundCloud"
              primaryTypographyProps={{ style: { fontWeight: 500 } }}
            />
          </ListItem>
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
            alt="AudiusTree"
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

export default ResponsiveDrawer;
