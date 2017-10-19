import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropzoneComponent , DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'my-dropzone',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css'],
})
export class UploadComponent {
  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
      headers: {'AUTHTOKEN': localStorage.getItem('authtoken')}
  };

  @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;

  constructor(private _router: Router) {
    this.type =  'component';
   // this.componentRef.config.headers = {'AUTHTOKEN': localStorage.getItem('authtoken')};
  }

  reset() {
      this.componentRef.directiveRef.reset();
  }

  onUploadError(args: any) {
    console.log('onUploadError:', args);
  }

  onUploadSuccess(args: any) {
    console.log('onUploadSuccess:', args);
      this._router.navigate(['']);
  }
}

