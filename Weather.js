
console.log("Джава подключена")

//Поиск города
const search_from = document.querySelector('.search-form')
const weatherCity = document.querySelector('#weathercity')

//Сегодня
const city = document.querySelector('#city')
const temperature = document.querySelector('#temperature')
const weatherWord = document.querySelector('#weather-words')

//Завтра
const cityTommorow = document.querySelector('#city-tomorrow')
const temperatureTommorow = document.querySelector('#temperature-tomorrow')
const weatherWordsTommorow = document.querySelector('#weather-words-tomorrow')

//Ощущается как
const feelsLike = document.querySelector('#feels-like-temperature')
const chanceOfPrecipitation = document.querySelector('#chance-of-precipitation')

//Ветер
const windDescription = document.querySelector('#wind-description')
const windSpeed = document.querySelector('#wind-speed')
const windGust = document.querySelector('#wind-gust')
const windConfig = {
    "штиль": { minSpeed: 0, maxSpeed: 0.02 },
    "тихий": { minSpeed: 0.3, maxSpeed: 1.5 },
    "лёгкий": { minSpeed: 1.6, maxSpeed: 3.3 },
    "слабый": { minSpeed: 3.4, maxSpeed: 5.4 },
    "умеренный": { minSpeed: 5.5, maxSpeed: 7.9 },
    "свежий": { minSpeed: 8, maxSpeed: 10.7 },
    "сильный": { minSpeed: 10.8, maxSpeed: 13.8 },
    "крепкий": { minSpeed: 13.9, maxSpeed: 17.1 },
    "очень крепкий": { minSpeed: 17.2, maxSpeed: 20.7 },
    "шторм": { minSpeed: 20.8, maxSpeed: 24.4 },
    "сильный шторм": { minSpeed: 24.5, maxSpeed: 28.4 },
    "жесткий шторм": { minSpeed: 28.5, maxSpeed: 32.6 },
    "ураган": { minSpeed: 32.7 }
}

//Скелетон таблицы 
const tableHours = document.querySelector('#table-hours')
const tableTemps = document.querySelector('#table-temps')
const tableWeather = document.querySelector('#table-weather')
const tableWind = document.querySelector('#table-wind')

//Анимации
const rainToday = document.querySelector('#rain-today')
const rainTomorrow = document.querySelector('#rain-tomorrow')
const rainConfig = {
    "небольшой дождь": { count: 30, speed: 1, dropClass: 'drop' },
    "дождь": { count: 60, speed: 1, dropClass: 'drops' },
    "сильный дождь": { count: 100, speed: 1, dropClass: 'strong-drop' },
    "проливной дождь": { count: 120, speed: 0.8, dropClass: 'shower-drop' },
    "ледяной дождь": { count: 60, speed: 1, dropClass: 'ice-drop' },
    "небольшой снег": { count: 40, speed: 10, dropClass: 'snowflake' },
    "снег": { count: 70, speed: 4, dropClass: 'snowflake' },
    "сильный снег": { count: 110, speed: 3, dropClass: 'big-snowflake' },
    "малооблачно-лево": { count: 3, speed: 20, dropClass: 'cloud-left' },
    "малооблачно-право": { count: 3, speed: 23, dropClass: 'cloud-right' },
    "облачно с прояснениями-лево": { count: 7, speed: 15, dropClass: 'cloud-left' },
    "облачно с прояснениями-право": { count: 7, speed: 17, dropClass: 'cloud-right' }
}
let thunderIntervalToday = null;
let thunderIntervalTomorrow = null;
const thunderToday = document.querySelector('#thunder-today')
const thunderTomorrow = document.querySelector('#thunder-tomorrow')
const snowToday = document.querySelector('#snow-today')
const snowTomorrow = document.querySelector('#snow-tomorrow')
const cloudsToday = document.querySelector('#clouds-today')
const cloudsTomorrow = document.querySelector('#clouds-tomorrow')
const bigCloudToday = document.querySelector('#big-cloud-today')
const bigCloudTomorrow = document.querySelector('#big-cloud-tomorrow')
const sunnyToday = document.querySelector('#sunny-today')
const sunnyTomorrow = document.querySelector('#sunny-tomorrow')

