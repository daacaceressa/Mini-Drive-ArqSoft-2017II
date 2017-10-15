import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { saveAs } from 'file-saver';

@Injectable()
export class DownloadService {

  constructor(private http: Http) { }


  createAuthorizationHeader(headers: Headers) {
    headers.append('AUTHTOKEN', localStorage.getItem('authtoken'));
  }


  downloadFile(path:any) {
    //this.http.get('https://contactsapi.apispark.net/v1/companies/').subscribe(

    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let url = 'http://35.188.6.128:4000/files/downloadFile/';

    return this.http.get(url + path,{
      headers: headers
    }).subscribe(
      (response) => {
        var mediaType = 'application/pdf';
        var blob = new Blob([response], { type: mediaType });
        var filename = 'test.pdf';
        //saveAs(blob, filename);
      });



  }

}
