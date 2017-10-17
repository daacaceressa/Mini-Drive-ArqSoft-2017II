import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { FileService } from "./_services/file.service";
import { HashService } from "./_services/hash.service";
import { CategorizeService } from "./_services/categorize.service";
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { ShareService } from "./_services/share.service";
import { AddShareComponent } from './_components/share/add-share/add-share.component';
import { ViewMySharesComponent } from './_components/share/view-my-shares/view-my-shares.component';
import { TopBannerComponent } from './top-banner/top-banner.component';

import { UploadComponent } from './upload/upload.component';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FileComponent } from './upload/files/files.component';
import { ListService } from './_services/index';
import { DownloadService } from './_services/index';

import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { PreviewComponent } from './upload/preview/preview.component';
import { GlobalDataService } from "./_services/global-data.service";

const DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: 'http://35.188.6.128:4000/files/uploadFile',
    //url: 'http://35.188.6.128:3004/uploadFile/1',
    headers: { 'AUTHTOKEN': localStorage.getItem('authtoken') },
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
        AddCategoriesComponent,
        ViewCategoriesComponent,
        AddShareComponent,
        ViewMySharesComponent,
        TopBannerComponent,
        UploadComponent,
        // DropzoneComponent,
        FileComponent,
        PreviewComponent,
        PdfViewerComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        FileService,
        HashService,
        CategorizeService,
        ShareService,
        UserService,
        ListService,
        DownloadService,
        // global variables
        GlobalDataService,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})



export class AppModule { }