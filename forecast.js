const apikey = "8TMhsGXyfZ78T0uuZDJgRrhVna2x0V2u";

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

getCity("chisinau")
  .then((data) => {
    return getWeather(data.Key);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
