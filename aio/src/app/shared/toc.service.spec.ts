// TODO: WRITE TESTS

import { ReflectiveInjector } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { TocService } from './toc.service';

describe('TocService', () => {
  let injector: ReflectiveInjector;
  let tocService: TocService;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      TocService,
      { provide: DOCUMENT, useValue: document }
    ]);
    tocService = injector.get(TocService);
  });

  it('should be creatable', () => {
    expect(tocService).toBeTruthy();
  });
});
