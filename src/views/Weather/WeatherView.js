/* Allows you to write HTML inside JavaScript */
import React from 'react';
/* React components are key entities in the application, and using PascalCase helps to identify them easily in the code. */
import MainLayout from 'components/organisms/MainLayout';
import WeatherDisplay from 'components/molecules/WeatherDisplay/WeatherDisplay';

import { useTranslation } from 'react-i18next';

const WeatherView = () => {


    /* It is used to manage translations in the application. t is a function that takes a translation key and returns the corresponding translated text */
    const { t } = useTranslation();

    return (
        /* Wraps all the content of the WeatherView component. This suggests that MainLayout provides an overall layout or structure */
        <MainLayout>
            <div className="weather-view">
                <h1>{t('Weather')}</h1>
                <WeatherDisplay />
            </div>
        </MainLayout>
    );
};

export default WeatherView;