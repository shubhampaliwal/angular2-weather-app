/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { FormsModule } from '@angular/forms';
import { D3ChartComponent } from './d3-chart/d3-chart.component';
import {nvD3} from 'ng2-nvd3';
import { WeatherService } from './services/weather.service';

describe('Component: App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, WeatherComponent, D3ChartComponent, nvD3
      ],
      imports:[ FormsModule ],
    });
  });

});
