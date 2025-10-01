const searchbutton=document.getElementById("searchbutton");
const weatherresult = document.querySelector(".weatherresult");
const input=document.querySelector(".navbar");
const apikey="80a8c2fa24d4d8908c4d240bc64c5587";
weatherresult.innerHTML=` 🌤️ Wondering what the sky has in store? Check your weather now!`;
searchbutton.addEventListener("click",()=>{
    const city=input.value.trim();
    if(city===""){
        alert("please enter the city name");
        return;
    }
    fetchweather(city);
});
function fetchweather(city){
     
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
      weatherresult.innerHTML = `<p style="color:blue; font-size:18px">⏳ Fetching weather data...</p>`;
    fetch(url)
    .then(response=>{
        if(!response.ok){
            throw new Error("city not found");
        }
        return response.json();
    })
    .then(data=>displayweather(data))
    .catch(error=>{
         weatherresult.innerHTML = `<p style="color:red; font-size:20px">${error.message}</p>`;
    });
}
function displayweather(data){
     weatherresult.innerHTML = `
        <h2> 📍Location =>${data.name}, ${data.sys.country}</h2>
        <p><strong>🌡️Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>🌧️Sky:</strong> ${data.weather[0].description}</p>
        <p><strong>💧Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>🌪️Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}