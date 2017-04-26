// TODO: WRITE TESTS

import { ReflectiveInjector, SecurityContext } from '@angular/core';
import { DOCUMENT, DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { TocService } from './toc.service';

describe('TocService', () => {
  let injector: ReflectiveInjector;
  let tocService: TocService;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: DomSanitizer, useClass: TestDomSanitizer },
      { provide: DOCUMENT, useValue: document },
      TocService,
    ]);
    tocService = injector.get(TocService);
  });

  it('should be creatable', () => {
    expect(tocService).toBeTruthy();
  });
});

class TestDomSanitizer {
  bypassSecurityTrustHtml = jasmine.createSpy('bypassSecurityTrustHtml')
    .and.callFake(html => {
      return {
        changingThisBreaksApplicationSecurity: html,
        getTypeName: () => 'HTML',
      } as SafeHtml;
    });
}
