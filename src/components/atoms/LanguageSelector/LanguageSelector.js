
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  /* i18n: It is the main object that manages translations and the current language of the application. It is accessed using the useTranslation hook */
  const { i18n } = useTranslation();

  /* This effect runs when the component is first rendered on the screen */
  useEffect(() => {
    /* It attempts to retrieve the previously saved language from localStorage. If no language is saved in localStorage, the current language configured in i18n is used */
    const savedLanguage = localStorage.getItem('language') || i18n.language;
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);


  /* This function executes when the user selects a different language from the dropdown menu */
  const handleLanguageChange = (event) => {
    /* Gets the selected value */
    const selectedLanguage = event.target.value;
    /* Changes the language of the application */
    i18n.changeLanguage(selectedLanguage);
    /* Saves the selected language in localStorage so that it is remembered on future visits */
    localStorage.setItem('language', selectedLanguage);
  };

  return (
    <select onChange={handleLanguageChange} value={i18n.language}>
      <option value="en">English</option>
      <option value="es">Spanish</option>
    </select>
  );
};

export default LanguageSelector;
