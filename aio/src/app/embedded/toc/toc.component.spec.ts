// TODO: WRITE TESTS

import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/platform-browser';

import { TocComponent } from './toc.component';
import { TocService } from 'app/shared/toc.service';

describe('TocComponent', () => {
  let tocComponent: TocComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostEmbeddedTocComponent, HostNotEmbeddedTocComponent, TocComponent ],
      providers: [
        { provide: TocService, useClass: TestTocService }
      ]
    })
    .compileComponents();
  }));

  describe('(embedded)', () => {
    let fixture: ComponentFixture<HostEmbeddedTocComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(HostEmbeddedTocComponent);
        tocComponent = fixture.debugElement.children[0].componentInstance;
    });

    it('should create tocComponent', () => {
      expect(tocComponent).toBeTruthy();
    });
  });

  describe('(not embedded)', () => {
    let fixture: ComponentFixture<HostNotEmbeddedTocComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(HostNotEmbeddedTocComponent);
        tocComponent = fixture.debugElement.children[0].componentInstance;
    });

    it('should create tocComponent', () => {
      expect(tocComponent).toBeTruthy();
    });
  });

});

//// helpers ////
@Component({
  selector: 'aio-embedded-host',
  template: '<aio-toc embedded></aio-toc>'
})
class HostEmbeddedTocComponent {}

@Component({
  selector: 'aio-not-embedded-host',
  template: '<aio-toc></aio-toc>'
})
class HostNotEmbeddedTocComponent {}

class TestTocService {

}

// Should have expando buttons with this example
function getMultiLineItemExample() {
  return `
    <aio-toc>
    <ul>
      <li><a href="#in-page-link">one{{item}}</a></li>
      <li><a href="#in-page-link">two</a></li>
      <li><a href="#in-page-link">three{{item}}</a></li>
      <li><a href="#in-page-link">four</a></li>
      <li>
        <ul>
          <li><a href="#in-page-link">four-a</a></li>
          <li><a href="#in-page-link">four-b</a></li>
          <li><a href="#in-page-link">four-c</a></li>
        </ul>
      </li>
      <li><a href="#in-page-link">five</a></li>
    </ul>
    </aio-toc>
  `;
}

function getNoLineItemExample() {
  return `<aio-toc><ul></ul></aio-toc>`;
}

function getOneLineItemExample() {
  return `<aio-toc><ul><li><a href="#somewhere">howdy</a></li></ul></aio-toc>`;
}

// Should have no expando buttons with this example
function getPrimaryMaxExample() {
  return `
    <aio-toc>
    <ul>
      <li><a href="#in-page-link">one{{item}}</a></li>
      <li><a href="#in-page-link">two</a></li>
      <li><a href="#in-page-link">three{{item}}</a></li>
      <li><a href="#in-page-link">four</a></li>
    </ul>
    </aio-toc>
  `;
}

