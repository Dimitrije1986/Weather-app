$(document).ready(function () {
  $.ajax({
    url: "http://api.weatherapi.com/v1/forecast.json",
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

      const currentTime = +(response.current.last_updated.slice(11, 13));
      
      // trenutno vreme
      $(".currentTime").text(`${currentTime} h`);
      $(".currentHourlyIcon").attr("src", response.current.condition.icon);
      $(".currentTemperature").text(response.current.temp_c + "°");

      
      // sat ranije
      
      $(".oneHourBefore").text(`${currentTime - 1} h`);
      $(".oneHourBeforeIcon").attr("src", response.forecast.forecastday[0].hour[`${currentTime - 1}`].condition.icon);
      $(".oneHourBeforeTemperature").text(response.forecast.forecastday[0].hour[`${currentTime - 1}`].temp_c + "°");
      
      // sat kasnije
      
      $(".oneHourAfter").text(`${currentTime + 1} h`);
      $(".oneHourAfterIcon").attr("src", response.forecast.forecastday[0].hour[`${currentTime + 1}`].condition.icon);
      $(".oneHourAfterTemperature").text(response.forecast.forecastday[0].hour[`${currentTime + 1}`].temp_c + "°");
      
      // dva sata kasnije
      
      $(".twoHourAfter").text(`${currentTime + 2} h`);
      $(".twoHourAfterIcon").attr("src", response.forecast.forecastday[0].hour[`${currentTime + 2}`].condition.icon);
      $(".twoHourAfterTemperature").text(response.forecast.forecastday[0].hour[`${currentTime + 2}`].temp_c + "°");
      
      // tri sata kasnije
      
      $(".threeHourAfter").text(`${currentTime + 3} h`);
      $(".threeHourAfterIcon").attr("src", response.forecast.forecastday[0].hour[`${currentTime + 3}`].condition.icon);
      $(".threeHourAfterTemperature").text(response.forecast.forecastday[0].hour[`${currentTime + 3}`].temp_c + "°");

    },
    error: function (error) {
      console.log(error);
    },
  });
});
