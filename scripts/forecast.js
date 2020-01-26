const key = '2NuAdfrZyAk3M9UU3i3C1YwFiQQH4x0O';

const getWeather = async (cityKey) => {

    const baseUrl = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityKey}?apikey=${key}`;

    const response = await fetch(baseUrl + query);

    const data = await response.json();

    return data[0];

};

const getCity = async (city) => {

    const baseUrl = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(baseUrl + query);

    const data = await response.json();

    return data[0];
};

getCity('delhi').then((data) => {
    return getWeather(data.Key);
}).then(data => {
    
}).catch((err) => console.log(err));
