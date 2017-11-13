import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { GlobalDataService } from './global-data.service';


@Injectable()
export class ListService {

  constructor(private http: Http, private gd: GlobalDataService) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('AUTHTOKEN', localStorage.getItem('authtoken'));
  }

  getFiles(): Observable<any> {

    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.get(this.gd.base_ip + '/files/listOfFiles/', {
      headers: headers
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
