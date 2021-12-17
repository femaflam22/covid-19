import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Pie as PieJS, Doughnut as DoughnutJS } from 'chart.js/auto';
import { Pie, Doughnut } from 'react-chartjs-2';
import styles from './VaccineChart.module.css';
import logo from '../../image/vaccination.png';

const VaccineChart = ({ vaccines: { totalsasaran, sasaranvaksinsdmk, sasaranvaksinlansia, sasaranvaksinpetugaspublik, vaksinasi1, vaksinasi2, lastUpdate }}) => {
    const pieChart = (
        lastUpdate ? (
            <Pie className={styles.chart}
                data={{
                    labels: ['SDMKesehatan', 'Lansia', 'Petugas Publik'],
                    datasets: [{
                        backgroundColor: ['#d23986', '#7bd393', '#845cbc'],
                        data: [sasaranvaksinsdmk, sasaranvaksinlansia, sasaranvaksinpetugaspublik]
                    }]
                }}
            />
        ) : null
    );

    const doughnutChart = (
        lastUpdate ? (
            <Doughnut className={styles.chart}
                data={{
                    labels: ['Vaksin Dosis 1', 'Vaksin Dosis 2'],
                    datasets: [{
                        backgroundColor: ['#f4dd45', '#90c9e7'],
                        data: [vaksinasi1, vaksinasi2]
                    }]
                }}
            />
        ) : null
    );
    return (
        <div className={styles.container}>
            <div className={styles.titleWrap}>
                <img src={logo} alt="logo" className={styles.img} />
                <Typography variant="h5" className={styles.title}>
                    Covid-19 Vaccination Data in Indonesia
                </Typography>
            </div>
            <div className={styles.percen}>
                <Typography variant="body1" color="textSecondary" className={styles.title}>
                    has been vaccinated
                </Typography>
                <Typography variant="h3" className={styles.title}>
                    {Math.round(vaksinasi1 / totalsasaran * 100)}%
                </Typography>
            </div>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Typography variant="body1" className={styles.title}>
                        Vaccination Target data
                    </Typography>
                    <Typography color="textSecondary" variant="body1" className={styles.title}>
                        Target Total : {totalsasaran.toLocaleString()}
                    </Typography>
                    {pieChart}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="body1" className={styles.title}>
                        Vaccination Data on {new Date(lastUpdate).toDateString()}
                    </Typography>
                    <Typography color="textSecondary" variant="body2" className={styles.title}>
                        Vacc1 : {vaksinasi1.toLocaleString()} || Vacc2 : {vaksinasi2.toLocaleString()}
                    </Typography>
                    {doughnutChart}
                </Grid>
            </Grid>
        </div>
    )
}

export default VaccineChart
