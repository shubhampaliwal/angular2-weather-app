import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { WeatherComponent} from './weather/weather.component';
import { D3ChartComponent} from './d3-chart/d3-chart.component';
import { HttpModule } from '@angular/http';
import { WeatherService } from './services/weather.service';
import { nvD3 } from 'ng2-nvd3'

@NgModule({
  imports:[BrowserModule,HttpModule,FormsModule],
  declarations:[AppComponent,WeatherComponent,D3ChartComponent,nvD3],
  providers:[WeatherService],
  bootstrap:[AppComponent]
})
export class AppModule {}
