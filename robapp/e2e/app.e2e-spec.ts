import { RobappPage } from './app.po';

describe('robapp App', () => {
  let page: RobappPage;

  beforeEach(() => {
    page = new RobappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
