import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DossierService} from "../../../../services/Dossiers/dossier.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../../services/Alerts/alert.service";

@Component({
  selector: 'app-liste-dossier',
  templateUrl: './liste-dossier.component.html',
  styleUrls: ['./liste-dossier.component.sass']
})
export class ListeDossierComponent implements OnInit {

  listeDossier : any = [];

  constructor(private dossierService : DossierService, private router : Router, private alertService : AlertService) { }

  ngOnInit(): void {
    this.getAllDossiersFromDossierService();
  }

  getAllDossiersFromDossierService(){
    this.dossierService.getAllDossiersFromServer().subscribe((resultat)=>{
      this.listeDossier = resultat.dossiers
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  redirigerAjoutDossier() {
    this.router.navigate(['/home', 'dossier', 'ajouter'])
  }

  supprimerDossier(_id: any, i: number) {
   this.alertService.emettreConfirmationAlert("Etes vous sur de supprimer cet dossier","cet dossier").then((resultat: { isConfirmed: any; })=>{
     if(resultat.isConfirmed) {
       this.dossierService.deleteDossierFromServer(_id).subscribe((resultat)=>{
         this.listeDossier.splice(i, 1)
         this.router.navigate(['/home', 'dossier', 'liste'])
         this.alertService.emettreUnToast("Suppression du dossier effectuée avec succès !", 'success');
       }, (erreur)=>{
         this.alertService.emettreUnToast("Echec de la suppression du dossier !", 'error');
       })
     }
   });
  }
}
