import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import { UserRequest } from '../_models/index';
import { GlobalDataService } from './global-data.service';

@Injectable()
export class UserService {
    constructor(private http: Http, private gd: GlobalDataService) { }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    /*
    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }
    */

    //jucjimenezmo
    create(user: UserRequest) {

        let body = JSON.stringify(user);
        console.log(body, 'user');

        let headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.gd.base_ip + '/user/createUser', body, options).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}