import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const vaccineUrl = "https://vaksincovid19-api.vercel.app/api/vaksin";

export const fetchData = async (country) => {
    let currentUrl = url;

    if(country){
        currentUrl = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(currentUrl);

        return { confirmed, recovered, deaths, lastUpdate };
    }
    catch(error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            delta: dailyData.deltaConfirmedDetail.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
    }
    catch(error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: {countries} } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    }
    catch(error) {
        console.log(error);
    }
}

export const fetchVaccine = async () => {
    try {
        const { data: { totalsasaran, sasaranvaksinsdmk, sasaranvaksinlansia, sasaranvaksinpetugaspublik, vaksinasi1, vaksinasi2, lastUpdate } } = await axios.get(vaccineUrl);
        return { totalsasaran, sasaranvaksinsdmk, sasaranvaksinlansia, sasaranvaksinpetugaspublik, vaksinasi1, vaksinasi2, lastUpdate };
    }
    catch(error) {
        console.log(error);
    }
}