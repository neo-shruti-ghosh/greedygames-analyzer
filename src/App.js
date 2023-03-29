import React, { useState } from 'react';
import './App.css';
import Topbar from './Components/Topbar/Topbar';
import Dimensions from './Components/Dimensions/Dimensions';
import DateSelector from './Components/DateSelector';

function App() {
  const [reportData, setReportData] = useState([]);

  const fetchData = async (startDate, endDate) => {
    try {
      const url = `http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate.toISOString().substring(0, 10)}&endDate=${endDate.toISOString().substring(0, 10)}`;
      const response = await fetch(url);
      const json = await response.json();
      setReportData(json.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <div className="block">

      </div>
      <div className="Dashboard">
        <h3>Analyzer</h3>
        <Topbar />
        <DateSelector fetchData={fetchData} />
      </div>
    </div>
  );
}

export default App;
