$(document).ready(function () {
  const apiUrl = "https://api.weatherapi.com/v1/forecast.json";

  $.ajax({
    url: apiUrl,
    data: {
      key: "0e93a6197f9a4658b3a183517232011",
      days: 1,
      q: "Kikinda",
      aqi: "yes",
      alert: "yes",
    },
    success: function (response) {
      // gornji blok - prognoza
      $(".cityName").text(response.location.name);
      $(".cityTemperature").text(response.current.temp_c);
      $(".cityIcon").attr("src", response.current.condition.icon);

      //prognoze u boksevima po satu

      const currentTime = +response.current.last_updated.slice(11, 13);
      const times = [
        currentTime - 1,
        currentTime,
        currentTime + 1,
        currentTime + 2,
        currentTime + 3,
      ];

      times.forEach((time) => {
        const div = $(`<div class="weatherPerHour">
                         <h2 >${time} h</h2>
                         <img src="${
                           response.forecast.forecastday[0].hour[time].condition
                             .icon
                         }" alt="temp-icon" />
                          <p >${
                            response.forecast.forecastday[0].hour[time].temp_c +
                            "°"
                          }</p>
                       </div>`);

        if (time == currentTime) $(div).addClass("current");

        $(".hourlyForecast").append(div);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });

  // Ajax pozivi za druge gradove
  const citys = ["Novi Sad", "Beograd", "Vranje"];

  citys.forEach((city) => {
    $.ajax({
      url: apiUrl,
      data: {
        key: "0e93a6197f9a4658b3a183517232011",
        days: 1,
        q: city,
        aqi: "yes",
        alert: "yes",
      },
      success: function (response) {
        const div = $(`<div class="otherCityBox">
                         <h2 >${response.current.temp_c + "°"}</h2>
                         <p >${response.location.name}</p>
                         <img src="${
                           response.current.condition.icon
                         }" alt="temp-icon" />
                       </div>`);

        $("#weather").append(div);
      },
    });
  });
});

document.addEventListener("touchmove", (e) => {
  e.preventDefault();

  if (document.title === "Weather-app") {
    window.location.href = "weather.html";
  } else {
    window.location.href = "index.html";
  }
});
