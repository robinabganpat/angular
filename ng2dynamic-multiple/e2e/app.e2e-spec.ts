import { Ng2dynamicPage } from './app.po';

describe('ng2dynamic App', () => {
  let page: Ng2dynamicPage;

  beforeEach(() => {
    page = new Ng2dynamicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
