import axios from "axios";
import { useState, useEffect } from "react";

const SearchField = ({ id, value, onChange }) => {
  return <input id={id} value={value} onChange={onChange} autoFocus />;
};

const ShowButton = ({ buttonHandler, value }) => {
  return (
    <button type="button" onClick={buttonHandler} value={value}>
      show
    </button>
  );
};

const Country = ({ country, buttonHandler }) => {
  return (
    <>
      <li key={country.cca3}>
        {country.name.common}{" "}
        <ShowButton buttonHandler={buttonHandler} value={country.name.common} />
      </li>
    </>
  );
};

const Countries = ({ countries, buttonHandler }) => {
  if (countries.hasOwnProperty("tooManyMatches")) {
    return countries.tooManyMatches;
  } else if (countries.length === 1) {
    const chosenCountry = countries[0];

    return (
      <>
        <h2>{chosenCountry.name.common}</h2>
        <ul>
          <li>
            <b>Capital:</b> {chosenCountry.capital}
          </li>
          <li>
            <b>Area:</b> {chosenCountry.area} square kilometers
          </li>
        </ul>
        <h3>Languages:</h3>
        <ul>
          {Object.values(chosenCountry.languages).map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
        <img
          src={chosenCountry.flags.png}
          alt={`${chosenCountry.name.common} flag`}
          className="flag"
        />
      </>
    );
  }

  return countries.map((country) => (
    <Country
      key={country.name.common}
      country={country}
      buttonHandler={buttonHandler}
    />
  ));
};

function filterCountries(countriesArray, searchTerm) {
  let searchResult = [];
  if (countriesArray && searchTerm.length > 0) {
    searchResult = countriesArray.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim())
    );
  }

  if (searchResult.length <= 10) {
    return searchResult;
  } else {
    return { tooManyMatches: "Too many matches, specify another filter." };
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log("Error fetching countries:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowButtonClick = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  const countriesToShow = filterCountries(countries, searchTerm);

  return (
    <div>
      <h1>Find Countries</h1>
      <SearchField
        id="countrySearch"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="country-list">
        <Countries
          countries={countriesToShow}
          buttonHandler={handleShowButtonClick}
        />
      </ul>
    </div>
  );
};

export default App;
