import { Injectable } from '@angular/core';

@Injectable()
export class GlobalDataService {

    //this parameter is used in all services, preview.component.ts and upload.component.ts files
    base_ip: string = 'http://35.188.6.128:4000';

}