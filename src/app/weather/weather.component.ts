import { Component, Input } from '@angular/core';
import { Forecast } from '../shared/models/forecast-data';

// main weather component that will consume the service that gets weather
// data from OpenWeatherMapApi.
@Component({
  selector:'weather-app',
  templateUrl:'./weather.component.html',
  styleUrls:['../app.component.css','./weather.component.css']
})
export class WeatherComponent {
  // injected value from parent component app
  @Input() forecastData: Forecast;
  activeDate;
  noData : boolean = false;

  // method to convert the temperature in decimal to give weather temperature
  // value as integer
  convertTemp(temp) {
    return Math.ceil(temp);
  }

  // method to convert unix timestamp provided by OpenWeatherMapApi to
  // readable date format
  convertUnixToIst(time:number): string {
      let a = new Date(time * 1000);
      let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      let hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','01','02','03','04','05','06','07','08','09','10','11']
      let year = a.getFullYear();
      let month = months[a.getMonth()];
      let date = a.getDate();
      let hour = hours[a.getHours()];
      let min = a.getMinutes();
      let mins;
      if(min<=9){
        mins = "0"+min;
      }
      else{
        mins=min;
      }
      let sec = a.getSeconds();
      let day = days[a.getDay()];
      let times = day + ', '+ date + ' ' + month + ' ' + year + '  ' + hour + ':' + mins ;
      return times;
  }

  constructor() {}

  // method which will be invoked on click event to return weather data
  // against selected date
  showWeather(fiveDays,date) {
    this.forecastData.reset=false;
    if(date <= 9) {
      date = "0"+date;
    }

    // sets activeDate to weather conditions of selected date
    this.activeDate = fiveDays.filter((item) => (item.dt_txt.split(' ')[0].split('-')[2] == date));
    if(this.activeDate == null || this.activeDate == '') {
      this.activeDate = false;
      this.noData = true;
    }
    else {
      this.noData = false;
    }
  }

}