//Максимальная и минимальная температуры 
const maximumTemperature = document.querySelector('#maximum-temperature-today')
const maximumCity = document.querySelector('#maximum-city')
const minimumTemperature = document.querySelector('#minimum-temperature-today')
const minimumCity = document.querySelector('#minimum-city')

//Ошибка 
const errorPopup = document.querySelector('#error-popup')
const errorPopupText = document.querySelector('#error-popup-text')
const errorPopupButton = document.querySelector('#error-popup-button')


//Функция добавления данных в таблицу на 24 часа
function createSkeletonTable() {
    let currentHour = new Date().getHours()
    for (let i = 0; i < 8; i++) {
        let hour = (currentHour + i * 3) % 24;
        const th = document.createElement('th');
        th.textContent = `${hour}:00`;
        tableHours.append(th);
        const td = document.createElement('td');
        td.textContent = '--℃';
        tableTemps.append(td);
        const tdWeather = document.createElement('td');
        tdWeather.textContent = '--';
        tdWeather.classList.add('weather-words')
        tableWeather.append(tdWeather);
        const tdWind = document.createElement('td');
        tdWind.textContent = '--';
        tdWind.classList.add('weather-wind')
        tableWind.append(tdWind)
    }
}

function makeItClouds(container, config1, config2) {
    for (let i = 0; i < config1.count; i++) {
        const cloudLeft = document.createElement('span');
        const cloudRight = document.createElement('span');
        cloudLeft.classList.add(config1.dropClass);
        cloudRight.classList.add(config2.dropClass);
        let randomDelayLeft = Math.random() * 6;
        let randomDelayRight = Math.random() * 6;
        cloudLeft.style.animationDelay = randomDelayLeft + 's';
        cloudRight.style.animationDelay = randomDelayRight + 's';
        let randomSpeedLeft = (Math.random() * 15) + config1.speed;
        let randomSpeedRight = (Math.random() * 15) + config2.speed;
        cloudLeft.style.animationDuration = randomSpeedLeft + 's';
        cloudRight.style.animationDuration = randomSpeedRight + 's';
        let randomTopLeft = Math.random() * 30;
        let randomTopRight = Math.random() * 30;
        cloudLeft.style.top = randomTopLeft + '%';
        cloudRight.style.top = randomTopRight + '%';
        cloudLeft.style.left = '-70px';
        cloudRight.style.right = '-70px';
        cloudRight.style.left = 'auto';
        container.append(cloudLeft);
        container.append(cloudRight);
    }
}

function makeItRain(container, config) {
    for (let i = 0; i < config.count; i++) {
        const drop = document.createElement('span');
        drop.classList.add(config.dropClass);
        let randomLeft = Math.random() * 100;
        drop.style.left = randomLeft + '%';
        let randomDelay = Math.random() * 3;
        drop.style.animationDelay = randomDelay + 's';
        let randomSpeed = Math.random() + config.speed
        drop.style.animationDuration = randomSpeed + 's';
        container.append(drop)
    }
}

function makeItSunny(container) {
    const beam = document.createElement('span');
    beam.classList.add('beam');
    container.append(beam)
}

function makeItSnow(container, config) {
    for (let i = 0; i < config.count; i++) {
        const snowflake = document.createElement('span');
        snowflake.classList.add(config.dropClass);
        let randomDelay = Math.random() * 3;
        snowflake.style.animationDelay = randomDelay + 's';
        let randomSpeed = Math.random() * config.speed;
        snowflake.style.animationDuration = randomSpeed + 's';
        let randomLeft = Math.random() * 100 - 100;
        snowflake.style.left = randomLeft + '%';
        let randomTop = Math.random() * 100 - 100;
        snowflake.style.top = randomTop + '%';
        container.append(snowflake)
    }
}

function makeItThunder(container) {
    container.innerHTML = '';
    return setInterval(() => {
        container.innerHTML = '';
        const lighting = document.createElement('div');
        lighting.classList.add('thunder');
        let randomLeft = 10 + Math.random() * 70;
        lighting.style.left = randomLeft + '%';
        lighting.style.animation = 'lighting-strike 6s linear';
        container.style.animation = 'none';
        container.offsetHeight;
        container.style.animation = 'thunder-flash 6s linear';
        container.append(lighting)
    }, 6000);
}

