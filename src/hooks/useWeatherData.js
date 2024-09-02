import { useState, useEffect } from 'react';

const useWeatherData = (latitude, longitude) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* useEffect runs when latitude or longitude change */
    useEffect(() => {
        /* The fetchWeatherData function, in addition to setting the timezone to 'GMT,' attempts to make a fetch request to the Open Meteo API using the provided coordinates. Additionally, it converts the response to JSON format. */
        const fetchWeatherData = async () => {
            const timezone = "GMT";

            try {
                const response = await fetch(
                    /* Base Domain: https://api.open-meteo.com/ API Version: /v1/ Main Endpoint: forecast */
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=${timezone}`
                );
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.reason);
                }

                setWeatherData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [latitude, longitude]);

    /* The hook returns an object that contains weatherData (the retrieved weather data), loading (a boolean indicating whether the data is still being loaded), and error (any error that occurred during data retrieval). */
    return { weatherData, loading, error };
};
export default useWeatherData;
