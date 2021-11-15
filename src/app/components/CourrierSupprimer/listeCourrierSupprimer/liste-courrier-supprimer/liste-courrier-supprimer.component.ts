import { Component, OnInit } from '@angular/core';
import {CourrierSupprimerService} from "../../../../services/CourrierSupprimer/courrier-supprimer.service";

@Component({
  selector: 'app-liste-courrier-supprimer',
  templateUrl: './liste-courrier-supprimer.component.html',
  styleUrls: ['./liste-courrier-supprimer.component.sass']
})
export class ListeCourrierSupprimerComponent implements OnInit {

  listeCourrierSupprimer : any;

  constructor(private courrierSupprimerService : CourrierSupprimerService) { }

  ngOnInit(): void {
    this.getAllCourrierSupprimerFromCourrierSupprimerService();
    console.log(this.listeCourrierSupprimer)
  }

  getAllCourrierSupprimerFromCourrierSupprimerService(){
    this.courrierSupprimerService.getCourrierSupprimerFromServer().subscribe((resultat)=>{
      this.listeCourrierSupprimer = resultat.courriersSupprimes
      console.log(resultat.courriersSupprimes)
    }, (erreur)=>{
      console.log(erreur)
    })
  }

}
