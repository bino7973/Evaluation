import { Component, OnInit } from '@angular/core';
import {CourrierService} from "../../../../services/Courriers/courrier.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-liste-courrier',
  templateUrl: './liste-courrier.component.html',
  styleUrls: ['./liste-courrier.component.sass']
})
export class ListeCourrierComponent implements OnInit {
  listCourrier : any = [];
  constructor(private courrierService : CourrierService, private router : Router) { }

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
    this.courrierService.deleteCourrierFromServer(id).subscribe((resultat)=>{
      this.listCourrier.splice(i, 1)
    }, (erreur)=>{
      console.log(erreur)
    })
  }
}
