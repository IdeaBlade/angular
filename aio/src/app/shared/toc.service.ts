import { ElementRef, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { DocumentContents } from 'app/documents/document.service';

@Injectable()
export class TocService {
  doc: DocumentContents;
  docElement: Element;
  private docReadySubject = new ReplaySubject<DocumentContents>(1);
  docReady = this.docReadySubject.asObservable();
  url: string;

  constructor(@Inject(DOCUMENT) private document: any) { }

  setDoc(doc: DocumentContents, docElement: ElementRef) {
    this.doc = doc;
    this.docElement = docElement.nativeElement;
    this.url = doc.url || '';
    this.docReadySubject.next(doc);
  }

  genToc() {
    const tocElements = this.document.createElement('ul') as HTMLUListElement;
    const headings = this.docElement.querySelectorAll('h2,h3');
    const idMap = new Map<string, number>();
    let currentUl = tocElements;
    let currentTag = 'h2';

    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i] as HTMLHeadingElement;
      const id = this.getId(heading, idMap);
      const tag = heading.tagName.toLowerCase();

      if (tag !== currentTag) {
        currentTag = tag;
        if (tag === 'h2') { // up level to h2
          currentUl = tocElements;
        } else { // down level to h3
          currentUl = this.document.createElement('ul');
          const li = this.document.createElement('li');
          li.appendChild(currentUl);
          tocElements.appendChild(li);
        }
      }

      // security: the document which provides this heading content
      // is always authored by the documentation team and is considered to be safe
      const li = this.document.createElement('li');
      const html =  `<a href="${this.url}#${id}" title="${heading.innerText}">${heading.innerHTML}</a>`;
      li.innerHTML = html;
      currentUl.appendChild(li);
    }
    return tocElements;
  }

  private getId(h: HTMLHeadingElement, idMap: Map<string, number>) {
    let id = h.id;
    if (id) {
      addToMap(id);
    } else {
      id = h.innerText.toLowerCase().replace(/\W+/g, '-');
      id = addToMap(id);
      h.id = id;
    }
    return id;

    function addToMap(key: string) {
      const count = idMap[key] = idMap[key] ? idMap[key] + 1 : 1;
      return count === 1 ? key : `${key}-${count}`;
    }
  }
}
