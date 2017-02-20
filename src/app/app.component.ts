import { Component} from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Forecast } from './shared/models/forecast-data';

// root component of the app
@Component({
  selector:'dash',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent {
  public cityName : string;
  public unit : string;
  public cityDetails;
  public _key;
  public units = [
    { value: 'imperial', display: 'F' },
    { value: 'metric', display: 'C' }
  ];
  forecastData: Forecast = new Forecast();

  // lifecycle hook with method to update page every 30 mins with latest weather data
  constructor(private _weather: WeatherService) {
    // default city
    this.cityName = 'Jaipur';
    // default unit
    this.unit = 'metric';
    setInterval(() => {
      this.getCurrentAndFiveDayWeather(this.cityName,this.unit);
    },1800000);
  }

  // lifecycle hook to initialise the component and fetch data of default city
  ngOnInit() {
    this.getCurrentAndFiveDayWeather(this.cityName,this.unit);
  }

  // method to fetch the selected city's weather data and its wiki
  showCityWeather(cityName) {
    this.getCurrentAndFiveDayWeather(cityName, this.unit);
    this.forecastData.reset=true;
  }

  // method to get updated weather data with selected 'unit'
  changeUnit(unit) {
    this.getCurrentAndFiveDayWeather(this.cityName,unit);
    this.forecastData.reset=true;
  }

  // this method retrieves weather data and calls wiki api against city selected
  getCurrentAndFiveDayWeather(cityName, unit) {
    this._weather.getCurrentAndFiveDayWeather(cityName,unit).subscribe(
      data => {
        // it contains weather data at current time
        this.forecastData.current = data[0]
        // it contains all weather data of five days
        this.forecastData.fiveDays = data[1]
        // it contains weather of consecutive four days
        this.forecastData.daily = data[2]
        this.cityName = this.forecastData.current.name;
        this.getCityWiki(this.forecastData.current.name)
        if(unit == 'metric'){
          this.forecastData.chosenUnit = 'C';
        }
        else {
          this.forecastData.chosenUnit = 'F';
        }
      },
      // this is to handle bad response where there is no data.
      err => {
        this.forecastData.fiveDays = null;
        this.forecastData.current = null;
      }
    )
  }

  // this method gets the extract from wiki of selected city
  getCityWiki(cityName){
    this._weather.getCityWiki(cityName).subscribe(
      data => {
        this.cityDetails = data[0].query.pages
        // this for statement is to get the unknown key of whose value we need to get extract
        for (let key in this.cityDetails) {
          this._key=this.cityDetails[key];
          break;
        }
        this.cityDetails = this._key.extract;
      }
    )
  }

}
