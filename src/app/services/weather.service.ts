import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Weather service to get data from OpenWeatherMapApi using observable
@Injectable()
export class WeatherService {

  constructor(private http:Http) {
   }
  getCurrentAndFiveDayWeather(id:string,units:string) {
    const apiKey = ‘YOUR_API_KEY_FROM_OPEN_WEATHER_MAP’;
    return Observable.forkJoin(
      // this will get the current weather data
      this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${id}&units=${units}&APPID=${apiKey}`).map((res:Response) => res.json()),
      // this will get the 5 day forecast data
      this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${id}&units=${units}&APPID=${apiKey}`).map((res:Response) => res.json()),
      // this will get the weather data for next 4 days
      this.http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${id}&units=${units}&APPID=${apiKey}`).map((res:Response) => res.json())
    )
  }

  // method to fetch extract data of selected city from wikipedia
  getCityWiki(name:string) {
    return Observable.forkJoin(
      this.http.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro=&explaintext=&titles=${name}&redirects=1`).map((res:Response) => res.json())
    )
  }

}
