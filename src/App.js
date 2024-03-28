import React, { useState } from 'react';
import './App.css';
import data from './data'; 

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (sortConfig.key === 'id') {
          return sortConfig.direction === 'ascending' ? a[sortConfig.key] - b[sortConfig.key] : b[sortConfig.key] - a[sortConfig.key];
        } else if (sortConfig.key === 'totalSpent') {
          const totalSpentA = parseFloat(a[sortConfig.key].replace(/[^\d.-]/g, ''));
          const totalSpentB = parseFloat(b[sortConfig.key].replace(/[^\d.-]/g, ''));
          return sortConfig.direction === 'ascending' ? totalSpentA - totalSpentB : totalSpentB - totalSpentA;
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableData;
  };

  const filteredData = sortedData().filter((user) =>
    Object.values(user).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container">
      <h1>Customer Data</h1>
      
      <input
        type="text"
        placeholder="Search...."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <table>
        <thead>
          <tr>
            <SortableHeader
              label="Id"
              sortKey="id"
              onSort={handleSort}
              sortConfig={sortConfig}
            />
            <SortableHeader
              label="Customer"
              sortKey="customer"
              onSort={handleSort}
              sortConfig={sortConfig}
            />
            <SortableHeader
              label="Last Seen"
              sortKey="lastSeen"
              onSort={handleSort}
              sortConfig={sortConfig}
            />
            <SortableHeader
              label="Orders"
              sortKey="orders"
              onSort={handleSort}
              sortConfig={sortConfig}
            />
            <SortableHeader
              label="Total Spent"
              sortKey="totalSpent"
              onSort={handleSort}
              sortConfig={sortConfig}
            />
            <SortableHeader
              label="Latest Purchase"
              sortKey="latestPurchase"
              onSort={handleSort}
              sortConfig={sortConfig}
            />
            <SortableHeader
              label="Segment"
              sortKey="segments"
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td className="customer-info">
                <img src={process.env.PUBLIC_URL + user.image}  alt="img not found" />
                {user.customer}
              </td>
              <td>{user.lastSeen}</td>
              <td>{user.orders}</td>
              <td>{user.totalSpent}</td>
              <td>{user.latestPurchase}</td>
              <td>
                {user.segments === 'VIP' ? (
                  <span className="vip-segment">{user.segments}</span>
                ) : user.segments === 'New' ? (
                  <span className="new-segment">{user.segments}</span>
                ) : (
                  <span className="regular-segment">{user.segments}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SortableHeader = ({ label, sortKey, onSort, sortConfig }) => {
  const handleClick = () => {
    onSort(sortKey);
  };

  const sortDirection = sortConfig.key === sortKey ? sortConfig.direction : null;
  const arrow = sortDirection === 'ascending' ? '↑' : '↓';

  return (
    <th onClick={handleClick}>
      {label} {sortDirection && <span>{arrow}</span>}
    </th>
  );
};

export default App;
