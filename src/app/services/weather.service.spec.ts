import {
  TestBed,
  getTestBed,
  async,
  inject
} from '@angular/core/testing';
import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';

import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { WeatherService } from './weather.service';


// Below block is required so that the test injector
// is properly set up. Without doing this, one won't get the
// fake backend injected into Http.

// Injection of MockBackend as a provider before one wire's
// it to replace XHRBackend with the provide function!  So this is all
// extremely important to set up right.
describe('WeatherService', () => {
  let mockBackend: MockBackend;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
       }
      ],
      imports: [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));

  it('should get weather', done => {
    let weatherService: WeatherService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [
                  {
                    city: "Jaipur",
                    contentRendered: '<p><b>Hi, I got the weather</b></p>',
                    contentMarkdown: '*Hi there*'
                  }]
              }
            )));
        });

        weatherService = getTestBed().get(WeatherService);
        expect(weatherService).toBeDefined();

        weatherService.getCurrentAndFiveDayWeather("Jaipur","metrics").subscribe((data) => {
            expect(data[0]).toBeDefined();
            expect(data[1]).toBeDefined();
            expect(data[2]).toBeDefined();
            done();
        });
    });
  });
  it('should get city wiki', done => {
    let weatherService: WeatherService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [
                  {
                    wiki: "extract",
                    contentRendered: '<p><b>Hi, I got the city wiki</b></p>',
                    contentMarkdown: '*Hi there*'
                  }]
              }
            )));
        });

        weatherService = getTestBed().get(WeatherService);
        expect(weatherService).toBeDefined();

        weatherService.getCityWiki("Jaipur").subscribe((data) => {
            expect(data[0]).toBeDefined();
            done();
        });
    });
  });
});
