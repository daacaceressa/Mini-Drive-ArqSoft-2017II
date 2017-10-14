import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output} from '@angular/core';
import { MyFileOfList } from '../_models/index';
import { CategorizeService } from "../_services/categorize.service";

@Component({
  selector: 'app-add-categories',
  templateUrl: './app/add-categories/add-categories.component.html',
  styleUrls: ['./app/add-categories/add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

    @Input('file') file: MyFileOfList;
    @Output() closeModal: EventEmitter<boolean> = new EventEmitter() ;

    public my_categories = ["job", "university","personal"];
    public categories: String[] = [];
    public tmp_categories: String[];

    public errorMessage: string;

  constructor( private categorizeService: CategorizeService ) { }

  ngOnInit() {

      console.log('id my File' + this.file.id);
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


}
