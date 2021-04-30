"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

// get your current geo location
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude},16z`);

    const coords = [latitude, longitude];
    var map = L.map("map").setView(coords, 16);
    console.log(map);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();

    map.on("click", function (mapEvent) {
      // remove hidden class for showing form after click
      form.classList.remove("hidden");
      console.log(mapEvent);
      // Take lattitude longitude value
      const { lat, lng } = mapEvent.latlng;

      // Create marker where click
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            maxWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "running-popup",
          })
        )
        .setPopupContent("Workout")
        .openPopup();
    });
  },
  (err) => console.error(err)
);
