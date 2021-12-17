import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

const CountryPicker = ({ handleChangeCountry }) => {
    const [dataCountries, setdataCountries] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            setdataCountries(await fetchCountries());
        };

        fetchApi();
    }, [setdataCountries]);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleChangeCountry(e.target.value)}>
                <option value="">Global</option>
                {dataCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
