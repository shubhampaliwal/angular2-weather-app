import { WeatherAppPage } from './app.po';
import { browser, element, by } from 'protractor/globals';

describe('dash App', function() {
  let page: WeatherAppPage;

  beforeEach(() => {
     browser.get('');
  });

  it('should have a button to search cities', () => {
    expect(element(by.partialButtonText('Go'))).toBeDefined();
  });
});
