import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../_services/authentication.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-top-banner',
    templateUrl: './app/top-banner/top-banner.component.html',
    styleUrls: ['./app/top-banner/top-banner.component.css']
})
export class TopBannerComponent implements OnInit {

    currentUser : String;

    constructor(
        private _authService: AuthenticationService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.currentUser = localStorage.getItem('currentUser');
    }

    logout() {
        this._authService.logout();
        this._router.navigate(['login']);
    }
}
