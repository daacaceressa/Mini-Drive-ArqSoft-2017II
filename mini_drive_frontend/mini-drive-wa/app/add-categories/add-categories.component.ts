import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output} from '@angular/core';
import { MyFileOfList } from '../_models/index';
import { CategorizeService } from "../_services/categorize.service";
import {MyCategory} from "../_models/my-category";

@Component({
  selector: 'app-add-categories',
  templateUrl: './app/add-categories/add-categories.component.html',
  styleUrls: ['./app/add-categories/add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

    @Input('file') file: MyFileOfList;
    @Output() closeModal: EventEmitter<boolean> = new EventEmitter() ;

    public categories: String[] = [];
    public errorMessage: string;
    private myObjCategory: MyCategory;

    constructor( private categorizeService: CategorizeService ) { }



    ngOnInit() {

        console.log('id my File' + this.file.id);
        this.getListCategoriesByFile(this.file.id);

    }

       // ******** metodos ***************

        closePopUp() {
            this.closeModal.emit(false);
        }



        addCategory(newCategory: string) {
            let tmpCategory: String[]=[newCategory];
            if (newCategory) {
                this.categorizeService.addCategories(this.file.id, tmpCategory).subscribe(
                    data => {
                        console.log(data);
                        this.getListCategoriesByFile(this.file.id);
                    },
                    error =>  {this.errorMessage = <any>error;
                        console.log(this.errorMessage);
                    });
            }

        }

        removeCategory(newCategory: string) {
            let tmpCategory: String[]=[newCategory];
            if (newCategory) {
                this.categorizeService.removeCategories(this.file.id, tmpCategory).subscribe(
                    data => {
                        console.log(data);
                        this.getListCategoriesByFile(this.file.id);
                    },
                    error =>  {this.errorMessage = <any>error;
                        console.log(this.errorMessage);
                    });
            }

        }

    deleteAllCategory() {
            this.categorizeService.deleteAllCategories(this.file.id).subscribe(
                data => {
                    console.log(data);
                    this.categories=[];
                },
                error =>  {this.errorMessage = <any>error;
                    console.log(this.errorMessage);
                });

    }




            //Devuelve un objeto con las categorias de un archivo
        getListCategoriesByFile(fileId: number){
            this.categories=[];
            this.categorizeService.getCategoriesOfFile(this.file.id).subscribe(
                data => {
                    this.myObjCategory=data;
                    //console.log("pruebaaaaa")
                    console.log(data);
                    //this.myObjCategory.push(this.listCatFile["id"], this.listCatFile["categories"]);
                    console.log(this.myObjCategory);
                    this.categories = this.myObjCategory.categories
                    console.log(this.categories);
                },
                error =>  {this.errorMessage = <any>error;
                    console.log(this.errorMessage);
                }

            );


        }


}
