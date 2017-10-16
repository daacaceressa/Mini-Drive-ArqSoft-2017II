import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ListService } from '../../_services/index';
import { Inject } from '@angular/core';
import { FileComponent } from '../files/files.component';
import { MyFileOfList } from '../../_models/index';
//import { trigger, state, style, animate, transition } from '@angular/animations';



@Component({
  moduleId: module.id,
  selector: 'pdf-app',
  templateUrl: './preview.component.html',
  providers: [
    FileComponent
  ],
  // animations: [
  //   trigger('dialog', [
  //     transition('void => *', [
  //       style({ transform: 'scale3d(.3, .3, .3)' }),
  //       animate(100)
  //     ]),
  //     transition('* => void', [
  //       animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
  //     ])
  //   ])
  // ]
})
export class PreviewComponent implements OnChanges {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  @Input() path: MyFileOfList;
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
  zoom: number = 0.5;
  originalSize: boolean = false;
  pdf: any;
  renderText: boolean = true;
  progressData: PDFProgressData;
  isLoaded: boolean = true;
  stickToPage = false;
  showAll = false;

  constructor() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...

    if (this.path != undefined) {
      //alert(this.path);
      this.onFileSelected();
    }
  }

  /**
   * Render PDF preview on selecting file
   */
  onFileSelected() {
    //let $img: any = document.querySelector('#file');

    // Load pdf
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://35.188.6.128:4000/files/downloadFile/' + this.path.name, true);
    xhr.setRequestHeader("AUTHTOKEN", localStorage.getItem('authtoken'));
    xhr.responseType = 'blob';
    xhr.onload = (e: any) => {
      console.log(xhr);
      if (xhr.status === 200) {
        let blob = new Blob([xhr.response], { type: 'application/pdf' });
        this.pdfSrc = URL.createObjectURL(blob);
        console.log(this.pdfSrc);

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
          };
          reader.readAsArrayBuffer(blob);
        }

      }
    };
    xhr.send();
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











