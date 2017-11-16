import { Component, OnInit } from '@angular/core';
import { CategorizeService } from "../_services/categorize.service";
import { MyCategory } from '../_models/index';
import { HashService } from "../_services/hash.service";
import { MyFileOfList } from '../_models/index';

@Component({
  selector: 'app-view-categories',
  templateUrl: './app/view-categories/view-categories.component.html',
  styleUrls: ['./app/view-categories/view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

    public errorMessage: string;
    //public category: string = 'cat-two';
    public listCategories: MyCategory[];
    private MyHash = new Object();
    private my_path : String;
    private files: MyFileOfList[] = [];

    public selectedFile: MyFileOfList;

    //view components
    public showDropZone: boolean = false;
    public showPreview: boolean = false;

    public listMyCategories: MyCategory;

  constructor(private categorizeService: CategorizeService,
              private hashService: HashService) { }

  ngOnInit() {

      this.loadMyCategories();
  }

  getFilesOfCategory(category: String){

      this.files = [];
      this.categorizeService.getFilesByCategory(category).subscribe(
          data => {
              this.listCategories = data;
              console.log(this.listCategories);
              this.getPathsOfFiles();
          },
          error =>  {this.errorMessage = <any>error;
              console.log(this.errorMessage);
          });
  }

  private loadMyCategories(){

      this.categorizeService.getMyCategories().subscribe(
          data => {
              this.listMyCategories = data;
              console.log(this.listMyCategories);
          },
          error =>  {this.errorMessage = <any>error;
              console.log(this.errorMessage);
          });

  }

  private getPathsOfFiles(){

        // metodo encargado de acortar el path del archivo y ajustar la lista files en este componente
        for (let category of this.listCategories) {
            //var re = 'files/';
            let id_category = category.id;

            this.hashService.getHashById(id_category).subscribe(

                data => {
                    this.MyHash = data;
                    console.log(this.MyHash["path"]);

                    //obtener el nombre a partir del path
                    let str = this.MyHash["path"];
                    console.log('origin!!!!' + str)
                    //var newstr = str.replace(re, '');
                    let splitted = str.split("/");
                    let name = splitted[1];
                    console.log("Separados " + name);

                    // agregando mapeo de objetos
                    this.files.push({'id': this.MyHash["id"] ,'name' : name, 'path' : this.MyHash["path"]});

                },
                error =>  this.errorMessage = <any>error
            )

        }
      console.log(this.files);
    }

    // component preview
    onSelect(selectedFile: MyFileOfList) {
        this.selectedFile = selectedFile;
        this.changeStatePreview(true);
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
