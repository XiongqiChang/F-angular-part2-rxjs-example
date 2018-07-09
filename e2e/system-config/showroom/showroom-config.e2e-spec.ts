import { browser, by, element } from 'protractor';
import { NgWebsitPage } from '../../app.po';
import { SYSTEM_ADMIN } from '../../configurations/constants/accounts';

describe('login e2e test', () => {
  let page: NgWebsitPage;

  beforeEach(() => {
    page = new NgWebsitPage();
  });

  xit('should login success as system admin', async function (done) {
    page.navigateTo();
    page.sleep();
    const usernameInput = element(by.id('username'));
    const passwordInput = element(by.id('password'));
    const submitButton = element(by.id('submit'));
    console.log('const :', SYSTEM_ADMIN);

    usernameInput.sendKeys(SYSTEM_ADMIN.username);
    passwordInput.sendKeys(SYSTEM_ADMIN.password);
    submitButton.click();
    page.sleep();
    const currentUrl = await browser.driver.getCurrentUrl().then(url => url);
    expect(currentUrl).toContain('system-config');
    done();
  });
});
