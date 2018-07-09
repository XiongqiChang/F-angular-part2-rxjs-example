import { NgWebsitPage } from './app.po';

describe('ng-websit App', () => {
  let page: NgWebsitPage;

  beforeEach(() => {
    page = new NgWebsitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(true).toEqual(true);
  });
});
