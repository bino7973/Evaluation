import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../../../services/Contacts/contact.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-liste-contact',
  templateUrl: './liste-contact.component.html',
  styleUrls: ['./liste-contact.component.sass']
})
export class ListeContactComponent implements OnInit {

  listeContacts : any = [];
  constructor(private contactService : ContactService, private router : Router) { }

  ngOnInit(): void {
    this.getAllContactFromContactService();
  }

  getAllContactFromContactService(){
    this.contactService.getAllContactsFromServer().subscribe((resultat)=>{
      this.listeContacts = resultat.contacts;
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  redirigerAjoutContact() {
    this.router.navigate(['/home', 'contact', 'ajouter'])
  }

  supprimerContact(_id: any, i: number) {
    Swal.fire({
      title: 'Etes vous sur de supprimer ce contact?',
      text: "Cette opération n'est pas réversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer le contact!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.deleteContactFromServer(_id).subscribe((resultat)=>{
          this.listeContacts.splice(i, 1)
          Swal.fire(
            'Votre contact a été supprimé!',
            'Votre contact a été supprimé.',
            'success'
          )
          this.router.navigate(['/home', 'contact', 'liste'])
        }, (erreur)=>{
          console.log(erreur)
        })
      }
    })
  }


}
