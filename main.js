import 'regenerator-runtime/runtime';
import axios from 'axios';

const API_HEADERS = {unitGroup: "metric", apiKey: "MRARG8CD49CQKTWQB2G3MSULH", apiURL: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/", contentType: "json"};

const getWeather = async (url_city_name) => {
    try {
        const response = await axios.get(`${API_HEADERS.apiURL}${url_city_name}?unitGroup=${API_HEADERS.unitGroup}&key=${API_HEADERS.apiKey}&contentType=${API_HEADERS.contentType}`);
        return response.data;
    } catch (errors) {
        console.error(errors);
    }
};

function connectContent() {
    let temp = document.getElementsByTagName("template")[0];
    let clon = temp.content.cloneNode(true);
    let parent = document.querySelector(".content");
    let newEle = parent.appendChild(clon);
    return newEle;
}

const printData = async (data) => {
    connectContent();
    const dataObj = await data;

    document.querySelector(".resolvedAddress").textContent = dataObj.resolvedAddress;
    document.querySelector(".description").textContent = dataObj.description;
    document.querySelector(".timezone").textContent = dataObj.timezone;
    document.querySelector(".longitude").textContent = dataObj.longitude;
    document.querySelector(".latitude").textContent = dataObj.latitude;
    document.querySelector(".currentTime").textContent = dataObj.currentConditions.datetime;
    document.querySelector(".currentTemp").textContent = dataObj.currentConditions.temp;
    console.log(dataObj.currentConditions.feelslike);
    document.querySelector(".feelslike").textContent = dataObj.currentConditions.feelslike;
    document.querySelector(".conditions").textContent = dataObj.currentConditions.conditions;
    document.querySelector(".cloudcover").textContent = dataObj.currentConditions.cloudcover;
    document.querySelector(".pressure").textContent = dataObj.currentConditions.pressure;
    document.querySelector(".sunrise").textContent = dataObj.currentConditions.sunrise;
    document.querySelector(".sunset").textContent = dataObj.currentConditions.sunset;
    document.querySelector(".windspeed").textContent = dataObj.currentConditions.windspeed;
}

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector(".submitBtn");
    const searchInput = document.querySelector(".locationInput");

    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelector(".content").innerHTML= "";
        let url_city_name = encodeURI(searchInput.value);
        if(url_city_name) {
            const data = getWeather(url_city_name);
            console.log(`GET: `, data);
            printData(data);
            searchInput.value = "";
        }
    });
});

// TODO:
// NextDays Grid.