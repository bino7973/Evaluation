import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UniteService} from "../../../../services/Unite/unite.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-liste-unite',
  templateUrl: './liste-unite.component.html',
  styleUrls: ['./liste-unite.component.sass']
})
export class ListeUniteComponent implements OnInit {

  listeUnite : any = [];

  constructor(private router : Router, private uniteService : UniteService) { }

  ngOnInit(): void {
    this.getAllUnitesFromUniteService();
  }

  redirigerAjoutUnite() {
    this.router.navigate(['/home', 'unite', 'ajouter']);
  }

  getAllUnitesFromUniteService(){
    this.uniteService.getAllUnitesFromServer().subscribe((resultat)=>{
      this.listeUnite = resultat.unites
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  supprimerUnite(_id: any, i: number) {

    Swal.fire({
      title: 'Etes vous sur de supprimer cette unité?',
      text: "Cette opération n'est pas réversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer l\'unité!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.uniteService.deleteUniteFromServer(_id).subscribe((resultat)=>{
          this.listeUnite.splice(i, 1);
          Swal.fire(
            'Votre unité a été supprimé!',
            'Votre unité a été supprimé.',
            'success'
          )
          this.router.navigate(['/home', 'unite', 'liste'])
        }, (erreur)=>{
          console.log(erreur)
        })

      }
    })
  }
}
