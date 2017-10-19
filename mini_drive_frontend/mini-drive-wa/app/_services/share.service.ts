import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class ShareService {

    constructor(private http: Http) { }



    shareFile(userId: String, fileId: String){

        console.log("inicio sahreFiles ")
        console.log("fileId : " + fileId);
        let body: any =
            {
                "user_id":userId,
                "file_id": fileId
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

        console.log("inicio llamado al servicio shareFile!!!");
        return this.http.post('http://35.188.6.128:4000/share/postShares', my_body, options);
    }

    delShareFile(userId: String, fileId: String){

        console.log("inicio delShareFiles ")
        console.log("fileId : " + fileId);

        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });

        console.log("inicio llamado al servicio shareFile!!!");
        return this.http.delete('http://35.188.6.128:4000/share/deleteShare/' + userId + "/" + fileId, options);
    }

    getMyShares(){
        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencode' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });


        return this.http.get('http://35.188.6.128:4000/share/getMyShares', options).map((response: Response) => response.json());
    }


}
