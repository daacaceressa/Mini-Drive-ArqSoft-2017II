import { Component } from '@angular/core';
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
    ]
})


export class FileComponent {

    title = "Hola";
    data: Observable<Array<any>>;
    constructor(private service: ListService, private serviceD: DownloadService, private http: Http) {

        this.data = service.getFiles();
        console.log("FileComponent.data:" + this.data);

    }

    downloadFile(path: any) {

        this.serviceD.downloadFile(path);
        
    }




};




