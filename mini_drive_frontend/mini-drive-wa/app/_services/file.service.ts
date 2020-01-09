import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { GlobalDataService } from './global-data.service';

@Injectable()
export class FileService {

  constructor(private http: Http, private gd: GlobalDataService) { }

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
        return this.http.get(this.gd.base_ip + '/files/listOfFiles', options).map((response: Response) => response.json());
    }

    validate() {


        console.log("inicio getListOfFiles ")
        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencode' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("inicio llamado al servicio externo");
        return this.http.get(this.gd.base_ip + '/user/validate', options).map((response: Response) => response.json());
    }

}
