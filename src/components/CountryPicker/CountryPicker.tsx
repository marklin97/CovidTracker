import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api/index';
import styles from './CountryPicker.module.css';

interface CountryProps {
  country?: string;
  onSelection(country: string): void;
}

const CountryPicker: React.FC<CountryProps> = ({
  country,
  onSelection,
}): JSX.Element => {
  const [fetchedCountries, setCountries] = useState<any>();
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetchCountries();
      setCountries(response);
    };
    fetchAPI();
  }, []);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=' '
        onChange={(e) => onSelection(e.target.value)}
      >
        <option value='global'>Global</option>

        {fetchedCountries ? (
          fetchedCountries.map((countryName, i) => (
            <option key={i}>{countryName}</option>
          ))
        ) : (
          <option>Data not fetched...</option>
        )}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
