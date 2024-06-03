const key = "8S1y7RBLDXG8p6nQv5M3iiJqygrGFMlW";

// Function to fetch city information based on the provided city name
const getCity = async (city) => {
    try {
        const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('There was a problem fetching city information:', error);
        return null;
    }
};

// Function to fetch weather information based on the provided city ID
const getWeather = async (Id) => {
    try {
        const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${Id}?apikey=${key}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('There was a problem fetching weather information:', error);
        return null;
    }
};
