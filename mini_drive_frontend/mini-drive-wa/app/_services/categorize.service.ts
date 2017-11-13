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
        return this.http.post('http://35.188.6.128:4000/addCategories/' + fileId, my_body, options).map((response: Response) => response.json());
    }

    removeCategories(fileId: Number, categories: Array<String>){
        console.log("inicio removeCategories ")
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

        console.log("inicio llamado al servicio removeCategories!!!");
        return this.http.post('http://35.188.6.128:4000/removeCategories/' + fileId, my_body, options).map((response: Response) => response.json());
    }


    getFilesByCategory(category: String){
        console.log("inicio getFilesByCategory ")

        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("inicio llamado al servicio getFilesByCategory");
        return this.http.get('http://35.188.6.128:4000/showFiles/category/' + category, options).map((response: Response) => response.json());
    }

    getCategoriesOfFile(fileId: number){
        console.log("inicio getCategories OfFiles ")

        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("inicio llamado al servicio getFilesByCategory");
        return this.http.get('http://35.188.6.128:4000//showCategories/file/' + fileId, options).map((response: Response) => response.json());
    }

    deleteAllCategories(fileId: Number){
        console.log("inicio deleteAllCategories ")
        console.log("fileId : " + fileId);

        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("inicio llamado al servicio delteAllCategories!!!");
        return this.http.delete('http://35.188.6.128:4000/categories/file/' + fileId, options).map((response: Response) => response.json());
    }


    getMyCategories(){
        console.log("inicio getMyCategories ")

        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("inicio llamado al servicio getFilesByCategory");
        return this.http.get('http://35.188.6.128:4000/categories/getOwnCategories', options).map((response: Response) => response.json());
    }


}
