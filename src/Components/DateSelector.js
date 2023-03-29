import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Table from './Table/Table';
import Button from 'react-bootstrap/Button';
import './DateSelector.css';
import { HiSelector } from 'react-icons/hi';
import Dimensions from './Dimensions/Dimensions';
import Spinner from 'react-bootstrap/Spinner';
import { GoSettings } from 'react-icons/go';


function DateSelector() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);

  const handleFetchData = async () => {
    if (startDate && endDate) {
      const reportUrl = `http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate.toISOString().substring(0, 10)}&endDate=${endDate.toISOString().substring(0, 10)}`;
      const appsUrl = `http://go-dev.greedygame.com/v3/dummy/apps`;
      setIsLoading(true);
      const [reportResponse, appsResponse] = await Promise.all([fetch(reportUrl), fetch(appsUrl)]);
      if (reportResponse.ok && appsResponse.ok) {
        const reportJson = await reportResponse.json();
        const appsJson = await appsResponse.json();
        const appsMap = new Map();
        appsJson.data.forEach(app => appsMap.set(app.app_id, app.app_name));
        const enrichedData = reportJson.data.map(row => ({
          ...row,
          appName: appsMap.get(row.app_id)
        }));
        setData(enrichedData);
        setIsLoading(false);
        setShowDatePicker(false); // Hide datepicker on apply click
      } else {
        alert("Error Fetching Data. Please Try Again")
      }
    } else {
      alert('Please select a date range.');
    }
  };
  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };
  const handleShowDimensions = () => {
    setShowDimensions(true);
  }
  const handleHideDimensions = () => {
    setShowDimensions(false);
  }
  return (
    <div className='all'>
      <div className='options'>
        <div className='select-dates box-option' onClick={handleShowDatePicker}>
          <HiSelector className='text-primary' /> Select Dates
        </div>
        <div className='setting box-option' onClick={handleShowDimensions}>
          <GoSettings className='text-primary' /> Settings
        </div>
      </div>
      {showDatePicker && (
        <div className='datepicker'>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End date"
          />
          <Button onClick={handleFetchData}>Apply</Button>
        </div>
      )}
      {showDimensions && (
        <div>
          <Dimensions />

          <div className='buttons'>
            <div className='close-button' onClick={handleHideDimensions}>
              <Button className='close-button-boot button-boot' variant="outline-danger">Close</Button>{' '}
            </div>
            <div className='apply-button' onClick={handleHideDimensions}>
              <Button className='apply-button-boot button-boot' variant="primary">Apply</Button>{' '}
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className='spinner'>
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : data.length > 0 ? (
        <div>
          <Table data={data} />
        </div>
      ) : null}
    </div>
  );

}

export default DateSelector;
