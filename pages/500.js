import Head from 'next/head';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// pages/404.js
export default function Custom500() {
  return (
    <div>
      <Head>
        <title>500 | AudiusTree</title>
        <meta name="description" content="#MOOMBAHFY" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ padding: '100px 0px 150px' }}
        >
          <Grid item>
            <img
              src="https://i.imgur.com/Feg2bVU.png"
              style={{ height: 120, width: 120 }}
            />
          </Grid>

          <Grid item>
            <Typography
              variant="inherit"
              component="h1"
              align="center"
              style={{ textTransform: 'uppercase' }}
            >
              500 - Server Side error occurred...
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              style={{ fontWeight: 500 }}
            >
              Head back to the{' '}
              <span
                style={{ textDecoration: 'underline', color: 'whitesmoke' }}
              >
                <Link href="/">HOMEPAGE</Link>
              </span>
              .
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
