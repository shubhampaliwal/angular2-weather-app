import { browser, element, by } from 'protractor/globals';

export class WeatherAppPage {
  navigateTo() {
    return browser.get('');
  }

  getParagraphText() {
    return element(by.css('input [type=text]')).getAttribute('value');
  }
}
