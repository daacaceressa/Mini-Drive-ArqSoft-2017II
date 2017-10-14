import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class CategorizeService {

  constructor(private http: Http) { }

    addCategories(fileId: Number, categories: Array){
        console.log("inicio addCategories ")
        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencode' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("inicio llamado al servicio HASH!!!");
        return this.http.post('http://192.168.99.102:4000/hash/getHashByPath/' + fileId, categories, options).map((response: Response) => response.json());
    }



}
