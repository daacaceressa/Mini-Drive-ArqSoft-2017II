import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { FileService } from "../_services/index";
import { MyFileOfList } from '../_models/index';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    public errorMessage: string;
    files : MyFileOfList[] = [];


    constructor(private userService: UserService, private fileService: FileService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        console.log("Incio home component");
        console.log(" no jodas!! " + localStorage.getItem('authtoken'));
        //this.loadAllUsers();
        //this.validateToken();
        this.showListofFiles();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    showListofFiles(){

        this.fileService.getListOfFiles().subscribe(
            data => {
                this.files = data;
                console.log(this.files);
                this.formatPaths();
                return this.files;
            },
            error =>  this.errorMessage = <any>error);
    }

    validateToken(){

        console.log(this.fileService.validate());
    }

    private formatPaths(){

        // metodo encargado de acortar el path del archivo y ajustar la lista files en este componente
        for (let file of this.files) {
            var re = 'files/';
            var str = file.path;
            console.log('origin' + str)
            var newstr = str.replace(re, '');
            console.log(newstr)
            file.path = newstr;
        }
        console.log(this.files);

    }
}