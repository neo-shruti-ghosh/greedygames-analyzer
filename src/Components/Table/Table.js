
import React, { useState } from 'react';
import './Table.css';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

function TableHeader({ onSort }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSort = (column) => {
    let direction = 'asc';

    if (sortColumn === column && sortDirection === 'asc') {
      direction = 'desc';
    }

    setSortColumn(column);
    setSortDirection(direction);
    onSort(column, direction);
  };

  const renderSortIcon = (column) => {
    if (sortColumn !== column) {
      return null;
    }

    if (sortDirection === 'asc') {
      return <FaSortUp className='icon' />;
    } else {
      return <FaSortDown className='icon' />;
    }
  };
 

  return (
    <thead>
      <tr>
        <th>
          <div className='heading' onClick={() => handleSort('date')}>
            Date <div className='icons'>{renderSortIcon('date')}</div>
          </div>
        </th>
        <th>
          <div className='heading' onClick={() => handleSort('app_id')}>
            App ID <div className='icons'>{renderSortIcon('app_id')}</div>
          </div>
        </th>
        <th>
          <div className='heading' onClick={() => handleSort('appName')}>
            App Name <div className='icons'>{renderSortIcon('appName')}</div>
          </div>
        </th>
        <th>
          <div className='heading' onClick={() => handleSort('requests')}>
            AD Request <div className='icons'>{renderSortIcon('requests')}</div>
          </div>
        </th>
        <th>
          <div className='heading' onClick={() => handleSort('responses')}>
            AD Response <div className='icons'>{renderSortIcon('responses')}</div>
          </div>
        </th>
        <th>
          <div className='heading' onClick={() => handleSort('impressions')}>
            Impressions <div className='icons'>{renderSortIcon('impressions')}</div>
          </div>
        </th>
        <th>
          <div className='heading' onClick={() => handleSort('clicks')}>
            Clicks <div className='icons'>{renderSortIcon('clicks')}</div>
          </div>
        </th>
        <th>
          <div className='heading' onClick={() => handleSort('revenue')}>
            Revenue <div className='icons'>{renderSortIcon('revenue')}</div>
          </div>
        </th>
      </tr>
    </thead>
  );
}

function Table({ data }) {
  const [sortedData, setSortedData] = useState(data);

  const handleSort = (column, direction) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (direction === 'asc') {
        return a[column] - b[column];
      } else {
        return b[column] - a[column];
      }
    });

    setSortedData(sorted);
  };

  return (
    <table className='table'>
      <TableHeader onSort={handleSort} />
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.app_id}</td>
            <td>{row.appName}</td>
            <td>{row.requests}</td>
            <td>{row.responses}</td>
            <td>{row.impressions}</td>
            <td>{row.clicks}</td>
            <td>{row.revenue}</td>
          </tr>
        ))
        }
      </tbody>
    </table>
  );
}

export default Table;
