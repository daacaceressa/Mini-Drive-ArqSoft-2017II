import { Component, OnInit } from '@angular/core';
import { ShareService } from "../../../_services/share.service";
import { MyShares } from "../../../_models/my-shares";
import { MyFileOfList } from "../../../_models/my-file-of-list";
import { SharedFile } from "../../../_models/shared-file";


@Component({
  selector: 'app-view-my-shares',
    templateUrl: './app/_components/share/view-my-shares/view-my-shares.component.html',
    styleUrls: ['./app/_components/share/view-my-shares/view-my-shares.component.css']
})
export class ViewMySharesComponent implements OnInit {

   private myObjectShare: MyShares;
   public errorMessage: string;
   public tmpShares: SharedFile[]=[];
    public message: String = "";

    //components views
    public showDropZone: boolean = false;
    public showPreview: boolean = false;

    public selectedFile: MyFileOfList;
    public currentOwner: String = '';

  constructor(private shareService: ShareService) { }


  ngOnInit() {
      this.getSharesPath();
  }


    getSharesPath(){
        console.log("Holiiii")
        this.message="";
        this.shareService.getMyShares().subscribe(
            data => {
                this.myObjectShare = data;
                console.log(this.myObjectShare);
                this.getPathsOfShares();
            },
            error =>  {this.errorMessage = <any>error;
                console.log(this.errorMessage);
                this.message="No te han compartido ningun archivo :'v";
            });
    }

    private getPathsOfShares(){

        // metodo encargado de acortar el path del archivo y ajustar la lista files en este componente
        let index:number = 0;
        for (let sh of this.myObjectShare.files) {

            index++;
            //obtener el nombre a partir del path
            console.log(sh);
            let tmpPath = sh;
            console.log('origin!!!!' + sh)
            let splitted = sh.split("/");

            // agregando mapeo de objetos
            this.tmpShares.push({'id': index, 'name': splitted[1] , 'path': sh, 'owner' : splitted[0]});


        }
        console.log(this.tmpShares);
    }

    // component preview
    onSelect(mySelectedFile: SharedFile) {

        this.selectedFile = {'id' : mySelectedFile.id,'name':mySelectedFile.name, 'path':mySelectedFile.path };
        this.currentOwner = mySelectedFile.owner;
        //transformacion objeto share a objeto file

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
