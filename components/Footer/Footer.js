import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import styled from 'styled-components';
import TimeFormat from 'hh-mm-ss';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import getTweetIntent from '../../lib/getTweetIntent';

export default function Footer() {
  console.log('Footer');

  return (
    <div className={styles.container}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item container xs={12} sm={6} spacing={2}>
            <Grid item xs={12} className={styles.footerLink}>
              <Link href="/">Home</Link>
            </Grid>

            <Grid item xs={12} className={styles.footerLink}>
              <Link href="/about">About</Link>
            </Grid>

            <Grid item xs={12} className={styles.footerLink}>
              <Link href="/about">Feedback</Link>
            </Grid>

            <Grid item xs={12} className={styles.footerLink}>
              <a target="_blank" rel="noopener noreferrer" href="">
                Contact us
              </a>
            </Grid>
          </Grid>

          <Grid item container xs={12} sm={6} spacing={5} alignItems="center">
            <Grid item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/moombahfy"
              >
                <TwitterIcon style={{ height: 30, width: 30 }} />
              </a>
            </Grid>

            <Grid item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://audius.co/jessie"
              >
                <img
                  src="https://i.imgur.com/TdeeCK8.png"
                  style={{ height: 30, width: 30 }}
                />
              </a>
            </Grid>

            <Grid item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/jac237"
              >
                <GitHubIcon style={{ height: 30, width: 30 }} />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
