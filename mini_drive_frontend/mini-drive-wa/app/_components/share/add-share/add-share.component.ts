import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyFileOfList} from "../../../_models/my-file-of-list";
import {ShareService} from "../../../_services/share.service";

@Component({
  selector: 'popUp-add-share',
  templateUrl: './app/_components/share/add-share/add-share.component.html',
  styleUrls: ['./app/_components/share/add-share/add-share.component.css']

})
export class AddShareComponent implements OnInit {

    @Input('file') file: MyFileOfList;
    @Output() closeModal: EventEmitter<boolean> = new EventEmitter() ;
    public message: String = "";


    public errorMessage: string;

    constructor( private shareService: ShareService ) { }



    ngOnInit() {

        console.log('id my File' + this.file.id);

    }

    // ******** metodos ***************

    closePopUp() {
        this.closeModal.emit(false);
    }

    addShare(newUser: string) {
        this.message= "";
        if (newUser) {
            this.shareService.shareFile(newUser, this.file.id.toString()).subscribe(
                data => {
                    console.log(data);
                    this.message= "The document has been successfully shared with the user " + newUser;

                },
                error =>  {this.errorMessage = <any>error;
                    console.log(this.errorMessage);
                });
        }

    }

    delShare(newUser: string) {
        this.message= "";
        if (newUser) {
            this.shareService.delShareFile(newUser, this.file.id.toString()).subscribe(
                data => {
                    console.log(data);
                    this.message= "The file is no longer shared with " + newUser;

                },
                error =>  {this.errorMessage = <any>error;
                    console.log(this.errorMessage);
                });
        }

    }
}
