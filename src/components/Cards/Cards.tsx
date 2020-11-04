import React from 'react';
import styles from './Cards.module.css';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import cx from 'classnames';
import Countup from 'react-countup';

interface CovidData {
  confirmed: { value: number; detail: string };
  recovered: { value: number; detail: string };
  deaths: { value: number; detail: string };
  lastUpdate: string;
}
interface CardProps {
  data: CovidData;
}

const Cards: React.FC<CardProps> = ({ data }: CardProps): JSX.Element => {
  if (data) {
    const { confirmed, recovered, deaths, lastUpdate } = data;
    return (
      <div className={styles.container}>
        <Grid container spacing={3} justify='center'>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.infected)}
          >
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Infected
              </Typography>
              <Typography variant='h5'>
                <Countup
                  start={0}
                  end={confirmed.value}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant='body2'>
                Number of active cases of COVID-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.recovered)}
          >
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Recovered
              </Typography>
              <Typography variant='h5'>
                <Countup
                  start={0}
                  end={recovered.value}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant='body2'>
                Number of recoveries from COVID-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.deaths)}
          >
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Deaths
              </Typography>
              <Typography variant='h5'>
                <Countup
                  start={0}
                  end={deaths.value}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant='body2'>
                Number of deaths caused by COVID-19
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <div>Loading ...</div>;
  }
};

export default Cards;