function choseWindDescription(container, windSpeed, config) {
    const keysWind = Object.keys(config)
    for (let i = 0; i < 13; i++) {
        const keyWind = keysWind[i];
        if (windSpeed < config[keyWind].maxSpeed && windSpeed > config[keyWind].minSpeed) {
            container.textContent = `Ветер: ${keyWind}`;
            break
        }
    }
}


async function getWeather(cityName) {
    if (thunderIntervalToday) clearInterval(thunderIntervalToday);
    if (thunderIntervalTomorrow) clearInterval(thunderIntervalTomorrow);
    thunderToday.style.animation = 'none';
    thunderTomorrow.style.animation = 'none';

    rainToday.innerHTML = '';
    rainTomorrow.innerHTML = '';
    thunderToday.innerHTML = '';
    thunderTomorrow.innerHTML = '';
    cloudsToday.innerHTML = '';
    cloudsTomorrow.innerHTML = '';
    bigCloudToday.innerHTML = '';
    bigCloudTomorrow.innerHTML = '';
    sunnyToday.innerHTML = '';
    sunnyTomorrow.innerHTML = '';
    chanceOfPrecipitation.innerHTML = '';

    bigCloudToday.style.display = 'none';
    bigCloudTomorrow.style.display = 'none';

    console.log(`Ищу погоду для города ${cityName}`)
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=082ecb4c2b9ef06b77de593e14529b2a&units=metric&lang=ru`);
        if (!response.ok) {
            throw new Error('Проверьте правильно ли указан город, если да, то проблема на сервере, повторите попытку позже');
        }
        const data = await response.json();
        console.log(data)
        //let general = 1
        city.textContent = `${cityName}, сейчас`
        temperature.textContent = `${Math.round(data.list['0'].main.temp)}℃`
        weatherWord.textContent = data.list['0'].weather['0'].description;
        //Получения API платных сервисов 
        //const gismeteoResponse = await fetch('API запрос gismeteo');
        //const gismeteData = await gismeteoResponse.json();
        //general += 1;
        //console.log(gismeteoData)
        //const forecaResponse = await fetch('API запрос foreca');
        //const forecaData = await forecaResponse.json();
        //general += 1;
        //console.log(forecaData)
        //weatherWord.textContent = Math.round((data.list['0'].main.temp + gismeteoData.list['0'].main.temp + forecaData.list['0'].main.temp) / general)

        //Завтра
        cityTommorow.textContent = `${cityName}, завтра:`;
        temperatureTommorow.textContent = `${Math.round(data.list['8'].main.temp)}℃`;
        weatherWordsTommorow.textContent = data.list['8'].weather['0'].description;
        const allTemps = document.querySelectorAll('td');
        for (i = 0; i < 8; i++) {
            let temp = Math.round(data.list[i].main.temp);
            allTemps[i].textContent = `${temp}℃`;
        }
        const allWeather = document.querySelectorAll('.weather-words');
        for (i = 0; i < 8; i++) {
            let weatherWords = data.list[i].weather[0].description;
            allWeather[i].textContent = `${weatherWords}`
        }
        const allWind = document.querySelectorAll('.weather-wind');
        for (i = 0; i < 8; i++) {
            let wind = data.list[i].wind.deg;
            if (wind > 337.5 || wind < 22.5) {
                allWind[i].textContent = `Северный ${data.list[i].wind.speed}м/c`
            } else if (wind > 22.5 && wind < 67.5) {
                allWind[i].textContent = `Северо-восточный ${data.list[i].wind.speed}м/c`
            } else if (wind > 67.5 && wind < 112.5) {
                allWind[i].textContent = `Восточный ${data.list[i].wind.speed}м/с`
            } else if (wind > 112.5 && wind < 157.5) {
                allWind[i].textContent = `Южно-восточный ${data.list[i].wind.speed}м/с`
            } else if (wind > 157.5 && wind < 202.5) {
                allWind[i].textContent = `Южный ${data.list[i].wind.speed}м/с`
            } else if (wind > 202.5 && wind < 247.5) {
                allWind[i].textContent = `Южно-западный ${data.list[i].wind.speed}м/с`
            } else if (wind > 247.5 && wind < 292.5) {
                allWind[i].textContent = `Западный ${data.list[i].wind.speed}м/с`
            } else if (wind > 292.5 && wind < 337.5) {
                allWind[i].textContent = `Северо-западный ${data.list[i].wind.speed}м/с`
            }
        }
        if (data.list['0'].weather['0'].description === 'небольшой дождь') {
            const currentConfig = rainConfig['небольшой дождь'];
            makeItRain(rainToday, currentConfig)
        } else if (data.list['0'].weather['0'].description === 'дождь') {
            const currentConfig = rainConfig['дождь'];
            makeItRain(rainToday, currentConfig)
        } else if (data.list['0'].weather['0'].description === 'сильный дождь' || data.list['0'].weather['0'].description.includes('гроза')) {
            const currentConfig = rainConfig['сильный дождь'];
            makeItRain(rainToday, currentConfig)
            thunderIntervalToday = makeItThunder(thunderToday);
        } else if (data.list['0'].weather['0'].description === 'проливной дождь') {
            const currentConfig = rainConfig['проливной дождь'];
            makeItRain(rainToday, currentConfig);
        } else if (data.list['0'].weather['0'].description === 'ледяной дождь') {
            const currentConfig = rainConfig['ледяной дождь'];
            makeItRain(rainToday, currentConfig);
        } else if (data.list['0'].weather['0'].description === 'небольшой снег') {
            const currentConfig = rainConfig['небольшой снег'];
            makeItSnow(snowToday, currentConfig)
        } else if (data.list['0'].weather['0'].description === 'снег') {
            const currentConfig = rainConfig['снег'];
            makeItSnow(snowToday, currentConfig)
        } else if (data.list['0'].weather['0'].description === 'сильный снег') {
            const currentConfig = rainConfig['сильный снег'];
            makeItSnow(snowToday, currentConfig)
        } else if (data.list['0'].weather['0'].description === 'малооблачно' || data.list['0'].weather['0'].description === 'переменная облачность' || data.list['0'].weather['0'].description === 'небольшая облачность') {
            const currentConfigLeft = rainConfig['малооблачно-лево'];
            const currentConfigRight = rainConfig['малооблачно-право'];
            makeItClouds(cloudsToday, currentConfigLeft, currentConfigRight)
        } else if (data.list['0'].weather['0'].description === 'облачно с прояснениями') {
            const currentConfigLeft = rainConfig['облачно с прояснениями-лево'];
            const currentConfigRight = rainConfig['облачно с прояснениями-право'];
            makeItClouds(cloudsToday, currentConfigLeft, currentConfigRight);
        } else if (data.list['0'].weather['0'].description === 'пасмурно') {
            bigCloudToday.style.display = 'block'
        } else if (data.list['0'].weather['0'].description === 'ясно') {
            makeItSunny(sunnyToday);
        }
        if (data.list['8'].weather['0'].description === 'небольшой дождь') {
            const currentConfig = rainConfig['небольшой дождь'];
            makeItRain(rainTomorrow, currentConfig)
        } else if (data.list['8'].weather['0'].description === 'дождь') {
            const currentConfig = rainConfig['дождь'];
            makeItRain(rainTomorrow, currentConfig)
        } else if (data.list['8'].weather['0'].description === 'сильный дождь' || data.list['8'].weather['0'].description.includes('гроза')) {
            const currentConfig = rainConfig['сильный дождь'];
            makeItRain(rainTomorrow, currentConfig)
            thunderIntervalTomorrow = makeItThunder(thunderTomorrow)
        } else if (data.list['8'].weather['0'].description === 'проливной дождь') {
            const currentConfig = rainConfig['проливной дождь'];
            makeItRain(rainToday, currentConfig)
        } else if (data.list['8'].weather['0'].description === 'ледяной дождь') {
            const currentConfig = rainConfig['ледяной дождь'];
            makeItRain(rainTomorrow, currentConfig);
        } else if (data.list['8'].weather['0'].description === 'небольшой снег') {
            const currentConfig = rainConfig['небольшой снег'];
            makeItSnow(snowTomorrow, currentConfig)
        } else if (data.list['8'].weather['0'].description === 'снег') {
            const currentConfig = rainConfig['небольшой снег'];
            makeItSnow(snowTomorrow, currentConfig)
        } else if (data.list['8'].weather['0'].description === 'сильный снег') {
            const currentConfig = rainConfig['небольшой снег'];
            makeItSnow(snowTomorrow, currentConfig)
        } else if (data.list['8'].weather['0'].description === 'малооблачно' || data.list['8'].weather['0'].description === 'переменная облачность' || data.list['8'].weather['0'].description === 'небольшая облачность') {
            const currentConfigLeft = rainConfig['малооблачно-лево'];
            const currentConfigRight = rainConfig['малооблачно-право'];
            makeItClouds(cloudsTomorrow, currentConfigLeft, currentConfigRight)
        } else if (data.list['8'].weather['0'].description === 'облачно с прояснениями') {
            const currentConfigLeft = rainConfig['облачно с прояснениями-лево'];
            const currentConfigRight = rainConfig['облачно с прояснениями-право'];
            makeItClouds(cloudsTomorrow, currentConfigLeft, currentConfigRight);
        } else if (data.list['8'].weather['0'].description === 'пасмурно') {
            bigCloudTomorrow.style.display = 'block';
        } else if (data.list['8'].weather['0'].description === 'ясно') {
            makeItSunny(sunnyTomorrow);
        }
        let minimumWeather = 999;
        let maximumWeather = -999;
        for (let i = 0; i < 8; i++) {
            if (minimumWeather > data.list[i].main.temp) {
                minimumWeather = data.list[i].main.temp;
            }
            if (maximumWeather < data.list[i].main.temp) {
                maximumWeather = data.list[i].main.temp;
            }
        }
        maximumCity.textContent = `Максимум в городе ${cityName} за 24 часа:`;
        minimumCity.textContent = `Минимум в городе ${cityName} за 24 часа:`;
        maximumTemperature.textContent = `${Math.round(maximumWeather)} ℃`;
        minimumTemperature.textContent = `${Math.round(minimumWeather)} ℃`;
        const feelsLikeTemperature = data.list['0'].main.feels_like;
        feelsLike.textContent = `${Math.round(feelsLikeTemperature)}℃,`;
        let nowWeather = data.list['0'].weather['0'].description;
        if (!nowWeather.includes('дождь') && !nowWeather.includes('гроза') && !nowWeather.includes('снег')) {
            for (let i = 3; i < 24; i += 3) {
                let nowWeather = data.list[i].weather['0'].description;
                if (nowWeather.includes('дождь')) {
                    chanceOfPrecipitation.textContent = `до начала дождя: ${i}ч.`
                    break
                } else if (nowWeather.includes('гроза')) {
                    chanceOfPrecipitation.textContent = `до начала грозы: ${i}ч.`
                    break
                } else if (nowWeather.includes('снег')) {
                    chanceOfPrecipitation.textContent = `до начала снега: ${i}ч.`
                    break
                }
            }
        } else if (nowWeather.includes('дождь') || nowWeather.includes('гроза') || nowWeather.includes('снег')) {
            chanceOfPrecipitation.textContent = `сейчас идёт ${nowWeather}`;
        }
        if (chanceOfPrecipitation.textContent === '') {
            chanceOfPrecipitation.textContent = `в течение суток осадков не ожидается!`
        }
        choseWindDescription(windDescription, data.list['0'].wind.speed, windConfig);
        windSpeed.textContent = `${data.list['0'].wind.speed}м/с,`;
        windGust.textContent = `с порывами до ${data.list['0'].wind.gust}м/с`;

    } catch (error) {
        console.error("Ошибка в getWeather", error.message);
        return false
    }
}

function showError(message) {
    errorPopupText.textContent = message;
    errorPopup.classList.add('error-popup-show');
}

errorPopupButton.addEventListener('click', () => {
    errorPopup.classList.remove('error-popup-show')
})

search_from.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log("Форма отправлена");
    const userCity = weatherCity.value.trim();
    city.textContent = `${userCity}, сегодня:`;
    const succes = await getWeather(userCity);
    if (succes === false) {
        showError("Упс, ошибка, проверьте правильно ли указано название города, если да, то проблема на сервере, попробуйте позже!");
        return;
    }
    localStorage.setItem('lastSavedCity', userCity)
    weatherCity.value = '';
})

function loadLastCity() {
    const savedCity = localStorage.getItem('lastSavedCity');
    if (savedCity) {
        getWeather(savedCity);
    } else {
        getWeather('Смоленск');
    }
}

loadLastCity();
createSkeletonTable();

