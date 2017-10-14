import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class HashService {

  constructor(private http: Http) { }


  getHashByPath(path: String){
      console.log("inicio getHashByPath ")
      let auth_token = localStorage.getItem('authtoken');
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencode' });
      headers.append('Authtoken' , auth_token);
      const options = new RequestOptions({ headers: headers });

      console.log("inicio llamado al servicio HASH!!!");
      return this.http.get('http://192.168.99.102:4000/hash/getHashByPath/' + path, options).map((response: Response) => response.json());
  }

    getHashById(id_hash: number){
        console.log("inicio getHashById ")

        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencode' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("Inicio get http getHashById");
        return this.http.get('http://192.168.99.102:4000/hash/getHashId/' + id_hash, options).map((response: Response) => response.json());
    }

}
