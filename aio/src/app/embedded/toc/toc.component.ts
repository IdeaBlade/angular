import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import 'rxjs/add/operator/first';

import { TocService } from 'app/shared/toc.service';

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
    private elementRef: ElementRef,
    private tocService: TocService) {
    const element = this.elementRef.nativeElement;
    this.embedded = element.getAttribute('embedded') || '';
  }

  ngOnInit() {
    // The `aioTocContent` property is set by the DocViewer when it builds this component.
    // It is the original innerHTML of the host element.

    // Security: the aioTocContent comes from the pre-rendered DOM and is considered to be secure
    const content = this.elementRef.nativeElement.aioTocContent.trim();
    this.hasContent = !!content;

    if (this.hasContent) {
      this.setFromContent(content);
    } else {
      this.generateToc();
    }
  }

  private generateToc() {
    this.tocService.docReady.first().subscribe(() => {
      const el = this.tocService.genToc();
      const anchors = el.getElementsByTagName('a');
      this.hasContent = anchors.length > 0;
      if (this.hasContent) {
        this.setSecondaryAnchors(anchors);
        this.setTocList(el);
      }
    });
  }

  private setFromContent(content: any) {
    const el = this.document.createElement('div') as HTMLDivElement;
    el.innerHTML = content;
    const anchors = el.getElementsByTagName('a');
    this.setSecondaryAnchors(anchors);
    this.setTocList(el);
  }

  private setSecondaryAnchors(anchors: NodeListOf<HTMLAnchorElement>) {
    this.hasSecondary = anchors.length > this.primaryMax;
    for (let i = 0; i < anchors.length; i++) {
      const a = anchors[i];
      // todo: fix hrefs if necessary
      if (i >= this.primaryMax) {
        // Identify secondary anchors (those after primaryMax); they may be hidden
        a.classList.add('secondary');
      }
    }
  }

  private setTocList(el: Element) {
    setTimeout(() => {
      // Must wait a tick for `this.tocList`
      // Worse to use `AfterViewInit` because several bound properties can change
      // triggering the dreaded "property value changed after checked" error.

      // Security: the aioTocContent comes from the pre-rendered DOM and is considered to be secure
      this.tocList.nativeElement.appendChild(el);
    });
  }

  toggle() {
    this.isClosed = !this.isClosed;
  }
}
