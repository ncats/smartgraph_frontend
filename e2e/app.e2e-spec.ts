import { Cyto3Page } from './app.po';

describe('cyto3 App', () => {
  let page: Cyto3Page;

  beforeEach(() => {
    page = new Cyto3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
