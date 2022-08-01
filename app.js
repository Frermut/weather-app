//1db365c2aeb9f09860cb3068503c6c45
//http://api.openweathermap.org/data/2.5/weather?id=2026070&APPID=1db365c2aeb9f09860cb3068503c6c45
//http://localhost/city.list.json
//u8KP-CvXJE9qjt9YRE7AnjRsreaVBCbNABnio2t6QEy-g6cJNOsmbOSdtj0Pw0ySCAk
//vHKkfSFEasgG1sYaUTV54ksfxIvI6FGd
let cityName = 'Брянск';
async function getData() {
    const city = await fetch("http://www.demo-it-park.site/getApi/?rusSities=get");
    const cityData = await city.json();
    const resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=1db365c2aeb9f09860cb3068503c6c45`)
    const weatherData = await resp.json();
    let data = {
        cityData,
        weatherData,
    }
    return data;
}

function renderList(data) {
    document.querySelector(".modal-body").addEventListener("click", function(event) {
        let dataObj = data;
        let target = event.target.textContent;
        cityName = target;
        let listBtn = document.querySelectorAll(".cities button");
        if (listBtn) {
            listBtn.forEach(btn => {
                btn.remove();
            })
            init();
        }
    })

}

function renderWeather(data) {
    const icon = data.weatherData.weather[0].icon;
    document.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${icon}.png`
    document.querySelector(".card-title").innerHTML = `<h1>${data.weatherData.name}</h1>`;
    document.querySelector(".card-text").innerHTML = `<h4>${Object.keys(data.weatherData.sys)[2]}: ${data.weatherData.sys.country}</h4>`;
    document.querySelector(".temperature").textContent = `${Math.round(data.weatherData.main.temp - 273,15)}°C`;
    document.querySelector(".coords").innerHTML =
        `<br>
        <b>Latitude: </b><i>${data.weatherData.coord.lon}</i>
        <br>
        <b>Longitude: </b><i>${data.weatherData.coord.lat}</i>
        `;
    document.querySelector(".cloudiness").textContent = `${data.weatherData.clouds.all}%`;
    document.querySelector(".pressure").textContent = `${Math.floor((data.weatherData.main.pressure) * 3/4)} mm Hg`;
    let cities = data.cityData;
    let cityId = cities.map(city => { return city.name });
    cityId.forEach(element => {
        let modal = document.querySelector(".cities")
        const markup = `
        <button type="button" class="list-group-item list-group-item-action cityList" data-bs-dismiss="modal">${element}</button>
        
        `;
        modal.insertAdjacentHTML("beforeend", markup);
    });
}

async function init() {
    let data = await getData();
    renderWeather(data);
    renderList(data);
}

init();