// TODO: WRITE TESTS

import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/platform-browser';

import { TocComponent } from './toc.component';
import { TocService } from 'app/shared/toc.service';

describe('TocComponent', () => {
  let hostComponent: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let tocComponent: TocComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HostComponent, TocComponent ],
      providers: [
        { provide: TocService, useClass: TestTocService }
      ]
    });
  });

  function testComponent(testFn: () => void) {
    TestBed.compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HostComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();
      })
      .then(testFn);
  }

  it('should create HostComponent with no TocComponent', async(() => {
    testComponent(() => {
      expect(hostComponent).toBeTruthy();
    });
  }));

});

//// helpers ////
@Component({
  selector: 'aio-host',
  template: ''
})
class HostComponent {}

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

