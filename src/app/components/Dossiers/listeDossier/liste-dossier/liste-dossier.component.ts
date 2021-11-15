import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DossierService} from "../../../../services/Dossiers/dossier.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-liste-dossier',
  templateUrl: './liste-dossier.component.html',
  styleUrls: ['./liste-dossier.component.sass']
})
export class ListeDossierComponent implements OnInit {

  listeDossier : any;

  constructor(private dossierService : DossierService, private router : Router) { }

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

  }
}
