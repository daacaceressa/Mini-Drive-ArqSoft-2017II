import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class CategorizeService {

  constructor(private http: Http) { }

    addCategories(fileId: Number, categories: Array<String>){
        console.log("inicio addCategories ")
        console.log("fileId : " + fileId);
        console.log("categories : " + categories);
        let body: any =
            {
                "id":fileId,
                "categories": categories
            };
        console.log(body);

        let my_body: JSON;
        my_body = <JSON> body;
        console.log("my_body");
        console.log(my_body);

        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("inicio llamado al servicio addCategories!!!");
        return this.http.post('http://192.168.99.102:4000/addCategories/' + fileId, my_body, options).map((response: Response) => response.json());
    }



}
