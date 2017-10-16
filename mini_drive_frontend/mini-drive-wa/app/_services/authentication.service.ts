import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post('http://192.168.99.102:4000/user/loginUser', JSON.stringify({ email: username, password: password }), options)
            .map((response: Response) => {
                console.log('holaaaaaaaaaaaaa')
                // login successful if there's a jwt token in the response
                let my_headers = response.headers;
                let token = my_headers.get('authtoken');
                console.log(token);
                if (token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('authtoken', token);
                    localStorage.setItem('currentUser', username);
                }

                return token;
            });
    }

    logout() {

        // remove token from bd user ms
        let auth_token = localStorage.getItem('authtoken');
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencode' });
        headers.append('Authtoken' , auth_token);
        const options = new RequestOptions({ headers: headers });
        this.http.delete('http://192.168.99.102:4000/user/logOut', options);

        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authtoken');

        console.log('user desloged');

    }
}