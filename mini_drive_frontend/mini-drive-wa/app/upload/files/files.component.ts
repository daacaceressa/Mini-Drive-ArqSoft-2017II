import { Component, Output, EventEmitter,ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

import { ListService } from '../../_services/index';
import { DownloadService } from '../../_services/index';


@Component({
    moduleId: module.id,
    selector: 'app-files',
    templateUrl: './files.component.html',
    providers: [
        ListService,
        DownloadService,
    ],

})



export class FileComponent {

    title = "Hola";
    data: Observable<Array<any>>;
    @Output() selectedFile: any;
    @Output() myEvent = new EventEmitter();

    constructor(private serviceD: DownloadService, private service: ListService) {

        this.data = service.getFiles();
        console.log("FileComponent.data:" + this.data);
    }

    downloadFile(path: any) {
        this.serviceD.downloadFile(path);
    }

    

    previewFile(path: any) {

        //this.myEvent.emit(null);
        //this.preview.onFileSelected(path);
    }

    onSelect(d: any) {
        this.myEvent.emit(null);
        //alert(d.name);
        this.selectedFile = d;
    }
};




