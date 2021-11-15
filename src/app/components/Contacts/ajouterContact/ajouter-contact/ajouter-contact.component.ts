import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../../../../services/Contacts/contact.service";
import {ContactModel} from "../../../../models/contact-model.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-contact',
  templateUrl: './ajouter-contact.component.html',
  styleUrls: ['./ajouter-contact.component.sass']
})
export class AjouterContactComponent implements OnInit {

  ajouterContactFormGroup !: FormGroup;

  constructor(private formBuilder : FormBuilder, private contactService : ContactService, private routeur : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ajouterContactFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      nom : ['', Validators.required]
    });
  }

  ajouterNouveauContact() {
    let slug = this.ajouterContactFormGroup.value.slug
    let nom = this.ajouterContactFormGroup.value.nom
    let nouveauContact = new ContactModel(slug, nom);
    this.contactService.addNewContactToApi(nouveauContact).subscribe((resultat)=>{
      this.routeur.navigate(['/home', 'contact', 'liste']);
    }, (erreur)=>{
      console.log(erreur)
    })

  }
}
