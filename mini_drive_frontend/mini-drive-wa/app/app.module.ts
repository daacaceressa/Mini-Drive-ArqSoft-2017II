import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { UploadComponent } from './upload/upload.component';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FileComponent } from './upload/files/files.component';
import { ListService } from './_services/index';



const DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
     url: 'http://35.188.6.128:4000/files/uploadFile',
    //url: 'http://35.188.6.128:3004/uploadFile/1',
    headers: {'AUTHTOKEN':localStorage.getItem('authtoken')},
    acceptedFiles: 'application/pdf',
    createImageThumbnails: true
};


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        DropzoneModule.forRoot(DROPZONE_CONFIG),
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UploadComponent,
        // DropzoneComponent,
        FileComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ListService,


        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }