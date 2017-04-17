// TODO: write tests
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TocComponent } from './toc.component';

describe('TocComponent', () => {
  let component: TocComponent;
  let fixture: ComponentFixture<TocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//// helpers ////
// Should have expando buttons with this example
function getMultiLineExample() {
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

function getNoLineExample() {
  return `<aio-toc><ul></ul></aio-toc>`;
}

function getOneLineExample() {
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

