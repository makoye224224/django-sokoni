import React from 'react';
import { Container, Grid, Typography, Link, makeStyles } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  footerText: {
    color: '#333',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" className={classes.footerText}>
              About Us
            </Typography>
            <Typography variant="body2" className={classes.footerText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus ultricies semper velit non vulputate.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" className={classes.footerText}>
              Contact Us
            </Typography>
            <Typography variant="body2" className={classes.footerText}>
              Email: example@example.com
            </Typography>
            <Typography variant="body2" className={classes.footerText}>
              Phone: 123-456-7890
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className={classes.footerText}>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="none">
              <Typography variant="body2" className={classes.footerText}>
                Home
              </Typography>
            </Link>
            <Link href="/about" color="inherit" underline="none">
              <Typography variant="body2" className={classes.footerText}>
                About
              </Typography>
            </Link>
            <Link href="/contact" color="inherit" underline="none">
              <Typography variant="body2" className={classes.footerText}>
                Contact
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
