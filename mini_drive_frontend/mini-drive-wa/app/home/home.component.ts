﻿import { Component, OnInit, Output } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { FileService } from "../_services/index";
import { HashService } from "../_services/index";
import { MyFileOfList } from '../_models/index';
import { CategorizeService } from "../_services/categorize.service";


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: String;
    users: User[] = [];
    public errorMessage: string;
    files: MyFileOfList[] = [];

    private MyHash = new Object();

    // pop-up add categories
    public selectedFile: MyFileOfList;

    // for visible components
    public showAddCategories: boolean = false;
    public showAddShare: boolean = false;
    public showDropZone: boolean = false;
    public showPreview: boolean = false;


    constructor(private userService: UserService, private fileService: FileService,
                private hashService: HashService, private categorize: CategorizeService) {
        this.currentUser = localStorage.getItem('currentUser');
    }

    ngOnInit() {
        console.log("Incio home component");
        console.log(" no jodas!! " + localStorage.getItem('authtoken'));
        //this.loadAllUsers();
        //this.validateToken();
        this.showListofFiles();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => {
            this.users = users;
        });
    }

    showListofFiles() {

        this.fileService.getListOfFiles().subscribe(
            data => {
                this.files = data;
                console.log(this.files);
                this.formatPaths();
                return this.files;
            },
            error => this.errorMessage = <any>error);
    }

    validateToken() {

        console.log(this.fileService.validate());
    }

    private formatPaths() {

        // metodo encargado de acortar el path del archivo y ajustar la lista files en este componente
        for (let file of this.files) {
            //var re = 'files/';
            let str = file.path;
            console.log('origin!!!!' + str)
            //var newstr = str.replace(re, '');
            let splitted = str.split("/");
            console.log("Separados" + splitted[2])
            //file.id = splitted[2]

            this.hashService.getHashByPath(splitted[2]).subscribe(
                data => {
                    this.MyHash = data;
                    console.log(this.MyHash["id"]);
                    file.id = this.MyHash["id"];
                    //return this.files;
                },
                error => this.errorMessage = <any>error
            );   //console.log("este es el hash: " + hash["id"])
        }
        //console.log(this.files);
    }

    //metodo seleccion fila componente preview
    onSelect(selectedFile: MyFileOfList) {

        if((!this.showAddShare) && (!this.showAddCategories)){
            this.selectedFile = selectedFile;
            this.changeStatePreview(true);
        }
    }

    // metodos pop-up update tournament

    openAddCategories(file: MyFileOfList) {
        this.selectedFile = file;
        this.changeStatePreview(false);
        this.changeStatePopUp(true);
    }

    changeStatePopUp(value: boolean) {
        this.showAddCategories = value;
    }

    //Metodos para abrir y cerrar el popUP
    openAddShare(file: MyFileOfList) {
        this.selectedFile = file;
        this.changeStatePreview(false);
        this.changeStatePopUpShare(true);
    }

    changeStatePopUpShare(value: boolean) {
        this.showAddShare = value;
    }

    //Mostrar y ocultar dropzone
    openCloseDropZone(value: boolean) {
        this.showDropZone = !this.showDropZone;
    }

    //Mostrar y ocultar preview
    changeStatePreview(value: boolean) {
        this.showPreview = value;
    }
    closePreview() {
        this.showPreview = false;
    }
}