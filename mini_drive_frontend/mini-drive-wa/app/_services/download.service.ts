import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class DownloadService {

    constructor(private http: Http) {
    }


    createAuthorizationHeader(headers: Headers) {
        headers.append('AUTHTOKEN', localStorage.getItem('authtoken'));
        headers.append('Content-Type', 'application/json');
    }

    downloadFile(path: any) {
        //this.http.get('https://contactsapi.apispark.net/v1/companies/').subscribe(

        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let url = 'http://35.188.6.128:4000/files/downloadFile/';

        return this.http.get(url + path, {
            headers: headers
        }).subscribe(
            (response) => {
                var mediaType = 'application/pdf';
                var blob = new Blob([response], {type: mediaType});
                var filename = 'test.pdf';
                //saveAs(blob, filename);
            });
    }

    downloadSharedFile(user_id: String, filename: String) {

        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        const options = new RequestOptions({headers: headers});


        let url = 'http://35.188.6.128:4000/files/downloadSharedFile';

        let body: any =
            {
                'user_id': user_id,
                'filename': filename
            };

        return this.http.post(url, body, options);
    }
}