const weather = document.querySelector(".js-weather");

const API_KEY = "ab8fa040b65179f7fba12fb0311de46b";
const COORDS = "coords";


function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
} //weather API 가져오기

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); //위도, 경도 로컬 스토리지에 저장
}



function handleGeoSucces(position){
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   console.log(longitude);
       const coordsObj = {
        latitude:latitude,
        longitude:longitude 
       };//객체 변수이름과 객체 key 같게 저장
       saveCoords(coordsObj);
       getWeather(latitude, longitude)
}



function handleGeoErro(){
    console.log('Cant access geo location');
}



function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErro);//사용자 위칟정보 얻기
}



function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
        //getWeather
    }
}


function init(){
    loadCoords();
}

init();