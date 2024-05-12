import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value.length > 0) {
      axios.get(`https://restcountries.com/v3.1/name/${event.target.value}`)
        .then(response => {
          setCountries(response.data);
        })
        .catch(error => console.log(error));
    } else {
      setCountries([]);
    }
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleSearchChange} placeholder="Search countries..." />
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length === 1 ? (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area} km²</p>
          <img src={countries[0].flags.svg} alt={`Flag of ${countries[0].name.common}`} width="120" />
        </div>
      ) : (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleSelectCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
