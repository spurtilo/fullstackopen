import axios from "axios";
import { useState, useEffect } from "react";

const SearchField = ({ id, value, onChange }) => {
  return <input id={id} value={value} onChange={onChange} />;
};

const Country = ({ country }) => {
  return <li key={country.cca3}>{country.name.common}</li>;
};

const Countries = ({ countries }) => {
  if (
    countries.length === 1 &&
    countries[0].name.common !== "Too many matches, specify another filter."
  ) {
    const chosenCountry = countries[0];

    return (
      <>
        <h1>{chosenCountry.name.common}</h1>
        <p>Capital: {chosenCountry.capital}</p>
        <p>Area: {chosenCountry.area} square kilometers</p>
        <p>Languages:</p>
        {Object.values(chosenCountry.languages).map((value) => (
          <p key={value}>{value}</p>
        ))}
        <img src={chosenCountry.flags.png} alt="Country flag" />
      </>
    );
  }

  return countries.map((country) => (
    <Country key={country.name.common} country={country} />
  ));
};

function filterCountries(countriesArray, queryTerm) {
  let searchResult = [];
  if (countriesArray && queryTerm.length > 0 && countriesArray.length) {
    searchResult = countriesArray.filter((country) =>
      country.name.common.toLowerCase().includes(queryTerm.toLowerCase().trim())
    );
  }
  if (searchResult.length <= 10) {
    return searchResult;
  }
  return [{ name: { common: "Too many matches, specify another filter." } }];
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const countriesToShow = filterCountries(countries, searchTerm);

  return (
    <div>
      <h1>Find Countries</h1>
      <SearchField
        id="countrySearch"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul className="country-list">
        <Countries countries={countriesToShow} />
      </ul>
    </div>
  );
};

export default App;
