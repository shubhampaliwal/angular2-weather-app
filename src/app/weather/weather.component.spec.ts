/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { AppComponent } from '../app.component';
import { D3ChartComponent } from '../d3-chart/d3-chart.component';
import {nvD3} from 'ng2-nvd3';
describe('Component: Weather', () => {
  let weather = new WeatherComponent();
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherComponent, AppComponent, D3ChartComponent,nvD3
      ],
    });
    let activeData;
  });
  it('should create an instance', () => {
    let component = new WeatherComponent();
    expect(component).toBeTruthy();
  });
  it('should return higher value', () => {
    expect(weather.convertTemp(2.2)).toBe(3);
  });
  it('should return date', () => {
    expect(weather.convertUnixToIst(1486305200)).toBe("Sunday, 5 Feb 2017  08:03");
  });
});
