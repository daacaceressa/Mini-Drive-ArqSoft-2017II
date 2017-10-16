import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from './_guards/index';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import {ViewMySharesComponent} from "./_components/share/view-my-shares/view-my-shares.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'view-categories', component: ViewCategoriesComponent },
    { path: 'view-my-shares', component: ViewMySharesComponent },
    //{ path: 'files', component: UploadComponent }, @leo
    { path: 'upload', component: UploadComponent }, //@juli

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);