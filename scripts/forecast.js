const apikey = "dhYvbWLCrA8LPDJfqi5naQhJUQdLS3ym";

//get weather info
const getWeather = async (Key) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${Key}?apikey=${apikey}&language=ro`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

// get city info
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${apikey}&q=${city}&language=ro`;
  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};
