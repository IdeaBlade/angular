import { browser, element, by, promise } from 'protractor';
import { SitePage } from './app.po';

describe('site App', function() {
  let page: SitePage;

  beforeEach(() => {
    page = new SitePage();
    page.navigateTo();
  });

  it('should show features text after clicking "Features"', () => {
    page.getLink('features').click();
    expect(page.getDocViewerText()).toMatch(/Progressive web apps/i);
  });

  it('should show the tutorial index page at `tutorial/`', () => {
    // Navigate by location directly to the tutorial page
    page.navigateTo('tutorial/');
    expect(page.getDocViewerText()).toMatch(/Tutorial: Tour of Heroes/i);
  });

  it('should show the tutorial index page after navigating away, then back via navlink', () => {
    // Navigate by location directly to the tutorial page
    page.navigateTo('tutorial/');
    expect(page.getDocViewerText()).toMatch(/Tutorial: Tour of Heroes/i);

    // navigate to a different page via a link somewhere on the page
    page.getLink('features').click();
    expect(page.getDocViewerText()).not.toMatch(/Tutorial: Tour of Heroes/i);

    // Navigate to the tutorial introduction page via a link in the left nav
    // Assume the first (and only) nav item named "Introduction" is for the tutorial
    const introNavItem = page.getNavItem('Introduction');
    introNavItem.click();
    expect(page.getDocViewerText()).toMatch(/Tutorial: Tour of Heroes/i);
  });

  it('should render `{@example}` dgeni tags as `<code-example>` elements with HTML escaped content', () => {
    page.navigateTo('guide/component-styles');
    const codeExample = element.all(by.css('code-example')).first();
    expect(page.getInnerHtml(codeExample))
        .toContain('@Component({\n  selector: \'hero-app\',\n  template: `\n    &lt;h1&gt;Tour of Heroes&lt;/h1&gt;');
  });

  describe('api-docs', () => {
    it('should show a link to github', () => {
      page.navigateTo('api/common/NgClass');
      expect(page.ghLink.getAttribute('href'))
          .toMatch(/https:\/\/github.com\/angular\/angular\/tree\/.+\/packages\/common\/src\/directives\/ng_class\.ts/);
    });
  });

  describe('google analytics', () => {
    beforeEach(done => page.gaReady.then(done));

    it('should call ga', done => {
      page.ga()
        .then(calls => {
          expect(calls.length).toBeGreaterThan(2, 'ga calls');
          done();
        });
    });

    it('should call ga with initial URL', done => {
      let path: string;

      page.locationPath()
        .then(p => path = p)
        .then(() => page.ga().then(calls => {
          expect(calls.length).toBeGreaterThan(2, 'ga calls');
          expect(calls[1]).toEqual(['set', 'page', path]);
          done();
        }));
    });

    // Todo: add test to confirm tracking URL when navigate.
  });

});
