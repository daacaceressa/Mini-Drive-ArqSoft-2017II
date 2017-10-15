import { Component, OnInit } from '@angular/core';
import {ShareService} from "../../../_services/share.service";
import {MyShares} from "../../../_models/my-shares";


@Component({
  selector: 'app-view-my-shares',
    templateUrl: './app/_components/share/view-my-shares/view-my-shares.component.html',
    styleUrls: ['./app/_components/share/view-my-shares/view-my-shares.component.css']
})
export class ViewMySharesComponent implements OnInit {

   private myObjectShare: MyShares;
   public errorMessage: string;
   public tmpShares: Object[]=[];
    public message: String = "";

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
        for (let sh of this.myObjectShare.files) {


            //obtener el nombre a partir del path
            console.log(sh);
            let tmpPath = sh;
            console.log('origin!!!!' + sh)
            let splitted = sh.split("/");

            // agregando mapeo de objetos
            this.tmpShares.push({'nameFile': splitted[1] ,'ownerFile' : splitted[0]});


        }
        console.log(this.tmpShares);
    }
}
