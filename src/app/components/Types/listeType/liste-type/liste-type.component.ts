import { Component, OnInit } from '@angular/core';
import {TypeService} from "../../../../services/Types/type.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-liste-type',
  templateUrl: './liste-type.component.html',
  styleUrls: ['./liste-type.component.sass']
})
export class ListeTypeComponent implements OnInit {

  listeTypes : any = [];

  constructor(private typeService : TypeService, private router : Router) { }

  ngOnInit(): void {
    this.getAllTypesFromTypeService();
  }
  //Obtenir tous les type du server à partir du service
  getAllTypesFromTypeService(){
    this.typeService.getAllTypesFromServer().subscribe((resultat)=>{
      this.listeTypes = resultat.types
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  redirigerAjoutType() {
    this.router.navigate(['/home/type/ajouter'])
  }

  //Supprimer un type du server à partir du service
  supprimerType(_id: any, i: number) {

    Swal.fire({
      title: 'Etes vous sur de supprimer ce type?',
      text: "Cette opération n'est pas réversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer le type!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.typeService.deleteTypeFromServer(_id).subscribe((resultat)=>{
          this.listeTypes.splice(i, 1)
          Swal.fire(
            'Suppression de type effectué avec succès!',
            'Votre fichier a été supprimé.',
            'success'
          )
          this.router.navigate(['/home','type', 'liste'])
        }, (erreur)=>{
          console.log(erreur)
        })

      }
    })









  }
}
