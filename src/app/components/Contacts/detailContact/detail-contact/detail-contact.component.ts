import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../../../../services/Contacts/contact.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactModel} from "../../../../models/contact-model.model";
import {AlertService} from "../../../../services/Alerts/alert.service";

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.sass']
})
export class DetailContactComponent implements OnInit {

  modificationContactFormGroup !: FormGroup;
  idContactSelectionner : any;
  loading = false;
  submitted = false;


  constructor(private formBuilder : FormBuilder, private contactService : ContactService, private activatedRoute : ActivatedRoute, private router : Router, private alertService : AlertService) {
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
    this.submitted = true
    if(this.modificationContactFormGroup.invalid){
      return
    }
    this.loading = true
    let slug = this.modificationContactFormGroup.value.slug
    let nom = this.modificationContactFormGroup.value.nom
    let contactModifier = new ContactModel(slug, nom);
    this.contactService.updateContactFromServer(contactModifier, this.idContactSelectionner).subscribe((resultat)=>{
      this.router.navigate(['/home', 'contact', 'liste']);
      this.alertService.emettreUnToast("Modification du contact éffectuée avec succès !", 'success');
    }, (erreur)=>{
      this.alertService.emettreUnToast("Echec de la modification du contact !", 'error');
    })
  }
}
