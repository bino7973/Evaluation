import { Component, OnInit } from '@angular/core';
import {NatureService} from "../../../../services/Natures/nature.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-liste-nature',
  templateUrl: './liste-nature.component.html',
  styleUrls: ['./liste-nature.component.sass']
})
export class ListeNatureComponent implements OnInit {
  listeNature : any = [];
  constructor(private natureService : NatureService, private router : Router) { }

  ngOnInit(): void {
    this.getAllNatureFromNatureService();
  }

  getAllNatureFromNatureService(){
    this.natureService.getAllNaturesFromServer().subscribe((resultat)=>{
      this.listeNature = resultat.natures
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  redirigerAjoutNature() {
    this.router.navigate(['/home/nature/ajouter']);
  }

  supprimerNature(_id: any, i: number) {

    Swal.fire({
      title: 'Etes vous sur de supprimer cette nature?',
      text: "Cette opération n'est pas réversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer la nature!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.natureService.deleteNatureFromServer(_id).subscribe((resultat)=>{
          this.listeNature.splice(i, 1)
          Swal.fire(
            'Suppression éffectuée avec succès!',
            'Votre nature a été supprimé.',
            'success'
          )
          this.router.navigate(['/home', 'nature', 'liste'])
        }, (erreur)=>{
          console.log(erreur)
        })
      }
    })












  }
}
