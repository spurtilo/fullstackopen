import axios from "axios";
import { useState, useEffect } from "react";

const SearchField = ({ id, value, onChange }) => {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      autoComplete="off"
      autoFocus
    />
  );
};

const ShowButton = ({ buttonHandler, value }) => {
  return (
    <button type="button" onClick={buttonHandler} value={value}>
      show
    </button>
  );
};

const Weather = ({ country }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const cityName = country.capital;
  const countryCode = country.cca2;
  const [weatherData, setWeatherData] = useState({
    temp: null,
    wind: null,
    icon: null,
  });

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeatherData({
          temp: response.data.main.temp,
          wind: response.data.wind.speed,
          icon: response.data.weather[0].icon,
        });
      })
      .catch((error) => {
        console.log("Error fetching weather data:", error);
      });
  }, []);

  return (
    <>
      <h3>Weather in {cityName}</h3>
      <p>
        <b>Temperature:</b>{" "}
        {weatherData.temp !== null ? `${weatherData.temp} Celsius` : "N/A"}
      </p>
      {weatherData.icon && (
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        />
      )}
      <p>
        <b>Wind:</b>{" "}
        {weatherData.wind !== null ? `${weatherData.wind} m/s` : "N/A"}
      </p>
    </>
  );
};

const CountryDetails = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <ul>
        <li>
          <b>Capital:</b> {country.capital}
        </li>
        <li>
          <b>Area:</b> {country.area} square kilometers
        </li>
      </ul>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="flag"
      />
      <Weather country={country} />
    </>
  );
};

const CountryListItem = ({ country, buttonHandler }) => {
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
    return <CountryDetails country={chosenCountry} />;
  }

  return countries.map((country) => (
    <CountryListItem
      key={country.cca3}
      country={country}
      buttonHandler={buttonHandler}
    />
  ));
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
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
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log("Error fetching countries:", error);
        setErrorMessage(
          "Error fetching country data. Please reload the page or try again later."
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowButtonClick = (event) => {
    setSearchTerm(event.target.value);
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
      <Notification message={errorMessage} />
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
