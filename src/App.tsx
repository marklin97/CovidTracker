import React, { useEffect, useState } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import { fetchData } from './api';
import image from './images/image.png';
import styles from './App.module.css';

const App: React.FC = (): JSX.Element => {
  const [data, setData] = useState<any>();
  const [country, setCountry] = useState<string | undefined>();

  const handleCountrySelection = async (countryName) => {
    const fetchedData = await fetchData(countryName);
    setData(fetchedData);
    setCountry(countryName);
  };

  useEffect(() => {
    const getResponse = async () => {
      const response = await fetchData();
      setData(response);
    };
    getResponse();
  }, []);
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt='COVID-19' />
      <Cards data={data} />
      <CountryPicker country={country} onSelection={handleCountrySelection} />
      <Chart data={data} countryName={country} />
    </div>
  );
};

export default App;
