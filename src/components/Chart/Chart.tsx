import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { fetchDailyData } from '../../api/index';

interface CovidData {
  confirmed: { value: number; detail: string };
  recovered: { value: number; detail: string };
  deaths: { value: number; detail: string };
  lastUpdate: string;
}
interface ChartProps {
  data: CovidData;
  country?: string;
}
const Chart: React.FC<ChartProps> = ({
  data,
  country,
}: ChartProps): JSX.Element => {
  const [dailyData, setDailyData] = useState<any>();
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetchDailyData();
      setDailyData(response);
    };
    fetchAPI();
  }, []);
  const lineChart = dailyData ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#333ff',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  const barChart = data ? (
    <Bar
      data={{
        labels: ['infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'Poeple',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};
export default Chart;
