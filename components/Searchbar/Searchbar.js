import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import getHost from '../../lib/getHost';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  autoComplete: {
    width: '100%',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    maxWidth: 500,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    display: 'flex',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2, 0, 0),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'gray',
  },
}));

const API_URL = 'https://discoveryprovider.mumbaudius.com';
const APP_NAME = 'AudiusTree';

export default function Searchbar() {
  const classes = useStyles();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(null);

  useEffect(() => {
    getHost().then((host) => {
      setHost(host ? host : API_URL);
    });
  }, []);

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    setLoading(true);

    fetch(`${host}/v1/users/search?query=${inputValue}&app_name=${APP_NAME}`)
      .then((res) => res.json())
      .then((json) => json.data)
      .then((users) => {
        console.log(users);
        if (active) {
          // setOptions(users.slice(0, 5));
          setOptions(users);
        }
      });

    return () => {
      active = false;
      setLoading(false);
    };
  }, [value, inputValue]);

  return (
    <Container disableGutters>
      <div className={classes.search}>
        <Autocomplete
          id="audius-search-bar"
          className={classes.autoComplete}
          loading={loading}
          filterOptions={(x) => x}
          getOptionLabel={(x) => x.handle}
          options={options}
          filterSelectedOptions
          value={value}
          clearOnBlur={false}
          noOptionsText="👉🏽 JSTJR, RayBurger, Matias_ 🔥"
          onChange={(_event, newValue) => {
            // setOptions(newValue ? [newValue, ...options] : options);
            console.log('newValue:', newValue);
            setValue('');
            getUserTracks(newValue);
          }}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <div
              ref={params.InputProps.ref}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <InputBase
                {...params.inputProps}
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <div className={classes.searchIcon}>
                <SearchIcon color="inherit" />
              </div>
            </div>
          )}
          renderOption={(user) => {
            return (
              <Link href={`/user/${user.handle}`}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Avatar
                      src={
                        user.profile_picture
                          ? user.profile_picture['150x150']
                          : ''
                      }
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="inherit" component="h4">
                      {user.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      @{user.handle}
                      {user.is_verified && (
                        <CheckCircleIcon
                          style={{
                            marginLeft: 4,
                            fontSize: 15,
                            color: '#0adea3',
                          }}
                        />
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            );
          }}
        />
      </div>
    </Container>
  );
}
