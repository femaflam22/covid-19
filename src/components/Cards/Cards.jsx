import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './Cards.module.css';
import logo from '../../image/covid-19.png';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, country }) => {
    let countryName = 'Global';
    if(country){
        countryName = `in ${country}`;
    }
    if(!confirmed){
        const loading = <div className={styles.loadSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
        return loading;
    }
    return (
        <div className={styles.container}>
            <div className={styles.titleWrap}>
                <img src={logo} alt="logo" className={styles.img} />
                <Typography variant="h5" className={styles.title}>
                    Covid-19 Case Data {countryName}
                </Typography>
            </div>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={3} className={cx(styles.card, styles.confirmed)} component={Card}>
                    <CardContent>
                        <Typography gutterBottom component="div">
                            Confirmed
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={confirmed.value}
                                separator=','
                                duration={2.5}
                            />
                        </Typography>
                        <Typography color="textSecondary" variant="body1">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">
                            the number of confirmed cases of covid-19
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} className={cx(styles.card, styles.recovered)} component={Card}>
                    <CardContent>
                        <Typography gutterBottom component="div">
                            Recovered
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={recovered.value}
                                separator=','
                                duration={2.5}
                            />
                        </Typography>
                        <Typography color="textSecondary" variant="body1">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">
                            the number of recovered cases of covid-19
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} className={cx(styles.card, styles.deaths)} component={Card}>
                    <CardContent>
                        <Typography gutterBottom component="div">
                            Death
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={deaths.value}
                                separator=','
                                duration={2.5}
                            />
                        </Typography>
                        <Typography color="textSecondary" variant="body1">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">
                            the number of deaths cases of covid-19
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards
