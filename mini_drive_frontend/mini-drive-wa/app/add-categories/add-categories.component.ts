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

    //public my_categories = ["job", "university","personal"];
    public my_categories = [];
    public categories: String[] = [];
    public tmp_categories: String[];
    private listCatFile = new Object();
    public errorMessage: string;
    private myObjCategory: MyCategory[]=[];

    constructor( private categorizeService: CategorizeService ) { }

    addCategory(newCategory: string) {
        if (newCategory) {
            this.my_categories.push(newCategory);
        }
    }

    ngOnInit() {

        console.log('id my File' + this.file.id);
        this.getListCategoriesByFile(1);
    }

       // ******** metodos ***************

        closePopUp() {
            this.closeModal.emit(false);
        }

        save(isValid: boolean) {
            if (!isValid) return;
            console.log(this.categories);

            /*
            console.log('Hola tmp-categories');
            this.tmp_categories.push("test-1");
            this.tmp_categories.push("test-2");
            console.log(this.tmp_categories);
            */

            //let tmp_categories = this.categories.;

            this.categorizeService.addCategories(this.file.id, this.categories).subscribe(
                data => {
                    console.log(data);
                },
                error =>  {this.errorMessage = <any>error;
                console.log(this.errorMessage);
                });

        }
            //Devuelve un objeto con las categorias de un archivo
        getListCategoriesByFile(fileId: number){
            this.categorizeService.getCategoriesOfFile(this.file.id).subscribe(
                data => {
                    this.listCatFile=data;
                    //console.log("pruebaaaaa")
                    console.log(data);
                    console.log(this.listCatFile["categories"])//Muestra las categorias de un archivo
                    this.myObjCategory.push(this.listCatFile["id"], this.listCatFile["categories"]);
                    console.log(this.myObjCategory);
                },
                error =>  {this.errorMessage = <any>error;
                    console.log(this.errorMessage);
                }
            );
            console.log(this.myObjCategory["id"]);

        }


}
