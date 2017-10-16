import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropzoneComponent , DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  moduleId: module.id,
  selector: 'my-dropzone',
  templateUrl: 'upload.component.html',
})
export class UploadComponent {
  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;

  constructor() {
    this.type =  'component';
  }

  reset() {
      this.componentRef.directiveRef.reset();
  }

  onUploadError(args: any) {
    console.log('onUploadError:', args);
  }

  onUploadSuccess(args: any) {
    console.log('onUploadSuccess:', args);
  }
}

