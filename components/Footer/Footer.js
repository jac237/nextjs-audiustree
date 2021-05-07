import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

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
              <a target="_blank" rel="noopener" href="https://y.at/">
                Yat Emojis
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
