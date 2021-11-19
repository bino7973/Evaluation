import { Component, OnInit } from '@angular/core';
import {CourrierService} from "../../../../services/Courriers/courrier.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../../services/Alerts/alert.service";

@Component({
  selector: 'app-liste-courrier',
  templateUrl: './liste-courrier.component.html',
  styleUrls: ['./liste-courrier.component.sass']
})
export class ListeCourrierComponent implements OnInit {
  listCourrier : any = [];
  constructor(private courrierService : CourrierService, private router : Router, private alertService : AlertService) { }

  ngOnInit(): void {
    this.getAllCourriersFromService();
  }

  getAllCourriersFromService(){
    this.courrierService.getAllCourriersFromServer().subscribe((resultat)=>{
      this.listCourrier = resultat.courriers
      console.log(this.listCourrier)
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  redirigerAjoutCourrier() {
    this.router.navigate(['/home/courrier/ajouter']);
  }

  supprimerCourrier(id : any, i : any){
    this.alertService.emettreConfirmationAlert("Voulez vous supprimer ce courrier", "ce courrier").then((resultat: { isConfirmed: any; })=>{
      if(resultat.isConfirmed){
        this.courrierService.deleteCourrierFromServer(id).subscribe((resultat)=>{
          this.listCourrier.splice(i, 1)
          this.alertService.emettreUnToast("Suppression de courrier !", 'success');
          this.router.navigate(['/home', 'courrier', 'liste'])
        }, (erreur)=>{
          this.alertService.emettreUnToast("Suppression de courrier !", 'error');
        })
      }
    })

  }
}
