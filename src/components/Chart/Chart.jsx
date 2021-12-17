import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line as LineJS, Bar as BarJS } from 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [ dailyData, setDailyData ] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData());
        };

        fetchApi();
    }, []);
    const lineChart = (
        dailyData.length ? (
            <Line 
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: "Confirmed",
                        borderColor: "#FBFF00",
                        fill: false,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: "Deaths",
                        borderColor: "#F90716", 
                        backgroundColor: "#e59398",
                        fill: false,
                    }, {
                        data: dailyData.map(({ delta }) => delta),
                        label: "Variant Delta Confirmed",
                        borderColor: "#FF7800", 
                        backgroundColor: "#FFF1AF",
                        fill: false,
                    }],
                }}
            />) : null
    );

    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Confirmed', 'Deaths', 'Recovered'],
                    datasets: [{
                        label: `Data Statistics In ${country}`,
                        backgroundColor: ['#FBFF00', '#F90716', '#71DFE7'],
                        data: [confirmed.value, deaths.value, recovered.value]
                    }]
                }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart
