import { NgWebsitPage } from '../app.po';
import { browser, by, element } from 'protractor';
describe('login e2e test', () => {
  let page: NgWebsitPage;

  beforeEach(() => {
    page = new NgWebsitPage();
  });

  xit('should see login form', () => {
    page.navigateTo();
    page.sleep();
    const usernameInput = element(by.id('username'));
    const passwordInput = element(by.id('password'));
    const submitButton = element(by.id('submit'));

    expect(usernameInput.isPresent()).toBe(true);
    expect(passwordInput.isPresent()).toBe(true);
    expect(submitButton.isPresent()).toBe(true);
  });

  xit('should login success when input correct username and password', async function (done) {
    const usernameInput = element(by.id('username'));
    const passwordInput = element(by.id('password'));
    const submitButton = element(by.id('submit'));

    usernameInput.sendKeys('D8GHONGL');
    passwordInput.sendKeys('test@123');
    submitButton.click();
    page.sleep();

    const currentUrl = await browser.driver.getCurrentUrl().then(url => url);
    expect(currentUrl).toContain('home');
    done();
  });
});


