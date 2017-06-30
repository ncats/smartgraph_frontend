import { SmrtgraphPage } from './app.po';

describe('smrtgraph App', () => {
  let page: SmrtgraphPage;

  beforeEach(() => {
    page = new SmrtgraphPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
