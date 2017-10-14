import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs';



@Injectable()
export class ListService {

  constructor(private http: Http) { }

  getFiles(): Observable<any>{

    return this.http.get('http://35.188.6.128:3004/listOfFiles/1')
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
