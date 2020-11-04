import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';
/**
 * This function will fetch the  national status of Covid-19 if country name is passed as the argument
 * or fetch the global status of covid-19 if no argument
 * @param {sting} country the selection of the country
 */
const fetchData = async (country?: string) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);
    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function will fetch the global status of covid-19
 */
const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

/**
 * This function will fetch the name of the countries that are available
 */
const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};
export { fetchData, fetchDailyData, fetchCountries };
