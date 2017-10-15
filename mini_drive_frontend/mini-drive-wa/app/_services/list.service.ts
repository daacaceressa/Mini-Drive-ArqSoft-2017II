import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';



@Injectable()
export class ListService {

  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('AUTHTOKEN', localStorage.getItem('authtoken'));
  }

  getFiles(): Observable<any> {

    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.get('http://35.188.6.128:4000/files/listOfFiles/', {
      headers: headers
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
