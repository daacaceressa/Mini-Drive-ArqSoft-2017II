import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class FileService {

  constructor(private http: Http) { }

    private extractData(res: Response) {
        const body = res.json();
        return body.data || { };
    }

    getListOfFiles() {

        console.log("inicio getListOfFiles ")
        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencode' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("inicio llamado al servicio externo");
        return this.http.get('http://35.188.6.128:4000/files/listOfFiles', options).map((response: Response) => response.json());
    }

    validate() {


        console.log("inicio getListOfFiles ")
        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencode' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("inicio llamado al servicio externo");
        return this.http.get('http://35.188.6.128:4000/user/validate', options).map((response: Response) => response.json());
    }

}
