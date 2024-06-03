// Selecting DOM elements
const form = document.querySelector('form');
const time = document.getElementById('time');
const icon = document.getElementById('icon');
const weatherInfo = document.querySelector('.weather-info');
const appBody = document.querySelector('.app-body');

// Function to fetch weather information based on city name
const getInfo = async (city) => {
    try {
        // Fetching city data
        const cityData = await getCity(city);
        // Fetching weather data using city ID
        const weatherData = await getWeather(cityData.Key);
        // Logging fetched data for debugging
        console.log(cityData, weatherData);
        // Returning combined city and weather data
        return { cityData, weatherData };
    } catch (error) {
        console.error('Error fetching weather information:', error);
        throw error;
    }
};

// Function to update UI with weather information
const updateUi = (data) => {
    try {
        // Destructuring city and weather data from input
        const { cityData, weatherData } = data;

        // Updating time image based on day/night
        const timeSrc = weatherData.IsDayTime ? './images/time/day.svg' : './images/time/night.svg';
        time.setAttribute('src', timeSrc);

        // Updating weather icon
        const iconSrc = `./images/icons/${weatherData.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);

        // Updating weather details
        const cityName = cityData.LocalizedName.toUpperCase();
        const weatherDetails = `<p id="city">${cityName}</p>
                                <P id="status">${weatherData.WeatherText}</P>
                                <p id="temp">${weatherData.Temperature.Metric.Value} &#8451;</p>`;
        // Updating weather info in UI
        weatherInfo.innerHTML = weatherDetails;
        // Displaying app body
        appBody.style.display = "block";
    } catch (error) {
        console.error('Error updating UI:', error);
    }
};

// Event listener for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    const city = form.userLocation.value.trim(); // Extracting city name from form input
    form.reset(); // Resetting form after submission

    localStorage.setItem('cityName', city); // Storing city name in localStorage for future reference

    try {
        const data = await getInfo(city); // Fetching weather information
        updateUi(data); // Updating UI with fetched data
    } catch (error) {
        console.error('Error processing form submission:', error);
    }
});

// Checking for previously stored city name in localStorage
const storedCityName = localStorage.getItem('cityName');
if (storedCityName) {
    // Fetching weather information for stored city name
    getInfo(storedCityName)
        .then(data => updateUi(data))
        .catch(err => console.error('Error fetching weather information:', err));
}
