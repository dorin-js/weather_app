const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);
  console.log(cityDetails);
  return {
    cityDetails, //: cityDetails,
    weather, //: weather
  };
};
cityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => {
      card.innerHTML = `Din păcate, nu am găsit locația :(`;
    });

  localStorage.setItem("city", city);
});
let lsCity = localStorage.getItem("city");
if (lsCity) {
  updateCity(lsCity)
    .then((data) => updateUI(data))
    .catch((err) => {
      card.innerHTML = err;
    });
}

// UI update
const updateUI = (data) => {
  const { cityDetails, weather } = data;

  details.innerHTML = `
          <h5 class="my-3">${cityDetails.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
               <span>${weather.Temperature.Metric.Value}</span>
               <span>&deg;C</span>
          </div>
     `;

  // night/day
  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }
  time.setAttribute("src", timeSrc);

  // icons
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
