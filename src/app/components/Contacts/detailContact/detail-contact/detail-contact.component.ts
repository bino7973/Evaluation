import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../../../../services/Contacts/contact.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactModel} from "../../../../models/contact-model.model";

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.sass']
})
export class DetailContactComponent implements OnInit {

  modificationContactFormGroup !: FormGroup;
  idContactSelectionner : any;

  constructor(private formBuilder : FormBuilder, private contactService : ContactService, private activatedRoute : ActivatedRoute, private router : Router) {
    this.idContactSelectionner = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.modificationContactFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      nom : ['', Validators.required]
    })

    this.contactService.getOneContactFromServer(this.idContactSelectionner).subscribe((resultat)=>{
      let contact = resultat.contact
      this.modificationContactFormGroup.setValue({
        slug :contact.slug,
        nom : contact.nom
      })
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  modifierContact() {
    let slug = this.modificationContactFormGroup.value.slug
    let nom = this.modificationContactFormGroup.value.nom
    let contactModifier = new ContactModel(slug, nom);
    this.contactService.updateContactFromServer(contactModifier, this.idContactSelectionner).subscribe((resultat)=>{
      this.router.navigate(['/home', 'contact', 'liste']);
    }, (erreur)=>{
      console.log(erreur)
    })
  }
}
