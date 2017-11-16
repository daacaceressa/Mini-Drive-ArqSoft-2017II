import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DropzoneComponent, DropzoneDirective, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {GlobalDataService} from "../_services/global-data.service";

@Component({
    moduleId: module.id,
    selector: 'my-dropzone',
    templateUrl: 'upload.component.html',
    styleUrls: ['upload.component.css'],
})
export class UploadComponent {
    public type: string = 'component';

    public disabled: boolean = false;

    public config: DropzoneConfigInterface = {};

    @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;

    constructor(private _router: Router,
                private _alertService: AlertService,
                private gd: GlobalDataService) {

        this.type = 'component';

        //initializing DropzoneConfigInterface @jucjimenezmo
        this.config.url = this.gd.base_ip + '/files/uploadFile';
        this.config.clickable = true;
        this.config.maxFiles = 1;
        this.config.autoReset = null;
        this.config.errorReset = null;
        this.config.cancelReset = null;
        this.config.headers = {'AUTHTOKEN': localStorage.getItem('authtoken')};

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
        this._alertService.success("Your file has been successfully uploaded!!")
    }
}

