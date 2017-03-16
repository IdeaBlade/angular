import { HttpFileLoaderService as FileLoaderService } from './file-loader-http.service';

import 'rxjs/add/operator/map';

describe('FileLoaderService', () => {

  const navJsonUrl = 'navigation.json';

  let service: FileLoaderService;

  beforeEach(() => service = createHttpFileLoaderService());

  it(`should get '${navJsonUrl}'`, done => {
    const req = service.load(navJsonUrl);
    req.subscribe(
      resp => {
        expect(resp.text().length).toBeGreaterThan(0, 'expect text');
      },
      err => {
        fail(err);
        done();
      },
      done
    );

  }, 500);

  it(`should get navigation JSON from '${navJsonUrl}'`, done => {
    const req = service.load(navJsonUrl).map(resp => resp.json());

    req.subscribe(
      data => {
        expect(data['SideNav']).toBeDefined('expect SideNav JSON');
        expect(data['TopBar']).toBeDefined('expect TopBar JSON');
      },
      err => {
        fail(err);
        done();
      },
      done
    );
  }, 500);

  it(`should 404 for bad URL`, done => {
    const req = service.load('this/is/bad');
    req.subscribe(
      resp => {
        throw new Error('Should fail but got a success response');
      },
      err => {
        expect(err).toBeDefined();
        expect(err.status).toBe(404, 'status 404 - Not Found');
        done();
      },
      () => {
        throw new Error('Should fail and not complete');
      }
    );
  }, 500);

  it(`should 400 for empty URL`, done => {
    const req = service.load(undefined);
    req.subscribe(
      resp => {
        throw new Error('Should fail but got a success response');
      },
      err => {
        expect(err).toBeDefined();
        expect(err.status).toBe(400, 'status 400 - Bad Request');
        done();
      },
      () => {
        throw new Error('Should fail and not complete');
      }
    );
  }, 500);
});

////// Test Helpers ///////

// These imports needed only by the TestHttp class
import { Http, Headers, Response, ResponseOptions, ResponseType} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';

function createHttpFileLoaderService() {
  return new FileLoaderService(<Http> <any> new TestHttp());
}

class TestHttp {

  get = jasmine.createSpy('get').and.callFake((url: string) => {

    if (url && url.indexOf('navigation.json') > -1) {
      const options = {
        url,  status: 200, statusText: 'ok',
        type: ResponseType.Default, headers: new Headers(),
        body: '{ "SideNav": {}, "TopBar": {} }'
      };
      const resp = new Response(new ResponseOptions(options));
      return of(resp);

    // any other url is 404-Not found
    } else {
      const options = {
        url,  status: 404, statusText: 'Not Found',
        type: ResponseType.Default, headers: new Headers()
      };
      const resp = new Response(new ResponseOptions(options));
      return Observable.throw(resp);
    }
  });
}
