import { browser } from 'protractor';

export class NgWebsitPage {
  navigateTo(link?) {
    return browser.get(link || '/');
  }

  sleep(millisecond?: number) {
    browser.driver.sleep(8000 || millisecond);
  }
}
