import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'aio-toc',
  templateUrl: 'toc.component.html',
  styles: []
})
export class TocComponent implements OnInit {

  embedded = true;
  hasContent = true; // assume it does until we know otherwise
  hasSecondary = true;
  isClosed = true;
  isEmbedded = true;
  private primaryMax = 4;

  @ViewChild('toclist', {read: ElementRef})
  tocList: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;
    this.embedded = element.getAttribute('embedded') || '';
  }

  ngOnInit() {
    // The `aioTocContent` property is set by the DocViewer when it builds this component.
    // It is the original innerHTML of the host element.

    // Security: the aioTocContent comes from the pre-rendered DOM and is considered to be secure
    const content = this.stripOuterUl(this.elementRef.nativeElement.aioTocContent).trim();
    this.hasContent = !!content;
    if (!this.hasContent) { return; }

    const el = this.document.createElement('div');
    el.innerHTML = content;
    const anchors = el.querySelectorAll('a');
    this.hasSecondary = anchors.length > this.primaryMax;
    for (let i = 0; i < anchors.length; i++) {
      const a = anchors[i];
      // todo: fix hrefs if necessary
      if (i >= this.primaryMax) {
        // Identify secondary anchors (those after primaryMax); they may be hidden
        a.classList.add('secondary');
      }
    }
    setTimeout(() => {
      // Must wait a tick for `this.tocList`
      // Worse to use `AfterViewInit` because several bound properties can change
      // triggering the dreaded "property value changed after checked" error.
      this.tocList.nativeElement.innerHTML = el.innerHTML;
    });
  }

  toggle() {
    this.isClosed = !this.isClosed;
  }

  private stripOuterUl(html = '') {
    return html.replace(/^\s*<ul>/, '')
               .replace(/<\/ul>\s*$/, '');
  }
}
