const form = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.card img.time');
const weatherIcon = document.querySelector('.icon img');

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weatherDets = data.weatherDets;

    // destructuring of data
    const {cityDets, weatherDets} = data;

    const dets = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weatherDets.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weatherDets.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    details.innerHTML = dets;

    // update day/time and weather icons/images

    let timeSrc = null;
    if(weatherDets.isDayTime) {
        timeSrc = './img/day.svg';
    } else {
        timeSrc = './img/night.svg';
    }
    time.setAttribute('src',timeSrc);

    const icon = `/img/icons/${weatherDets.WeatherIcon}.svg`;
    weatherIcon.setAttribute('src',icon);

    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weatherDets = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weatherDets: weatherDets
    };

};

form.addEventListener('submit',e => {

    e.preventDefault();

    const city = form.city.value.trim();
    form.reset();

    updateCity(city)
        .then((data) => updateUI(data))
        .catch((err) => console.log(err));

});