/* Allows you to write HTML inside JavaScript */
import React from 'react';
import useWeatherData from '../../../hooks/useWeatherData';


const WeatherDisplay = () => {
    const latitude = -34.6037; // Buenos aires
    const longitude = -58.3816;
    /* useWeatherData is called with these coordinates. It returns an object with weatherData,
    loading, and error. */
    const { weatherData, loading, error } = useWeatherData(latitude, longitude);

    /* If the data is still loading, a message 'Loading...' is displayed. If an error occurs during data loading, an error message with the text of the error is shown. */
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Daily Weather</h2>
            <p>Max Temperature: {weatherData.daily.temperature_2m_max[0]}°C</p>
            <p>Min Temperature: {weatherData.daily.temperature_2m_min[0]}°C</p>
            <p>Timezone: {weatherData.timezone}</p>
        </div>
    );
};
/* The WeatherDisplay component is exported so it can be used in other parts of the application */
export default WeatherDisplay;
