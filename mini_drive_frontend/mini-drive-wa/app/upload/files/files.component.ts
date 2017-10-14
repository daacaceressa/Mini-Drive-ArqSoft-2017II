import { Component} from '@angular/core';
import { Observable} from 'rxjs';

import { ListService }from '../../_services/index';

@Component({
    moduleId: module.id,
    selector: 'app-files',
    templateUrl: './files.component.html',
    providers: [ListService]
})


export class FileComponent{

title = "Hola";
data: Observable<Array<any>>;
constructor(private service :ListService){

    this.data = service.getFiles();
    console.log("FileComponent.data:" + this.data);

}
};




