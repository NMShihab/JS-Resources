"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} People</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[0].nativeName
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// Use AJAX call

/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);
    const request2 = new XMLHttpRequest();
    request2.open(
      "GET",
      `https://restcountries.eu/rest/v2/alpha/${data.borders[0]}`
    );
    request2.send();
    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, "neighbour");
      console.log(data2);
    });
  });
};
getCountryData("bangladesh");

*/

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

// Promises

const getCountryData = function (country) {
  // fetch Country data from API
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((response) => {
      // Create error if country not found
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json(); // Convert to Json
    })
    .then((data) => {
      // Show Country
      renderCountry(data[0]);
      // initialize neighbour country
      const neighbour = data[0].borders[0];
      // if neighbour  not exist return
      if (!neighbour) return;
      // fetch neighbour  country and return
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      response.json();
    }) // Convert to json
    .then((data) => renderCountry(data, "neighbour")) // Show neighbour country
    .catch((err) => {
      console.error(`${err}`);
      renderError(`${err.message} try again`);
    }) // Catch error if any occured
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  getCountryData("bangladesh");
});

/*
Coding Challenge #1
In this challenge you will build a function 'whereAmI' which renders a country
only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. So in this challenge, you’ll use an API on your own for the first time �
Your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test
data below).
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
promises to get the data. Do not use the 'getJSON' function we created, that
is cheating �
3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”
4. Chain a .catch method to the end of the promise chain and log errors to the
console
5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message
PART 2
6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.
7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)

Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
GOOD LUCK �
*/

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((response) => {
      if (!response.ok) throw new Error(`Not found try again`);
      return response.json();
    })
    .then((data) => {
      // getCountryData(data.country);
      console.log(`You are in ${data.region}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error(` Country is not found`);
      return response.json();
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => console.log(err));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
