import React, { Component } from 'react';
import { Box, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Cards, Chart, CountryPicker, VaccineChart } from './components';
import styles from './App.module.css';
import { fetchData, fetchVaccine } from './api';

class App extends Component {
  state = {
    data: {},
    country: '',
    value: '1',
    vaccines: {},
  }

  async componentDidMount(){
    const data = await fetchData();
    const vaccines = await fetchVaccine();
    this.setState({data, vaccines});
  }

  handleChangeCountry = async (country) => {
    const data = await fetchData(country);
    this.setState({data, country});
  }

  handleChange = (e, value) => {
    this.setState({value});
    console.log(value);
  };

  render() {
    const { data, country, value, vaccines } = this.state;
    return (
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {/* <Tabs value={value} onChange={(e) => this.handleChange(e.target.value)} centered textColor="secondary"
        indicatorColor="secondary">
          <Tab label="Covid-19" value="1" />
          <Tab label="Vaccine" value="2" />
        </Tabs> */}
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={this.handleChange} centered textColor="secondary" indicatorColor="secondary">
              <Tab label="Covid-19" value="1" />
              <Tab label="Vaccine" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className={styles.container}>
              <Cards data={data} country={country} />
              <CountryPicker handleChangeCountry={this.handleChangeCountry} />
              <Chart data={data} country={country} />
            </div>
          </TabPanel>
          <TabPanel value="2">
            <VaccineChart vaccines={vaccines}></VaccineChart>
          </TabPanel>
        </TabContext>
      </Box>
    );
  }
}

export default App;