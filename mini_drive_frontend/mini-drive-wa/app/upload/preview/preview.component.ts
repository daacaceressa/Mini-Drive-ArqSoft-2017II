import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ListService } from '../../_services/index';
import { Inject } from '@angular/core';
import { FileComponent } from '../files/files.component';



@Component({
  moduleId: module.id,
  selector: 'pdf-app',
  templateUrl: './preview.component.html',
})
export class PreviewComponent {


  @Input() path: string;
  // let headers = new Headers();
  //   this.createAuthorizationHeader(headers);
  //   let url = 'http://35.188.6.128:4000/files/downloadFile/';

  //   return this.http.get(url + path,{
  //     headers: headers
  //   }).subscribe(
  //     (response) => {
  //       var mediaType = 'application/pdf';
  //       var blob = new Blob([response], { type: mediaType });
  //       var filename = 'test.pdf';
  //       //saveAs(blob, filename);
  //     });

  // or pass options as object
  //pdfSrc: any = {
  //  url: 'http://35.188.6.128:4000/files/downloadFile/'+ this.path,
  //  withCredentials: true,
  //  httpHeaders: { // cross domain
  //    'Access-Control-Allow-Credentials': true,
  //    'AUTHTOKEN': localStorage.getItem('authtoken')
  //  }
 // };

  pdfSrc: string = '';
  error: any;
  page: number = 1;
  rotation: number = 0;
  zoom: number = 1.0;
  originalSize: boolean = false;
  pdf: any;
  renderText: boolean = true;
  progressData: PDFProgressData;
  isLoaded: boolean = false;
  stickToPage = false;
  showAll = true;

 ngOnInit() {
   console.log(this.path);
    // Load pdf
    let xhr = new XMLHttpRequest();
     xhr.open('GET','http://35.188.6.128:4000/files/downloadFile/'+ this.path, true);
     xhr.setRequestHeader("AUTHTOKEN", localStorage.getItem('authtoken'));
     xhr.responseType = 'blob';
     xhr.onload = (e: any) => {
       console.log(xhr);
       if (xhr.status === 200) {
         let blob = new Blob([xhr.response], {type: 'application/pdf'});
         this.pdfSrc = URL.createObjectURL(blob);
       }
     };
     xhr.send();
 }

  constructor() {
  }


  /**
   * Render PDF preview on selecting file
   */
  onFileSelected() {
    let $img: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }


  incrementPage(amount: number) {
    this.page += amount;
  }

  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  rotate(angle: number) {
    this.rotation += angle;
  }

  /**
   * Get pdf information after it's loaded
   * @param pdf
   */
  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isLoaded = true;
  }

  /**
   * Handle error callback
   *
   * @param error
   */
  onError(error: any) {
    this.error = error; // set error
  }

  /**
   * Pdf loading progress callback
   * @param {PDFProgressData} progressData
   */
  onProgress(progressData: PDFProgressData) {
    this.progressData = progressData;
    this.isLoaded = false;
    this.error = null; // clear error
  }

  getInt(value: number): number {
    return Math.round(value);
  }


}











