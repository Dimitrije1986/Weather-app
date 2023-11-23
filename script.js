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
      //
      $(".cityName").text(response.location.name);
      $(".cityTemperature").text(response.current.temp_c);
      $(".cityIcon").attr("src", response.current.condition.icon);

      console.log(response);

      const now_time = response.current.last_updated.slice(11, 13);
      console.log(now_time);

      $(".nowTime").text(`${now_time} h`);
      $(".nowHourlyIcon").attr("src", response.current.condition.icon);
      $(".nowTemperature").text(response.current.temp_c + "°");

      const icon = response.forecast.forecastday[0].hour[12].condition.icon;
      const hourlyTemperature =
        response.forecast.forecastday[0].hour[12].temp_c;

      $(".oneHourBefore").text(`${+now_time.slice(0, 2) - 1} h`);
      $(".oneHourAfter").text(`${+now_time.slice(0, 2) + 1} h`);
      $(".twoHourAfter").text(`${+now_time.slice(0, 2) + 2} h`);
      $(".threeHourAfter").text(`${+now_time.slice(0, 2) + 3} h`);
      $(".hourlyIcon").attr("src", icon);

      $(".hourlyTemperature").text(hourlyTemperature + "°");
    },
    error: function (error) {
      console.log(error);
    },
  });
});
